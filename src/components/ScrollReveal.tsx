import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

export type RevealDirection = 'up' | 'down' | 'left' | 'right' | 'none';

export type RevealPreset =
  | 'heading'
  | 'text'
  | 'card-left'
  | 'card-right'
  | 'card-up'
  | 'icon'
  | 'button'
  | 'image'
  | 'custom';

export type RevealEasing = 'smooth' | 'overshoot' | 'kenburns' | 'spring' | string;

export interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  preset?: RevealPreset;
  direction?: RevealDirection;
  delay?: number;
  duration?: number;
  threshold?: number;
  rootMargin?: string;
  distance?: number;
  scale?: number;
  rotate?: number;
  easing?: RevealEasing;
  once?: boolean;
  style?: React.CSSProperties;
}

// Passthrough Provider for context compatibility
const ScrollContext = createContext<boolean>(true);

export const GatedScrollProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <ScrollContext.Provider value={true}>{children}</ScrollContext.Provider>;
};

export const useGatedScroll = () => {
  return useContext(ScrollContext);
};

let uniqueIdCounter = 0;

const EASING_MAP: Record<string, string> = {
  smooth: 'cubic-bezier(0.16, 1, 0.3, 1)',
  overshoot: 'cubic-bezier(0.34, 1.25, 0.64, 1)',
  spring: 'cubic-bezier(0.34, 1.35, 0.64, 1)',
  kenburns: 'cubic-bezier(0.2, 1, 0.3, 1)',
};

/**
 * ScrollReveal Component
 * Ultra-smooth, 60fps scroll animation component powered by native IntersectionObserver.
 * Provides rich entry styles with tailored transforms (distance, overshoot scale, subtle rotation, ken burns zoom).
 */
export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  id,
  preset = 'custom',
  direction,
  delay = 0,
  duration,
  threshold = 0.1,
  rootMargin = '0px 0px -40px 0px',
  distance,
  scale,
  rotate,
  easing,
  once = true,
  style = {},
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);
  const autoIdRef = useRef<string>(id || `sr-${++uniqueIdCounter}`);

  // Presets definition
  const presetDefaults = {
    heading: {
      direction: 'up' as RevealDirection,
      distance: 60,
      scale: 0.96,
      rotate: 0,
      duration: 1200,
      easing: 'overshoot' as RevealEasing,
    },
    text: {
      direction: 'up' as RevealDirection,
      distance: 45,
      scale: 1,
      rotate: 0,
      duration: 1050,
      easing: 'smooth' as RevealEasing,
    },
    'card-up': {
      direction: 'up' as RevealDirection,
      distance: 75,
      scale: 0.96,
      rotate: 0,
      duration: 1200,
      easing: 'overshoot' as RevealEasing,
    },
    'card-left': {
      direction: 'right' as RevealDirection, // comes from left
      distance: 95,
      scale: 0.97,
      rotate: 0,
      duration: 1250,
      easing: 'overshoot' as RevealEasing,
    },
    'card-right': {
      direction: 'left' as RevealDirection, // comes from right
      distance: 95,
      scale: 0.97,
      rotate: 0,
      duration: 1250,
      easing: 'overshoot' as RevealEasing,
    },
    icon: {
      direction: 'none' as RevealDirection,
      distance: 0,
      scale: 0.82,
      rotate: -15,
      duration: 850,
      easing: 'overshoot' as RevealEasing,
    },
    button: {
      direction: 'none' as RevealDirection,
      distance: 0,
      scale: 0.90,
      rotate: 0,
      duration: 800,
      easing: 'overshoot' as RevealEasing,
    },
    image: {
      direction: 'none' as RevealDirection,
      distance: 0,
      scale: 1.08,
      rotate: 0,
      duration: 1350,
      easing: 'smooth' as RevealEasing,
    },
    custom: {
      direction: 'up' as RevealDirection,
      distance: 70,
      scale: 1,
      rotate: 0,
      duration: 1100,
      easing: 'smooth' as RevealEasing,
    },
  };

  const selectedPreset = presetDefaults[preset] || presetDefaults.custom;

  const actualDirection = direction !== undefined ? direction : selectedPreset.direction;
  const actualDistance = distance !== undefined ? distance : selectedPreset.distance;
  const actualScale = scale !== undefined ? scale : selectedPreset.scale;
  const actualRotate = rotate !== undefined ? rotate : selectedPreset.rotate;
  const actualDuration = duration !== undefined ? duration : selectedPreset.duration;
  const actualEasingName = easing !== undefined ? easing : selectedPreset.easing;
  const actualEasing = EASING_MAP[actualEasingName] || actualEasingName;

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Respect reduced motion accessibility
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;

    if (prefersReducedMotion) {
      setIsVisible(true);
      setIsCompleted(true);
      return;
    }

    // Native IntersectionObserver for buttery smooth 60fps triggers
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (once) {
              observer.unobserve(entry.target);
              const timer = setTimeout(() => {
                setIsCompleted(true);
              }, delay + actualDuration + 80);
              return () => clearTimeout(timer);
            }
          } else if (!once) {
            setIsVisible(false);
            setIsCompleted(false);
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, delay, actualDuration, once]);

  const getInitialTransform = () => {
    const effectiveDistance = isMobile ? Math.round(actualDistance * 0.5) : actualDistance;
    let tx = 0;
    let ty = 0;

    switch (actualDirection) {
      case 'up':
        ty = effectiveDistance;
        break;
      case 'down':
        ty = -effectiveDistance;
        break;
      case 'left':
        // Enters from right (initial position pushed to the right)
        tx = effectiveDistance;
        break;
      case 'right':
        // Enters from left (initial position pushed to the left)
        tx = -effectiveDistance;
        break;
      case 'none':
      default:
        tx = 0;
        ty = 0;
        break;
    }

    const transformSegments: string[] = [];
    transformSegments.push(`translate3d(${tx}px, ${ty}px, 0)`);

    if (actualScale !== 1) {
      transformSegments.push(`scale(${actualScale})`);
    }

    if (actualRotate !== 0) {
      transformSegments.push(`rotate(${actualRotate}deg)`);
    }

    return transformSegments.join(' ');
  };

  if (isCompleted && once) {
    return (
      <div ref={elementRef} id={id || autoIdRef.current} className={className} style={style}>
        {children}
      </div>
    );
  }

  const transformValue = isVisible
    ? 'translate3d(0, 0, 0) scale(1) rotate(0deg)'
    : getInitialTransform();

  return (
    <div
      ref={elementRef}
      id={id || autoIdRef.current}
      style={{
        ...style,
        opacity: isVisible ? 1 : 0,
        transform: transformValue,
        transition: `opacity ${actualDuration}ms ${actualEasing} ${delay}ms, transform ${actualDuration}ms ${actualEasing} ${delay}ms`,
        willChange: isVisible ? 'auto' : 'transform, opacity',
      }}
      className={className}
    >
      {children}
    </div>
  );
};

