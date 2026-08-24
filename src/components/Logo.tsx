import React, { useState, useEffect, useCallback, useRef } from 'react';

export type LogoVariant = 'black' | 'white' | 'dark' | 'light' | 'sage' | 'gold' | 'default';

interface LogoProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: LogoVariant;
  showText?: boolean;
  textClassName?: string;
}

export const OFFICIAL_LOGO_URL = 'https://i.postimg.cc/C5jL4SrB/file-000000004960820e91d5a5e3039d47d1.png';

// In-memory cache for processed trimmed transparent PNG data URLs
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

  // Processed transparent PNG data URL from cache or null
  const [processedSrc, setProcessedSrc] = useState<string>(transparentCache[variant] || '');
  // Track image load state specifically for the <img> tag
  const [isImgReady, setIsImgReady] = useState<boolean>(false);
  const isMountedRef = useRef<boolean>(true);

  // Standard sizes
  const sizeMap = {
    xs: 'w-8 h-8',
    sm: 'w-11 h-11',
    md: 'w-14 h-14 sm:w-16 sm:h-16',
    lg: 'w-18 h-18 sm:w-20 sm:h-20',
    xl: 'w-24 h-24 sm:w-28 sm:h-28',
  };

  const processImageToTransparentPng = useCallback((sourceUrl: string, targetVariant: LogoVariant) => {
    if (transparentCache[targetVariant]) {
      if (isMountedRef.current) {
        setProcessedSrc(transparentCache[targetVariant]);
      }
      return;
    }

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = sourceUrl;

    img.onload = () => {
      try {
        const rawCanvas = document.createElement('canvas');
        rawCanvas.width = img.naturalWidth || 500;
        rawCanvas.height = img.naturalHeight || 500;
        const ctx = rawCanvas.getContext('2d', { willReadFrequently: true });
        if (!ctx) return;

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

        // 1st Pass: detect brightness, strip solid white/off-white background to 100% alpha transparent
        for (let y = 0; y < h; y++) {
          for (let x = 0; x < w; x++) {
            const idx = (y * w + x) * 4;
            const r = data[idx];
            const g = data[idx + 1];
            const b = data[idx + 2];
            const brightness = (r + g + b) / 3;

            // Remove any light background (solid white or light gray) -> 100% Transparent
            if (brightness > 215) {
              data[idx + 3] = 0; // 100% Transparent Alpha
            } else {
              if (brightness > 165) {
                const alphaFactor = (215 - brightness) / 50;
                data[idx + 3] = Math.floor(data[idx + 3] * Math.max(0, Math.min(1, alphaFactor)));
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

        // 2nd Pass: apply color tinting (Pure White for dark hero / footer, Deep Forest Charcoal for light header)
        for (let i = 0; i < data.length; i += 4) {
          const alpha = data[i + 3];
          if (alpha > 0) {
            if (targetVariant === 'white' || targetVariant === 'light') {
              data[i] = 255;     // R
              data[i + 1] = 255; // G
              data[i + 2] = 255; // B
            } else if (targetVariant === 'gold') {
              data[i] = 212;     // R
              data[i + 1] = 181; // G
              data[i + 2] = 106; // B
            } else if (targetVariant === 'sage') {
              data[i] = 93;      // R
              data[i + 1] = 124; // G
              data[i + 2] = 86;  // B
            } else {
              // Deep Forest Charcoal
              data[i] = 24;      // R
              data[i + 1] = 30;  // G
              data[i + 2] = 22;  // B
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
            transparentCache[targetVariant] = trimmedDataUrl;
            if (isMountedRef.current) {
              setProcessedSrc(trimmedDataUrl);
            }
            return;
          }
        }

        const dataUrl = rawCanvas.toDataURL('image/png');
        transparentCache[targetVariant] = dataUrl;
        if (isMountedRef.current) {
          setProcessedSrc(dataUrl);
        }
      } catch {
        // Silent fallback to transparent vector silhouette
      }
    };

    img.onerror = () => {
      // Keep vector fallback
    };
  }, []);

  useEffect(() => {
    isMountedRef.current = true;
    setIsImgReady(false);

    if (transparentCache[variant]) {
      setProcessedSrc(transparentCache[variant]);
    } else {
      processImageToTransparentPng(OFFICIAL_LOGO_URL, variant);
    }

    return () => {
      isMountedRef.current = false;
    };
  }, [variant, processImageToTransparentPng]);

  return (
    <div className={`inline-flex items-center gap-3 sm:gap-3.5 bg-transparent p-0 m-0 border-0 ${className}`}>
      {/* Outer wrapper: Strictly 100% transparent, absolutely no background colors */}
      <div 
        className={`relative flex items-center justify-center shrink-0 bg-transparent overflow-hidden ${sizeMap[size]}`}
        style={{ backgroundColor: 'transparent' }}
      >
        {/* Instant Vector Silhouette: Always transparent, guarantees zero flash of white boxes or empty outlines */}
        <svg
          viewBox="0 0 100 100"
          className={`absolute inset-0 w-full h-full bg-transparent transition-opacity duration-400 ease-out pointer-events-none select-none ${
            isImgReady ? 'opacity-0' : 'opacity-100'
          } ${isWhite ? 'text-white' : 'text-[#182315]'}`}
          fill="currentColor"
          aria-hidden="true"
          style={{ backgroundColor: 'transparent' }}
        >
          {/* Meditative Lotus & Silhouette */}
          <circle cx="50" cy="28" r="9" />
          <path d="M50 40 C44 40 37 46 36 56 C35 63 32 68 22 72 C32 73 40 70 45 66 C47 68 50 69 50 69 C50 69 53 68 55 66 C60 70 68 73 78 72 C68 68 65 63 64 56 C63 46 56 40 50 40 Z" />
          <path d="M50 71 C42 71 35 74 27 79 C37 81 45 78 50 75 C55 78 63 81 73 79 C65 74 58 71 50 71 Z" opacity="0.85" />
          <path d="M50 16 C53 20 57 23 62 25 C58 27 54 27 50 25 C46 27 42 27 38 25 C43 23 47 20 50 16 Z" opacity="0.75" />
        </svg>

        {/* High-Resolution Alpha-Transparent PNG with Smooth Fade-In via onLoad */}
        {processedSrc ? (
          <img
            src={processedSrc}
            alt="Lorien Valsecchi - Silhueta Meditação e Yoga"
            referrerPolicy="no-referrer"
            onLoad={() => {
              if (isMountedRef.current) {
                setIsImgReady(true);
              }
            }}
            className={`w-full h-full object-contain bg-transparent select-none pointer-events-none transition-opacity duration-400 ease-out ${
              isImgReady ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ backgroundColor: 'transparent', border: 'none', outline: 'none' }}
            loading="eager"
            decoding="async"
          />
        ) : null}
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

