import React from 'react';
import { ScrollReveal, RevealHeading, RevealText, RevealButton, RevealIcon } from './ScrollReveal';

export const Hero: React.FC = () => {
  return (
    <section
      id="inicio"
      className="relative min-h-[92vh] lg:min-h-screen flex flex-col justify-center pt-24 pb-14 sm:pb-16 overflow-hidden bg-[#181B14]"
    >
      {/* Background Image: Full Bleed Yoga Nature Sunrise Deck Scene */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=2400&q=85"
          alt="Yoga e Terapias Corporais — Lorien Valsecchi"
          referrerPolicy="no-referrer"
          decoding="async"
          className="w-full h-full object-cover object-[75%_center] lg:object-[65%_center] scale-100"
        />

        {/* Cinematic Atmospheric Gradients for High Legibility */}
        {/* Desktop Left-to-Right & Bottom Vignettes */}
        <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-[#141710]/95 via-[#141710]/80 to-transparent w-3/5" />
        <div className="hidden lg:block absolute inset-0 bg-gradient-to-t from-[#141710] via-transparent to-transparent h-44 bottom-0" />
        
        {/* Mobile Subtle Bottom-to-Top Overlay Ensuring Crisp Contrast */}
        <div className="lg:hidden absolute inset-0 bg-gradient-to-t from-[#141710]/98 via-[#141710]/75 to-[#141710]/40" />
        <div className="lg:hidden absolute inset-0 bg-gradient-to-r from-[#141710]/90 via-[#141710]/50 to-transparent" />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 w-full py-12 lg:py-20">
        <div className="max-w-xl lg:max-w-2xl text-left space-y-6 sm:space-y-7">
          
          {/* 1. Category / Eyebrow (Letter-spacing expanded for luxury feel) */}
          <ScrollReveal direction="up" distance={50} duration={1100} delay={150} easing="smooth">
            <div className="space-y-1">
              <span className="uppercase tracking-[0.35em] text-[11px] sm:text-xs text-[#A3BFA0] font-semibold block leading-relaxed drop-shadow-xs">
                Terapeuta Corporal
              </span>
              <span className="uppercase tracking-[0.35em] text-[11px] sm:text-xs text-[#A3BFA0] font-semibold block leading-relaxed drop-shadow-xs">
                & Instrutora
              </span>
            </div>
          </ScrollReveal>

          {/* Small Decorative Motif / Flower Symbol with rotation pop */}
          <RevealIcon delay={320} duration={850} rotate={-18} scale={0.8}>
            <div className="flex items-center gap-2 text-[#A3BFA0] opacity-90 py-0.5">
              <svg
                className="w-4 h-4 text-[#A3BFA0]"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 2C11.5 5.5 8 9 4.5 9.5C8 10 11.5 13.5 12 17C12.5 13.5 16 10 19.5 9.5C16 9 12.5 5.5 12 2Z" />
                <circle cx="12" cy="12" r="1.5" fill="#E4A8A3" />
              </svg>
              <span className="h-[1px] w-8 bg-white/25" />
            </div>
          </RevealIcon>

          {/* 2. Description Paragraph */}
          <RevealText delay={460} duration={1150} distance={50}>
            <p className="text-[#EAE7E1] text-base sm:text-lg lg:text-xl leading-relaxed font-light max-w-lg drop-shadow-xs text-balance">
              Integrando o movimento do solo e a leveza do aéreo em práticas conscientes. 
              Um convite para reconectar corpo, mente e energia em um ambiente acolhedor.
            </p>
          </RevealText>

          {/* 3. Action Buttons with Pop & Scale */}
          <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 max-w-md sm:max-w-none">
            <RevealButton delay={680} duration={850}>
              <a
                id="hero-cta-agendamento"
                href="#agendamento"
                className="inline-flex items-center justify-center px-7 py-3.5 sm:py-4 rounded-full text-[11px] sm:text-xs uppercase tracking-widest font-bold bg-[#5D7C56] hover:bg-[#4E6B47] text-white shadow-[0_4px_20px_rgba(50,75,45,0.35)] hover:shadow-xl transition-all duration-300 transform active:scale-98 cursor-pointer"
              >
                <span>Solicitar Agendamento</span>
              </a>
            </RevealButton>

            <RevealButton delay={840} duration={850}>
              <a
                id="hero-secondary-btn"
                href="#servicos"
                className="inline-flex items-center justify-center px-7 py-3.5 sm:py-4 rounded-full text-[11px] sm:text-xs uppercase tracking-widest font-bold text-white bg-black/35 hover:bg-black/50 backdrop-blur-xs border border-white/30 hover:border-white/60 transition-all duration-300 shadow-md cursor-pointer"
              >
                <span>Conhecer Serviços</span>
              </a>
            </RevealButton>
          </div>

        </div>
      </div>

    </section>
  );
};
