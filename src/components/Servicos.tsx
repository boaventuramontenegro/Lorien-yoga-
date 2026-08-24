import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SERVICES_DATA } from '../data/services';
import { ServiceCard } from './ServiceCard';
import { FadeInHeader, ScrollReveal, RevealButton } from './ScrollReveal';

type CategoryFilter = 'all' | 'yoga' | 'terapias' | 'oraculo';

export const Servicos: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');
  const [highlightedId, setHighlightedId] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const filteredServices = activeCategory === 'all'
    ? SERVICES_DATA
    : SERVICES_DATA.filter((s) => s.category === activeCategory);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 370;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section 
      id="servicos" 
      className="py-16 sm:py-20 md:py-24 bg-[#FAF7F2] relative overflow-hidden scroll-mt-20 text-[#2C2B27]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-6">
          <FadeInHeader
            badge="Modalidades & Atendimentos"
            title="Práticas & Terapias"
            description="Explore as modalidades de Yoga e terapias integrativas com atendimento individualizado ou em turmas reduzidas."
          />

          {/* Desktop Navigation Arrows */}
          <div className="hidden md:flex items-center gap-2">
            <RevealButton delay={250}>
              <button
                type="button"
                id="btn-scroll-left"
                onClick={() => handleScroll('left')}
                aria-label="Rolar para esquerda"
                className="w-11 h-11 rounded-full border border-[#D8D2C5] bg-white hover:bg-[#EFF4EC] hover:border-[#8EA886] text-[#334230] flex items-center justify-center transition-all shadow-2xs hover:scale-105 active:scale-95 cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            </RevealButton>

            <RevealButton delay={350}>
              <button
                type="button"
                id="btn-scroll-right"
                onClick={() => handleScroll('right')}
                aria-label="Rolar para direita"
                className="w-11 h-11 rounded-full border border-[#D8D2C5] bg-white hover:bg-[#EFF4EC] hover:border-[#8EA886] text-[#334230] flex items-center justify-center transition-all shadow-2xs hover:scale-105 active:scale-95 cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </RevealButton>
          </div>
        </div>

        {/* Category Filters */}
        <ScrollReveal direction="up" distance={45} delay={180} duration={1000} className="mb-8 overflow-x-auto pb-2 scrollbar-none">
          <div className="flex items-center gap-2 min-w-max">
            {[
              { id: 'all', label: 'Todos os Serviços' },
              { id: 'yoga', label: 'Práticas de Yoga' },
              { id: 'terapias', label: 'Terapias Corporais' },
              { id: 'oraculo', label: 'Oráculo Terapêutico' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveCategory(tab.id as CategoryFilter)}
                className={`px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wider transition-all duration-300 cursor-pointer ${
                  activeCategory === tab.id
                    ? 'bg-[#5D7C56] text-white shadow-xs scale-102'
                    : 'bg-white/80 hover:bg-white text-[#5E5D56] hover:text-[#334230] border border-[#E5DFD5]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Horizontal Carousel of Cards with Staggered Overshoot Entry */}
        <div
          ref={scrollContainerRef}
          id="services-carousel"
          tabIndex={0}
          aria-label="Carrossel de serviços e terapias"
          className="flex gap-5 sm:gap-6 overflow-x-auto pb-8 pt-2 scrollbar-none snap-x snap-mandatory scroll-smooth -mx-4 px-4 sm:mx-0 sm:px-0 focus:outline-none"
        >
          {filteredServices.map((service, index) => {
            return (
              <div 
                key={service.id} 
                className="snap-start shrink-0"
              >
                <ScrollReveal
                  preset="card-up"
                  delay={index * 160}
                  duration={1200}
                  distance={75}
                  scale={0.96}
                  easing="overshoot"
                >
                  <ServiceCard
                    service={service}
                    isHighlighted={highlightedId === service.id}
                    onHover={(id) => setHighlightedId(id)}
                  />
                </ScrollReveal>
              </div>
            );
          })}
        </div>

        {/* Mobile Swipe Hint */}
        <div className="md:hidden flex items-center justify-center gap-2 pt-2 text-xs text-[#8A887E]">
          <span>← Deslize para ver todas as modalidades →</span>
        </div>

      </div>
    </section>
  );
};
