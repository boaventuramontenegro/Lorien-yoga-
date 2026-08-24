import React from 'react';
import { ScrollReveal, ScrollRevealProps, FadeInHeader, FadeInHeaderProps } from './ScrollReveal';

export interface RevealSectionProps extends ScrollRevealProps {
  // Alias for backward compatibility
}

export const RevealSection: React.FC<RevealSectionProps> = (props) => {
  return <ScrollReveal {...props} />;
};

export { ScrollReveal, FadeInHeader };
export type { FadeInHeaderProps };
