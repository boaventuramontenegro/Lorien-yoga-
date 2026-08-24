import React, { useState, useEffect } from 'react';

export type LogoVariant = 'black' | 'white' | 'dark' | 'light' | 'sage' | 'gold' | 'default';

interface LogoProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: LogoVariant;
  showText?: boolean;
  textClassName?: string;
}

export const OFFICIAL_LOGO_URL = 'https://i.postimg.cc/C5jL4SrB/file-000000004960820e91d5a5e3039d47d1.png';

// In-memory cache for processed trimmed transparent data URLs
const transparentCache: Record<string, string> = {};

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  variant = 'black',
  showText = false,
  textClassName = '',
}) => {
  const isWhite = variant === 'white' || variant === 'light';
  const isBlack = variant === 'black' || variant === 'dark' || variant === 'default';

  const [processedSrc, setProcessedSrc] = useState<string>(transparentCache[variant] || '');

  // Larger, prominent, perfectly sharp and centered sizes
  const sizeMap = {
    xs: 'w-8 h-8',
    sm: 'w-11 h-11',
    md: 'w-14 h-14 sm:w-16 sm:h-16',
    lg: 'w-18 h-18 sm:w-20 sm:h-20',
    xl: 'w-24 h-24 sm:w-28 sm:h-28',
  };

  useEffect(() => {
    if (transparentCache[variant]) {
      setProcessedSrc(transparentCache[variant]);
      return;
    }

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = OFFICIAL_LOGO_URL;

    img.onload = () => {
      try {
        const rawCanvas = document.createElement('canvas');
        rawCanvas.width = img.naturalWidth || 500;
        rawCanvas.height = img.naturalHeight || 500;
        const ctx = rawCanvas.getContext('2d', { willReadFrequently: true });
        if (!ctx) {
          setProcessedSrc(OFFICIAL_LOGO_URL);
          return;
        }

        ctx.drawImage(img, 0, 0);
        const imgData = ctx.getImageData(0, 0, rawCanvas.width, rawCanvas.height);
        const data = imgData.data;
        const w = rawCanvas.width;
        const h = rawCanvas.height;

        let minX = w;
        let minY = h;
        let maxX = 0;
        let maxY = 0;
        let hasArt = false;

        // 1st Pass: detect brightness, make white background 100% transparent, and calculate bounding box
        for (let y = 0; y < h; y++) {
          for (let x = 0; x < w; x++) {
            const idx = (y * w + x) * 4;
            const r = data[idx];
            const g = data[idx + 1];
            const b = data[idx + 2];
            const brightness = (r + g + b) / 3;

            if (brightness > 225) {
              data[idx + 3] = 0; // Transparent
            } else {
              if (brightness > 185) {
                const alphaFactor = (225 - brightness) / 40;
                data[idx + 3] = Math.floor(data[idx + 3] * alphaFactor);
              }

              if (data[idx + 3] > 15) {
                hasArt = true;
                if (x < minX) minX = x;
                if (x > maxX) maxX = x;
                if (y < minY) minY = y;
                if (y > maxY) maxY = y;
              }
            }
          }
        }

        // 2nd Pass: apply color tinting (Pure White for dark hero / footer, Pure Black for light scrolled header)
        for (let i = 0; i < data.length; i += 4) {
          const alpha = data[i + 3];
          if (alpha > 0) {
            if (isWhite) {
              data[i] = 255;     // R
              data[i + 1] = 255; // G
              data[i + 2] = 255; // B
            } else if (isBlack) {
              data[i] = 20;      // R
              data[i + 1] = 25;  // G
              data[i + 2] = 18;  // B
            } else if (variant === 'gold') {
              data[i] = 212;     // R
              data[i + 1] = 181; // G
              data[i + 2] = 106; // B
            } else if (variant === 'sage') {
              data[i] = 93;      // R
              data[i + 1] = 124; // G
              data[i + 2] = 86;  // B
            }
          }
        }

        ctx.putImageData(imgData, 0, 0);

        // 3rd Pass: Trim canvas to exact artwork bounding box + center inside a square canvas
        if (hasArt && maxX > minX && maxY > minY) {
          const artWidth = maxX - minX + 1;
          const artHeight = maxY - minY + 1;
          const maxDim = Math.max(artWidth, artHeight);
          const padding = Math.max(4, Math.floor(maxDim * 0.02));
          const targetDim = maxDim + padding * 2;

          const trimmedCanvas = document.createElement('canvas');
          trimmedCanvas.width = targetDim;
          trimmedCanvas.height = targetDim;
          const trimmedCtx = trimmedCanvas.getContext('2d');

          if (trimmedCtx) {
            const offsetX = Math.floor((targetDim - artWidth) / 2);
            const offsetY = Math.floor((targetDim - artHeight) / 2);

            trimmedCtx.drawImage(
              rawCanvas,
              minX,
              minY,
              artWidth,
              artHeight,
              offsetX,
              offsetY,
              artWidth,
              artHeight
            );

            const trimmedDataUrl = trimmedCanvas.toDataURL('image/png');
            transparentCache[variant] = trimmedDataUrl;
            setProcessedSrc(trimmedDataUrl);
            return;
          }
        }

        const dataUrl = rawCanvas.toDataURL('image/png');
        transparentCache[variant] = dataUrl;
        setProcessedSrc(dataUrl);
      } catch (err) {
        setProcessedSrc(OFFICIAL_LOGO_URL);
      }
    };

    img.onerror = () => {
      setProcessedSrc(OFFICIAL_LOGO_URL);
    };
  }, [variant, isWhite, isBlack]);

  return (
    <div className={`inline-flex items-center gap-3 sm:gap-3.5 bg-transparent p-0 m-0 border-0 ${className}`}>
      <div 
        className={`relative flex items-center justify-center shrink-0 bg-transparent overflow-hidden ${sizeMap[size]}`}
      >
        <img
          src={processedSrc || OFFICIAL_LOGO_URL}
          alt="Lorien Valsecchi - Silhueta Meditação e Yoga"
          referrerPolicy="no-referrer"
          className={`w-full h-full object-contain bg-transparent transition-all duration-200 ${
            !processedSrc
              ? isWhite
                ? 'filter brightness-0 invert'
                : 'mix-blend-multiply filter brightness-0'
              : ''
          }`}
          style={{ background: 'transparent' }}
          loading="eager"
        />
      </div>

      {showText && (
        <div className={`flex flex-col justify-center text-left ${textClassName}`}>
          <span 
            className={`font-serif text-xl sm:text-2xl font-medium tracking-wide leading-tight transition-colors duration-300 ${
              isWhite ? 'text-[#FDFBF7]' : 'text-[#182315]'
            }`}
          >
            Lorien Valsecchi
          </span>
          <span 
            className={`text-[10px] sm:text-[11px] font-sans tracking-[0.22em] uppercase font-semibold mt-0.5 transition-colors duration-300 ${
              isWhite ? 'text-[#A3BFA0]' : 'text-[#5D7C56]'
            }`}
          >
            Terapeuta Corporal & Yoga
          </span>
        </div>
      )}
    </div>
  );
};
