import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

export type RevealDirection = 'up' | 'down' | 'left' | 'right' | 'none';

export interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  direction?: RevealDirection;
  delay?: number;
  duration?: number;
  threshold?: number;
  rootMargin?: string;
  distance?: number;
  once?: boolean;
  style?: React.CSSProperties;
}

// Optional Passthrough Provider for backward compatibility
const ScrollContext = createContext<boolean>(true);

export const GatedScrollProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <ScrollContext.Provider value={true}>{children}</ScrollContext.Provider>;
};

export const useGatedScroll = () => {
  return useContext(ScrollContext);
};

let uniqueIdCounter = 0;

/**
 * ScrollReveal Component
 * Ultra-smooth, 60fps scroll animation component powered by native IntersectionObserver.
 * Does not lock or hijack scroll events, maintaining buttery natural scrolling.
 */
export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  id,
  direction = 'up',
  delay = 0,
  duration = 800,
  threshold = 0.1,
  rootMargin = '0px 0px -40px 0px',
  distance = 24,
  once = true,
  style = {},
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);
  const autoIdRef = useRef<string>(id || `sr-${++uniqueIdCounter}`);

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
              }, delay + duration + 50);
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
  }, [threshold, rootMargin, delay, duration, distance, direction, once]);

  const getInitialTransform = () => {
    switch (direction) {
      case 'up':
        return `translate3d(0, ${distance}px, 0)`;
      case 'down':
        return `translate3d(0, -${distance}px, 0)`;
      case 'left':
        return `translate3d(${distance}px, 0, 0)`;
      case 'right':
        return `translate3d(-${distance}px, 0, 0)`;
      case 'none':
      default:
        return 'none';
    }
  };

  if (isCompleted && once) {
    return (
      <div ref={elementRef} id={id || autoIdRef.current} className={className} style={style}>
        {children}
      </div>
    );
  }

  const transformValue = isVisible ? 'translate3d(0, 0, 0)' : getInitialTransform();

  return (
    <div
      ref={elementRef}
      id={id || autoIdRef.current}
      style={{
        ...style,
        opacity: isVisible ? 1 : 0,
        transform: transformValue,
        transition: `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
        willChange: isVisible ? 'auto' : 'transform, opacity',
      }}
      className={className}
    >
      {children}
    </div>
  );
};

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
 * Unified, responsive header helper with sequenced typography reveal.
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
        <ScrollReveal direction="up" delay={delay} duration={700}>
          <div className={`flex items-center gap-3 ${badgeAlign}`}>
            <span className="w-8 h-[1px] bg-[#A3BFA0]" />
            <span className={`uppercase tracking-[0.3em] text-xs sm:text-sm font-semibold ${badgeColor}`}>
              {badge}
            </span>
            {align === 'center' && <span className="w-8 h-[1px] bg-[#A3BFA0]" />}
          </div>
        </ScrollReveal>
      )}

      <ScrollReveal direction="up" delay={delay + 80} duration={750}>
        <h2 className={`font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight ${titleColor}`}>
          {title}
        </h2>
      </ScrollReveal>

      {description && (
        <ScrollReveal direction="up" delay={delay + 160} duration={800}>
          <p className={`text-sm sm:text-base font-light leading-relaxed ${descriptionColor}`}>
            {description}
          </p>
        </ScrollReveal>
      )}

      {children && (
        <ScrollReveal direction="up" delay={delay + 220} duration={800}>
          {children}
        </ScrollReveal>
      )}
    </div>
  );
};
