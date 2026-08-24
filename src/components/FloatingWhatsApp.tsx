import React, { useState, useEffect } from 'react';
import { getWhatsAppLink } from '../data/services';

export const FloatingWhatsApp: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroEl = document.getElementById('inicio');
      const footerEl = document.getElementById('footer');

      // Check if Hero is in view or user is at the top
      const heroHeight = heroEl ? heroEl.offsetHeight : 500;
      const isPastHero = window.scrollY > heroHeight * 0.55;

      // Check if Footer is in view
      let isFooterVisible = false;
      if (footerEl) {
        const rect = footerEl.getBoundingClientRect();
        isFooterVisible = rect.top < window.innerHeight - 40;
      }

      setIsVisible(isPastHero && !isFooterVisible);
    };

    // Initial check
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const handleWhatsAppClick = () => {
    const url = getWhatsAppLink(
      'Olá Lorien! Gostaria de tirar uma dúvida e saber mais sobre horários disponíveis.'
    );
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <aside
      aria-label="Atendimento via WhatsApp"
      className={`fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 select-none transition-all duration-300 ease-out ${
        isVisible
          ? 'opacity-100 translate-y-0 pointer-events-auto scale-100'
          : 'opacity-0 translate-y-5 pointer-events-none scale-90'
      }`}
    >
      <button
        id="floating-whatsapp-direct-btn"
        type="button"
        onClick={handleWhatsAppClick}
        aria-label="Abrir conversa no WhatsApp com Lorien Valsecchi"
        title="Falar no WhatsApp com Lorien"
        className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-[#5D7C56] via-[#516F4A] to-[#435D3D] hover:from-[#678860] hover:to-[#4D6947] text-white flex items-center justify-center shadow-[0_10px_28px_rgba(40,65,35,0.38),inset_0_1px_1px_rgba(255,255,255,0.3)] hover:shadow-[0_14px_34px_rgba(40,65,35,0.48)] hover:scale-105 active:scale-95 transition-all duration-300 border border-[#8FAF87]/60 relative group cursor-pointer"
      >
        {/* Subtle inner highlight rim */}
        <div className="absolute inset-[1px] rounded-full border border-white/20 pointer-events-none" />

        {/* Floating tooltip on desktop hover */}
        <span className="hidden md:group-hover:flex items-center absolute right-full mr-3.5 px-3 py-1.5 rounded-lg bg-[#2C3B27]/95 text-white text-xs font-medium tracking-wide shadow-lg whitespace-nowrap pointer-events-none transition-all duration-200 border border-[#8FAF87]/30">
          Falar no WhatsApp
          <span className="absolute left-full top-1/2 -translate-y-1/2 -ml-1 border-4 border-transparent border-l-[#2C3B27]/95" />
        </span>

        {/* WhatsApp Icon */}
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="w-7 h-7 sm:w-8 sm:h-8 text-[#FAF8F5] group-hover:text-white transition-transform group-hover:scale-110 drop-shadow-xs fill-current"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
      </button>
    </aside>
  );
};
