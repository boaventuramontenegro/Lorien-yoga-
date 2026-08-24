import React, { useState } from 'react';
import { ScrollReveal } from './ScrollReveal';

// URLs das imagens oficiais fornecidas
const BLOG_CTA_DESKTOP_IMG = 'https://i.postimg.cc/g2s18HfZ/file-0000000048c4820e8a3469261c78ad71.png';
const BLOG_CTA_MOBILE_IMG = 'https://i.postimg.cc/ydMGsQS3/file-0000000074d8820ea992fb67ee92971a.png';
const INSTAGRAM_TARGET_URL = 'https://www.instagram.com/lorien_yoga';

export const BlogCTA: React.FC = () => {
  const [desktopLoaded, setDesktopLoaded] = useState(false);
  const [mobileLoaded, setMobileLoaded] = useState(false);

  return (
    <section
      id="blog"
      className="py-10 sm:py-14 md:py-16 relative scroll-mt-20"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal
          direction="up"
          distance={70}
          scale={0.97}
          duration={1300}
          delay={80}
          easing="overshoot"
        >
          <a
            id="banner-blog-instagram-link"
            href={INSTAGRAM_TARGET_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group block w-full overflow-hidden rounded-[24px] sm:rounded-[30px] md:rounded-[36px] shadow-[0_8px_28px_rgba(20,35,22,0.12)] hover:shadow-[0_16px_36px_rgba(20,35,22,0.2)] transition-all duration-300 transform hover:-translate-y-0.5 active:scale-[0.99] cursor-pointer bg-[#243321] border border-[#E5DFD5]/70"
            title="Acompanhe Lorien Valsecchi no Instagram"
            aria-label="Acompanhe Lorien Valsecchi no Instagram @lorien_yoga"
          >
            {/* Versão Desktop (Horizontal, telas >= 768px / md) diretamente como card principal */}
            <div className="hidden md:block relative w-full aspect-[1280/542] bg-[#243321] overflow-hidden">
              {!desktopLoaded && (
                <div className="absolute inset-0 bg-[#243321] animate-pulse" />
              )}
              <img
                src={BLOG_CTA_DESKTOP_IMG}
                alt="Acompanhe a gente no Instagram - Lorien Valsecchi - Siga nosso Instagram"
                width={1280}
                height={542}
                className={`w-full h-full object-contain transition-all duration-500 group-hover:scale-[1.008] ${
                  desktopLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                referrerPolicy="no-referrer"
                loading="lazy"
                decoding="async"
                onLoad={() => setDesktopLoaded(true)}
              />
            </div>

            {/* Versão Mobile (Vertical, telas < 768px / até sm) com aspect ratio preservado */}
            <div className="block md:hidden relative w-full aspect-[600/800] bg-[#243321] rounded-[24px] sm:rounded-[32px] overflow-hidden">
              {!mobileLoaded && (
                <div className="absolute inset-0 bg-[#243321] animate-pulse" />
              )}
              <img
                src={BLOG_CTA_MOBILE_IMG}
                alt="Acompanhe a gente no Instagram - Lorien Valsecchi - Siga nosso Instagram"
                width={600}
                height={800}
                className={`w-full h-full object-contain rounded-[24px] sm:rounded-[32px] transition-all duration-500 group-hover:scale-[1.008] ${
                  mobileLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                referrerPolicy="no-referrer"
                loading="lazy"
                decoding="async"
                onLoad={() => setMobileLoaded(true)}
              />
            </div>
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
};
