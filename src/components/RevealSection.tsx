import React, { useEffect, useRef, useState } from 'react';

interface RevealSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  threshold?: number;
  rootMargin?: string;
  delay?: number;
  duration?: number;
  distance?: number;
}

export const RevealSection: React.FC<RevealSectionProps> = ({
  children,
  className = '',
  id,
  threshold = 0.05,
  rootMargin = '0px 0px -40px 0px',
  delay = 0,
  duration = 750,
  distance = 18,
}) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [animationCompleted, setAnimationCompleted] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsRevealed(true);
      setAnimationCompleted(true);
      return;
    }

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
    if (prefersReducedMotion) {
      setIsRevealed(true);
      setAnimationCompleted(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry], obs) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          obs.unobserve(entry.target);

          // Once animation finishes, clear transitions & willChange to free GPU memory completely
          const timer = setTimeout(() => {
            setAnimationCompleted(true);
          }, delay + duration + 50);

          return () => clearTimeout(timer);
        }
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
  }, [threshold, rootMargin, delay, duration]);

  // If already fully animated, render without any GPU layer or transformation overhead
  if (animationCompleted) {
    return (
      <div ref={elementRef} id={id} className={className}>
        {children}
      </div>
    );
  }

  return (
    <div
      ref={elementRef}
      id={id}
      style={{
        opacity: isRevealed ? 1 : 0,
        transform: isRevealed ? 'translate3d(0, 0, 0)' : `translate3d(0, ${distance}px, 0)`,
        transitionProperty: 'opacity, transform',
        transitionDuration: `${duration}ms`,
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        transitionDelay: `${delay}ms`,
        willChange: isRevealed ? 'opacity, transform' : 'auto',
      }}
      className={className}
    >
      {children}
    </div>
  );
};


