import React, { useState, useEffect, useCallback } from 'react';
import { Star, Check, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TESTIMONIALS_DATA } from '../data/testimonials';
import { ScrollReveal, FadeInHeader } from './ScrollReveal';

export const Depoimentos: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right'>('right');

  const total = TESTIMONIALS_DATA.length;

  const handlePrev = useCallback(() => {
    setDirection('left');
    setCurrentIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  }, [total]);

  const handleNext = useCallback(() => {
    setDirection('right');
    setCurrentIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
  }, [total]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePrev, handleNext]);

  const currentItem = TESTIMONIALS_DATA[currentIndex];

  const variants = {
    enter: (dir: 'left' | 'right') => ({
      opacity: 0,
      x: dir === 'right' ? 24 : -24,
      scale: 0.98,
    }),
    center: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.28,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
    exit: (dir: 'left' | 'right') => ({
      opacity: 0,
      x: dir === 'right' ? -24 : 24,
      scale: 0.98,
      transition: {
        duration: 0.2,
        ease: [0.25, 0.1, 0.25, 1],
      },
    }),
  };

  return (
    <section 
      id="depoimentos" 
      className="py-16 sm:py-20 md:py-24 bg-[#F7F4EE] border-t border-[#E5E1D8] relative overflow-hidden scroll-mt-20 select-none"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <FadeInHeader
            badge="DEPOIMENTOS"
            title="O que dizem os alunos & clientes"
            description="Avaliações de quem já vivenciou as práticas de Yoga e atendimentos terapêuticos integrativos com Lorien."
            align="center"
          >
            {/* Google 5.0 Rating Badge */}
            <div className="pt-2 flex justify-center">
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white border border-[#D5DFD1] shadow-2xs">
                <div className="flex items-center gap-0.5 text-[#C29B38]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#C29B38] text-[#C29B38]" />
                  ))}
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#334230]">
                  5.0 ★ no Google Maps
                </span>
              </div>
            </div>
          </FadeInHeader>
        </div>

        {/* Exclusive Navigation Row: [ Left Arrow ] — [ CENTERED SINGLE CARD ] — [ Right Arrow ] */}
        <ScrollReveal direction="up" delay={180} duration={850}>
          <div className="flex items-center justify-center gap-3 sm:gap-6 md:gap-8 max-w-4xl mx-auto">
            
            {/* Left Arrow Button */}
            <button
              type="button"
              id="btn-depoimento-anterior"
              onClick={handlePrev}
              aria-label="Depoimento anterior (◄)"
              className="w-11 h-11 sm:w-13 sm:h-13 md:w-14 md:h-14 rounded-full bg-white border border-[#D5DFD1] text-[#334230] hover:text-[#5D7C56] hover:bg-[#EFF4EC] hover:border-[#8EA886] shadow-[0_4px_16px_rgba(40,60,35,0.08)] hover:shadow-[0_6px_20px_rgba(40,60,35,0.15)] active:scale-92 transition-all flex items-center justify-center shrink-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#8EA886]"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Centralized Card Container — strictly 1 card visible, zero side overlap */}
            <div className="w-full max-w-xl md:max-w-2xl min-h-[250px] sm:min-h-[260px] md:min-h-[240px] flex items-center justify-center">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentItem.id}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="w-full rounded-[26px] sm:rounded-[30px] bg-white border border-[#DCE4D6] p-7 sm:p-9 md:p-10 shadow-[0_10px_30px_rgba(40,60,35,0.07)] relative flex flex-col justify-between"
                >
                  <div className="space-y-4 relative z-10">
                    {/* Rating Stars */}
                    <div className="flex items-center gap-1 text-[#C29B38]">
                      {[...Array(currentItem.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#C29B38] text-[#C29B38]" />
                      ))}
                    </div>

                    {/* Depoimento Text */}
                    <blockquote className="text-base sm:text-lg md:text-xl text-[#3A3830] font-serif italic leading-relaxed pt-1">
                      "{currentItem.text}"
                    </blockquote>
                  </div>

                  {/* Author Metadata with verified check badge beside name */}
                  <div className="pt-6 mt-4 border-t border-[#F0EEE9] flex items-center justify-between relative z-10">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-base sm:text-lg text-[#334230] block">
                          {currentItem.name}
                        </span>
                        {/* Selo de Verificado limpo e discreto ao lado do nome */}
                        <span 
                          className="w-4 h-4 rounded-full bg-[#5D7C56] text-white inline-flex items-center justify-center shrink-0 shadow-2xs"
                          title="Avaliação Verificada"
                          aria-label="Avaliação Verificada"
                        >
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </span>
                      </div>
                      <span className="text-xs text-[#7A786F] block font-light mt-0.5">
                        Aluna & Praticante
                      </span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right Arrow Button */}
            <button
              type="button"
              id="btn-depoimento-proximo"
              onClick={handleNext}
              aria-label="Próximo depoimento (►)"
              className="w-11 h-11 sm:w-13 sm:h-13 md:w-14 md:h-14 rounded-full bg-white border border-[#D5DFD1] text-[#334230] hover:text-[#5D7C56] hover:bg-[#EFF4EC] hover:border-[#8EA886] shadow-[0_4px_16px_rgba(40,60,35,0.08)] hover:shadow-[0_6px_20px_rgba(40,60,35,0.15)] active:scale-92 transition-all flex items-center justify-center shrink-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#8EA886]"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>
        </ScrollReveal>

        {/* Interactive Dots Pagination */}
        <ScrollReveal direction="none" delay={260}>
          <div className="mt-8 flex flex-col items-center gap-3 text-center">
            <div className="flex items-center gap-2">
              {TESTIMONIALS_DATA.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setDirection(idx > currentIndex ? 'right' : 'left');
                    setCurrentIndex(idx);
                  }}
                  aria-label={`Ir para depoimento ${idx + 1}`}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    idx === currentIndex
                      ? 'w-7 h-2 bg-[#5D7C56]'
                      : 'w-2 h-2 bg-[#D0C8BC] hover:bg-[#A3BFA0]'
                  }`}
                />
              ))}
            </div>

            <p className="text-xs text-[#8A887E] font-light">
              Navegue com as setas laterais (◄ ►) ou pelo teclado
            </p>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};
