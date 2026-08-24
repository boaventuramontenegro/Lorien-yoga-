import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { TESTIMONIALS_DATA } from '../data/testimonials';
import { FadeInHeader, ScrollReveal, RevealButton, RevealIcon } from './ScrollReveal';

export const Depoimentos: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS_DATA.length - 1 : prev - 1));
  };

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev === TESTIMONIALS_DATA.length - 1 ? 0 : prev + 1));
  };

  const current = TESTIMONIALS_DATA[currentIndex];

  return (
    <section 
      id="depoimentos" 
      className="py-16 sm:py-20 md:py-24 bg-[#FAF7F2] relative overflow-hidden scroll-mt-20 text-[#2C2B27]"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabeçalho da Seção */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-6">
          <FadeInHeader
            badge="Relatos & Experiências"
            title="O que dizem os alunos"
            description="Depoimentos reais de quem encontrou acolhimento, leveza e transformação nas práticas com a Lorien."
          />

          {/* Selo Google 5.0 Estrelas com Ícones Estelares Pop */}
          <ScrollReveal direction="left" distance={60} delay={180} duration={1000} className="flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-[#E5DFD5] shadow-2xs self-start md:self-auto">
            <div className="w-9 h-9 rounded-xl bg-[#EFF4EC] text-[#5D7C56] flex items-center justify-center font-bold font-serif text-sm">
              G
            </div>
            <div className="text-left">
              <div className="flex items-center gap-1 text-[#E0B042]">
                {[...Array(5)].map((_, i) => (
                  <RevealIcon key={i} delay={250 + i * 60} rotate={12} scale={0.75}>
                    <Star className="w-3.5 h-3.5 fill-current" />
                  </RevealIcon>
                ))}
              </div>
              <span className="text-[11px] text-[#7A786F] font-medium block mt-0.5">
                Avaliação 5.0 no Google
              </span>
            </div>
          </ScrollReveal>
        </div>

        {/* Card Principal de Depoimento em Destaque com Overshoot Settling */}
        <ScrollReveal
          preset="card-up"
          delay={220}
          duration={1200}
          distance={80}
          scale={0.96}
          easing="overshoot"
        >
          <div className="relative rounded-[28px] sm:rounded-[36px] bg-white border border-[#E5DFD5] p-7 sm:p-10 md:p-12 shadow-[0_8px_32px_rgba(25,35,20,0.06)]">
            
            {/* Ícone de Aspas Elegante com Rotação Inicial */}
            <div className="absolute top-6 right-6 sm:top-8 sm:right-8">
              <RevealIcon delay={380} rotate={-20} scale={0.7}>
                <Quote className="w-12 h-12 text-[#E8ECE5] stroke-1" />
              </RevealIcon>
            </div>

            <div className="max-w-3xl space-y-6 relative z-10">
              
              {/* Estrelas do Depoimento */}
              <div className="flex items-center gap-1 text-[#E0B042]">
                {[...Array(current.rating || 5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>

              {/* Texto do Depoimento */}
              <p className="font-serif text-lg sm:text-xl md:text-2xl text-[#334230] font-normal leading-relaxed italic">
                "{current.text}"
              </p>

              {/* Autor e Modalidade */}
              <div className="pt-2 border-t border-[#F0EBE3] flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#EFF4EC] text-[#5D7C56] font-semibold text-sm flex items-center justify-center border border-[#DCE4D6]">
                    {current.avatarLetter || current.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#334230] text-sm sm:text-base">
                      {current.name}
                    </h4>
                    {current.role && (
                      <span className="text-xs text-[#7A786F] font-light">
                        {current.role}
                      </span>
                    )}
                  </div>
                </div>

                {/* Controles de Navegação com RevealButton */}
                <div className="flex items-center gap-2">
                  <RevealButton delay={450}>
                    <button
                      type="button"
                      id="btn-prev-depoimento"
                      onClick={prevTestimonial}
                      aria-label="Depoimento anterior"
                      className="w-10 h-10 rounded-full border border-[#D8D2C5] bg-white hover:bg-[#EFF4EC] hover:border-[#8EA886] text-[#334230] flex items-center justify-center transition-all cursor-pointer shadow-2xs hover:scale-105 active:scale-95"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                  </RevealButton>

                  <RevealButton delay={550}>
                    <button
                      type="button"
                      id="btn-next-depoimento"
                      onClick={nextTestimonial}
                      aria-label="Próximo depoimento"
                      className="w-10 h-10 rounded-full border border-[#D8D2C5] bg-white hover:bg-[#EFF4EC] hover:border-[#8EA886] text-[#334230] flex items-center justify-center transition-all cursor-pointer shadow-2xs hover:scale-105 active:scale-95"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </RevealButton>
                </div>
              </div>

            </div>

          </div>
        </ScrollReveal>

        {/* Indicadores de Paginação Sutis */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {TESTIMONIALS_DATA.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Ir para depoimento ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                idx === currentIndex
                  ? 'w-6 bg-[#5D7C56]'
                  : 'w-2 bg-[#D3CBC0] hover:bg-[#A3BFA0]'
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
