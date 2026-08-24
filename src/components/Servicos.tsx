import React, { useRef, useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SERVICES_DATA, getWhatsAppLink } from '../data/services';
import { ServiceCard } from './ServiceCard';
import { ScrollReveal, FadeInHeader } from './ScrollReveal';

export const Servicos: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<'todos' | 'yoga' | 'terapias' | 'oraculo'>('todos');
  // Always initialize with 'yoga-tradicional' as the first active card
  const [activeCardId, setActiveCardId] = useState<string>('yoga-tradicional');
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);

  const filteredServices = activeCategory === 'todos'
    ? SERVICES_DATA
    : SERVICES_DATA.filter((s) => s.category === activeCategory);

  // Reset to first card when category changes
  useEffect(() => {
    if (filteredServices.length > 0) {
      setActiveCardId(filteredServices[0].id);
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      }
    }
  }, [activeCategory]);

  // Reset to Yoga Tradicional whenever the user enters the section
  useEffect(() => {
    const sectionEl = document.getElementById('servicos');
    if (!sectionEl || typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          const container = scrollContainerRef.current;
          // If the container is at the start (or near start), ensure Yoga Tradicional is highlighted
          if (!container || container.scrollLeft < 50) {
            setActiveCardId(filteredServices[0]?.id || 'yoga-tradicional');
          }
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(sectionEl);
    return () => observer.disconnect();
  }, [filteredServices]);

  // Detect which card is closest to the visible focal point only during active user scrolling
  const updateActiveCardOnScroll = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    // If at the very start of scroll, the first card is always active
    if (container.scrollLeft <= 30) {
      if (filteredServices.length > 0) {
        setActiveCardId(filteredServices[0].id);
      }
      return;
    }

    const containerRect = container.getBoundingClientRect();
    // Use the left-third focal point of the viewport for natural reading direction
    const focalPoint = containerRect.left + (window.innerWidth >= 768 ? 240 : containerRect.width / 2);

    const cardElements = container.querySelectorAll<HTMLElement>('[data-service-card]');
    let closestId: string | null = null;
    let minDistance = Infinity;

    cardElements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      const cardCenter = rect.left + rect.width / 2;
      const distance = Math.abs(focalPoint - cardCenter);

      if (distance < minDistance) {
        minDistance = distance;
        closestId = el.getAttribute('data-service-card');
      }
    });

    if (closestId) {
      setActiveCardId(closestId);
    }
  }, [filteredServices]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateActiveCardOnScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [updateActiveCardOnScroll]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardElements = container.querySelectorAll<HTMLElement>('[data-service-card]');
      const cardWidth = cardElements.length > 0 ? cardElements[0].offsetWidth + 24 : 360;
      container.scrollBy({
        left: direction === 'left' ? -cardWidth : cardWidth,
        behavior: 'smooth',
      });
    }
  };

  const handleCardClick = (serviceId: string) => {
    setActiveCardId(serviceId);
  };

  return (
    <section id="servicos" className="py-20 md:py-28 bg-[#FDFBF7] relative overflow-hidden border-t border-[#E5E1D8] scroll-mt-20">
      <div id="terapias" className="scroll-mt-24" />
      
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <FadeInHeader
            badge="Práticas & Atendimentos"
            title="Serviços & Especialidades"
            description="Explore cada modalidade de Yoga e terapia integrativa deslizando horizontalmente. Atendimentos com foco em bem-estar, equilíbrio e autoconhecimento."
          />

          {/* Category Filter Tabs & Navigation Controls */}
          <ScrollReveal direction="up" delay={150}>
            {/* MOBILE FILTER: 100% Preserved exactly as original */}
            <div className="flex md:hidden flex-wrap items-center gap-3">
              <div className="flex items-center p-1 rounded-2xl bg-[#F7F3EE] border border-[#E5E1D8] text-[11px] uppercase tracking-wider font-semibold">
                <button
                  type="button"
                  onClick={() => setActiveCategory('todos')}
                  className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
                    activeCategory === 'todos'
                      ? 'bg-white text-[#334230] shadow-2xs font-bold'
                      : 'text-[#7A7A7A] hover:text-[#334230]'
                  }`}
                >
                  Todos ({SERVICES_DATA.length})
                </button>
                <button
                  type="button"
                  onClick={() => setActiveCategory('yoga')}
                  className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
                    activeCategory === 'yoga'
                      ? 'bg-white text-[#334230] shadow-2xs font-bold'
                      : 'text-[#7A7A7A] hover:text-[#334230]'
                  }`}
                >
                  Yoga
                </button>
                <button
                  type="button"
                  onClick={() => setActiveCategory('terapias')}
                  className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
                    activeCategory === 'terapias'
                      ? 'bg-white text-[#334230] shadow-2xs font-bold'
                      : 'text-[#7A7A7A] hover:text-[#334230]'
                  }`}
                >
                  Terapias
                </button>
                <button
                  type="button"
                  onClick={() => setActiveCategory('oraculo')}
                  className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
                    activeCategory === 'oraculo'
                      ? 'bg-white text-[#334230] shadow-2xs font-bold'
                      : 'text-[#7A7A7A] hover:text-[#334230]'
                  }`}
                >
                  Oráculo
                </button>
              </div>
            </div>

            {/* DESKTOP FILTER: Elegant, refined horizontal composition integrated with header */}
            <div className="hidden md:flex items-center gap-4">
              <nav 
                aria-label="Filtro de modalidades" 
                className="flex items-center p-1.5 rounded-full bg-[#F4EFEA]/85 border border-[#E5DFD5] shadow-[inset_0_1px_2px_rgba(0,0,0,0.03)] text-xs tracking-wider uppercase"
              >
                <button
                  type="button"
                  onClick={() => setActiveCategory('todos')}
                  className={`px-4 py-2 rounded-full transition-all duration-200 cursor-pointer font-medium ${
                    activeCategory === 'todos'
                      ? 'bg-white text-[#2C3B27] font-bold shadow-xs border border-[#DCD5C9]'
                      : 'text-[#6E736B] hover:text-[#2C3B27] border border-transparent'
                  }`}
                >
                  Todos ({SERVICES_DATA.length})
                </button>
                <button
                  type="button"
                  onClick={() => setActiveCategory('yoga')}
                  className={`px-4 py-2 rounded-full transition-all duration-200 cursor-pointer font-medium ${
                    activeCategory === 'yoga'
                      ? 'bg-white text-[#2C3B27] font-bold shadow-xs border border-[#DCD5C9]'
                      : 'text-[#6E736B] hover:text-[#2C3B27] border border-transparent'
                  }`}
                >
                  Yoga
                </button>
                <button
                  type="button"
                  onClick={() => setActiveCategory('terapias')}
                  className={`px-4 py-2 rounded-full transition-all duration-200 cursor-pointer font-medium ${
                    activeCategory === 'terapias'
                      ? 'bg-white text-[#2C3B27] font-bold shadow-xs border border-[#DCD5C9]'
                      : 'text-[#6E736B] hover:text-[#2C3B27] border border-transparent'
                  }`}
                >
                  Terapias
                </button>
                <button
                  type="button"
                  onClick={() => setActiveCategory('oraculo')}
                  className={`px-4 py-2 rounded-full transition-all duration-200 cursor-pointer font-medium ${
                    activeCategory === 'oraculo'
                      ? 'bg-white text-[#2C3B27] font-bold shadow-xs border border-[#DCD5C9]'
                      : 'text-[#6E736B] hover:text-[#2C3B27] border border-transparent'
                  }`}
                >
                  Oráculo
                </button>
              </nav>

              {/* Desktop Navigation Arrows */}
              <div className="flex items-center gap-2 pl-2 border-l border-[#E5DFD5]">
                <button
                  type="button"
                  onClick={() => scroll('left')}
                  aria-label="Rolar modalidades para a esquerda"
                  className="w-10 h-10 rounded-full bg-white border border-[#E5DFD5] flex items-center justify-center text-[#334230] hover:bg-[#EFF4EC] hover:border-[#8EA886] hover:text-[#5D7C56] transition-all shadow-xs hover:shadow-sm cursor-pointer active:scale-95"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() => scroll('right')}
                  aria-label="Rolar modalidades para a direita"
                  className="w-10 h-10 rounded-full bg-white border border-[#E5DFD5] flex items-center justify-center text-[#334230] hover:bg-[#EFF4EC] hover:border-[#8EA886] hover:text-[#5D7C56] transition-all shadow-xs hover:shadow-sm cursor-pointer active:scale-95"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </ScrollReveal>

        </div>
      </div>

      {/* Horizontal Scroll Area */}
      <div className="relative">
        <div
          ref={scrollContainerRef}
          className="flex gap-5 sm:gap-6 overflow-x-auto px-[calc(50vw-150px)] min-[400px]:px-[calc(50vw-165px)] sm:px-8 lg:px-12 pb-10 pt-4 custom-scrollbar snap-x snap-mandatory items-stretch overscroll-x-contain"
          style={{ scrollBehavior: 'smooth', WebkitOverflowScrolling: 'touch' }}
        >
          {filteredServices.map((service, index) => {
            const isHighlighted = hoveredCardId
              ? hoveredCardId === service.id
              : activeCardId === service.id;

            return (
              <ScrollReveal
                key={service.id}
                direction="up"
                delay={Math.min(index * 90, 450)}
                duration={750}
                className="snap-center shrink-0 flex items-stretch cursor-pointer"
              >
                <div 
                  className="w-full h-full flex items-stretch"
                  onClick={() => handleCardClick(service.id)}
                >
                  <ServiceCard 
                    service={service} 
                    isHighlighted={isHighlighted}
                    onHover={(id) => setHoveredCardId(id)}
                  />
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>

      {/* Bottom helper prompt */}
      <ScrollReveal direction="up" delay={200}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7A7A7A]">
          <span className="flex items-center gap-1.5">
            Dica: Deslize horizontalmente ou use as setas para ver todas as modalidades.
          </span>

          <a
            href={getWhatsAppLink('Olá Lorien! Gostaria de uma recomendação sobre qual prática é ideal para o meu momento.')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-[#5A5A40] font-bold uppercase tracking-wider text-[11px] hover:text-[#A3B18A] transition-colors"
          >
            Dúvida sobre qual prática escolher? Fale comigo
          </a>
        </div>
      </ScrollReveal>
    </section>
  );
};
