import React from 'react';

export type LogoVariant = 'dark' | 'light' | 'white' | 'black';

interface LogoProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /**
   * 'dark' | 'white' = Fundo escuro atrás (exibe a logo branca)
   * 'light' | 'black' = Fundo claro atrás (exibe a logo preta)
   */
  variant?: LogoVariant;
  showText?: boolean;
  textClassName?: string;
}

// Imagens reais com transparência nativa (canal alpha)
export const LOGO_BLACK_URL = 'https://i.postimg.cc/wvQcWfTp/file-00000000e0b8820e889d121bccf884d5.png';
export const LOGO_WHITE_URL = 'https://i.postimg.cc/VvYyTVqn/file-000000002c60820eb3247cba9f870f83.png';

const sizeMap = {
  xs: 'w-8 h-8',
  sm: 'w-10 h-10',
  md: 'w-12 h-12 sm:w-14 sm:h-14',
  lg: 'w-16 h-16 sm:w-20 sm:h-20',
  xl: 'w-24 h-24 sm:w-28 sm:h-28',
};

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  variant = 'light',
  showText = false,
  textClassName = '',
}) => {
  // Fundo escuro (dark/white) -> logo branca; Fundo claro (light/black) -> logo preta
  const isDarkBackground = variant === 'dark' || variant === 'white';
  const logoSrc = isDarkBackground ? LOGO_WHITE_URL : LOGO_BLACK_URL;

  return (
    <div className={`inline-flex items-center gap-3 sm:gap-3.5 bg-transparent ${className}`}>
      <img
        src={logoSrc}
        alt="Lorien Valsecchi - Logo"
        loading="eager"
        decoding="async"
        className={`${sizeMap[size]} object-contain bg-transparent shrink-0`}
      />

      {showText && (
        <div className={`flex flex-col justify-center text-left ${textClassName}`}>
          <span
            className={`font-serif text-xl sm:text-2xl font-medium tracking-wide leading-tight transition-colors duration-300 ${
              isDarkBackground ? 'text-[#FDFBF7]' : 'text-[#182315]'
            }`}
          >
            Lorien Valsecchi
          </span>
          <span
            className={`text-[10px] sm:text-[11px] font-sans tracking-[0.22em] uppercase font-semibold mt-0.5 transition-colors duration-300 ${
              isDarkBackground ? 'text-[#A3BFA0]' : 'text-[#5D7C56]'
            }`}
          >
            Terapeuta Corporal & Yoga
          </span>
        </div>
      )}
    </div>
  );
};