// ============================================================================
// SPECIALIZED HELPERS FOR INTUITIVE TYPING & DECLARATIVE CODES
// ============================================================================

export const RevealHeading: React.FC<ScrollRevealProps> = (props) => (
  <ScrollReveal preset="heading" {...props} />
);

export const RevealText: React.FC<ScrollRevealProps> = (props) => (
  <ScrollReveal preset="text" {...props} />
);

export const RevealCard: React.FC<ScrollRevealProps> = (props) => (
  <ScrollReveal preset="card-up" {...props} />
);

export const RevealIcon: React.FC<ScrollRevealProps> = (props) => (
  <ScrollReveal preset="icon" {...props} />
);

export const RevealButton: React.FC<ScrollRevealProps> = (props) => (
  <ScrollReveal preset="button" {...props} />
);

export const RevealImage: React.FC<ScrollRevealProps> = (props) => (
  <ScrollReveal preset="image" {...props} />
);

export interface FadeInHeaderProps {
  badge?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center' | 'right';
  badgeColor?: string;
  titleColor?: string;
  descriptionColor?: string;
  className?: string;
  children?: React.ReactNode;
  delay?: number;
}

/**
 * FadeInHeader Component
 * Unified, responsive header helper with sequenced luxury typography reveal and overshoot settling.
 */
export const FadeInHeader: React.FC<FadeInHeaderProps> = ({
  badge,
  title,
  description,
  align = 'left',
  badgeColor = 'text-[#5D7C56]',
  titleColor = 'text-[#334230]',
  descriptionColor = 'text-[#616059]',
  className = '',
  children,
  delay = 0,
}) => {
  const alignmentClass =
    align === 'center'
      ? 'text-center items-center mx-auto'
      : align === 'right'
      ? 'text-right items-end ml-auto'
      : 'text-left items-start';

  const badgeAlign =
    align === 'center' ? 'justify-center' : align === 'right' ? 'justify-end' : 'justify-start';

  return (
    <div className={`space-y-3 max-w-2xl flex flex-col ${alignmentClass} ${className}`}>
      {badge && (
        <ScrollReveal
          direction="up"
          distance={40}
          delay={delay}
          duration={900}
          easing="smooth"
        >
          <div className={`flex items-center gap-3 ${badgeAlign}`}>
            <span className="w-8 h-[1px] bg-[#A3BFA0]" />
            <span className={`uppercase tracking-[0.3em] text-xs sm:text-sm font-semibold ${badgeColor}`}>
              {badge}
            </span>
            {align === 'center' && <span className="w-8 h-[1px] bg-[#A3BFA0]" />}
          </div>
        </ScrollReveal>
      )}

      <ScrollReveal
        preset="heading"
        delay={delay + 100}
        duration={1200}
        distance={60}
        scale={0.96}
        easing="overshoot"
      >
        <h2 className={`font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight ${titleColor}`}>
          {title}
        </h2>
      </ScrollReveal>

      {description && (
        <ScrollReveal
          preset="text"
          delay={delay + 220}
          duration={1100}
          distance={45}
        >
          <p className={`text-sm sm:text-base font-light leading-relaxed ${descriptionColor}`}>
            {description}
          </p>
        </ScrollReveal>
      )}

      {children && (
        <ScrollReveal
          preset="card-up"
          delay={delay + 320}
          duration={1150}
        >
          {children}
        </ScrollReveal>
      )}
    </div>
  );
};
