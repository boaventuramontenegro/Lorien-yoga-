import React from 'react';
import { getWhatsAppLink } from '../data/services';
import { StackedDeck, DeckCardItem } from './StackedDeck';

// Fotos para o Deck de Cards Sobrepostos Interativo (StackedDeck)
// Card 0 (topo por padrão) é a foto de Lorien Valsecchi, seguido pelo espaço e salas de práticas e terapias
const STACKED_DECK_CARDS: DeckCardItem[] = [
  {
    id: 'lorien-valsecchi',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1000&q=85',
    caption: 'Lorien Valsecchi',
    subcaption: 'Terapeuta Corporal & Instrutora de Yoga',
    alt: 'Foto de Lorien Valsecchi em prática de bem-estar',
  },
  {
    id: 'espaco-yoga',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1000&q=85',
    caption: 'Espaço de Práticas',
    subcaption: 'Ambiente silencioso e acolhedor em Caxias do Sul',
    alt: 'Espaço para práticas e aulas de yoga',
  },
  {
    id: 'sala-terapias',
    image: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=1000&q=85',
    caption: 'Sala de Atendimentos',
    subcaption: 'Reiki, Cristais, Radiestesia e Aromaterapia',
    alt: 'Sala privativa para terapias integrativas',
  },
  {
    id: 'detalhes-harmonia',
    image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=1000&q=85',
    caption: 'Harmonia & Detalhes',
    subcaption: 'Ambiente preparado para desaceleração e presença',
    alt: 'Ambiente com elementos naturais e aromaterapia',
  },
];

export const Sobre: React.FC = () => {
  return (
    <section 
      id="sobre" 
      className="py-14 sm:py-18 md:py-20 bg-[#FAF7F2] text-[#2C2B27] relative overflow-hidden scroll-mt-20 border-t border-[#EAE4DC]"
    >
      {/* Subtle organic light accent in the background */}
      <div 
        aria-hidden="true"
        className="absolute top-0 right-0 w-96 h-96 bg-radial from-[#E4A8A3]/10 via-[#A3B18A]/5 to-transparent blur-3xl pointer-events-none -z-0"
      />
      <div 
        aria-hidden="true"
        className="absolute bottom-0 left-0 w-80 h-80 bg-radial from-[#A3B18A]/10 via-transparent to-transparent blur-3xl pointer-events-none -z-0"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10 sm:space-y-12">
        
        {/* 1. CABEÇALHO DA SEÇÃO */}
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-3">
            <span className="w-8 h-[1px] bg-[#A3BFA0]" />
            <span className="uppercase tracking-[0.3em] text-xs sm:text-sm text-[#5D7C56] font-semibold">
              SOBRE
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#334230] tracking-tight">
            Quem é Lorien Valsecchi
          </h2>
          <p className="text-sm sm:text-base text-[#616059] font-light leading-relaxed">
            Terapeuta corporal e instrutora dedicada ao cuidado integral, presença e equilíbrio em Caxias do Sul.
          </p>
        </div>

        {/* 2. APRESENTAÇÃO: STACKED DECK DE FOTOS & BIOGRAFIA */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Deck de Cards Sobrepostos Interativo (StackedDeck) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-start">
            <StackedDeck cards={STACKED_DECK_CARDS} />
          </div>

          {/* Biografia, Formação e Filosofia Unificadas */}
          <div className="lg:col-span-7 space-y-4 text-sm sm:text-base text-[#55544D] font-light leading-relaxed">
            <p>
              Com uma atuação pautada no cuidado integral, dedico minha trajetória a ajudar pessoas a reencontrarem harmonia, alívio de tensões e conexão profunda com o próprio corpo.
            </p>
            <p>
              Minha formação une o estudo anatômico e biomecânico do movimento com a sensibilidade de práticas milenares como Reiki, Alinhamento com Cristais, Radiestesia e Aromaterapia. Acredito que cada corpo possui sua história e seu tempo; por isso, meus atendimentos e práticas em grupo recusam métodos rígidos e priorizam o acolhimento sincero e o respeito aos limites individuais.
            </p>
            <p className="text-xs sm:text-sm text-[#6E6C64] italic font-serif">
              Um espaço de escuta atenta, regeneração e reconexão consigo mesmo no coração de Caxias do Sul.
            </p>
          </div>

        </div>

        {/* 3. OS 3 PILARES: Grid Lado a Lado Compacto */}
        <div className="pt-6 border-t border-[#EAE4DC]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            
            {/* Pilar 1 */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-serif italic text-[#5D7C56] font-bold block">
                01
              </span>
              <h3 className="text-xs sm:text-sm uppercase tracking-[0.16em] font-semibold text-[#334230]">
                Atenção Individualizada
              </h3>
              <p className="text-xs sm:text-sm text-[#6E6C64] font-light leading-relaxed">
                Práticas e ajustes adaptados ao seu ritmo, respeitando sua anatomia, histórico e objetivos pessoais.
              </p>
            </div>

            {/* Pilar 2 */}
            <div className="space-y-1.5 md:border-l border-[#E2DBD0] md:pl-6">
              <span className="text-[10px] font-serif italic text-[#5D7C56] font-bold block">
                02
              </span>
              <h3 className="text-xs sm:text-sm uppercase tracking-[0.16em] font-semibold text-[#334230]">
                Ambiente Acolhedor
              </h3>
              <p className="text-xs sm:text-sm text-[#6E6C64] font-light leading-relaxed">
                Um espaço seguro, silencioso e acolhedor para desacelerar a mente, livre de pressões ou comparações.
              </p>
            </div>

            {/* Pilar 3 */}
            <div className="space-y-1.5 md:border-l border-[#E2DBD0] md:pl-6">
              <span className="text-[10px] font-serif italic text-[#5D7C56] font-bold block">
                03
              </span>
              <h3 className="text-xs sm:text-sm uppercase tracking-[0.16em] font-semibold text-[#334230]">
                Abordagem Integrativa
              </h3>
              <p className="text-xs sm:text-sm text-[#6E6C64] font-light leading-relaxed">
                Harmonia entre consciência física, respiração, liberação energética e autoconhecimento.
              </p>
            </div>

          </div>
        </div>

        {/* 4. CTA EM PRIMEIRA PESSOA */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#EAE4DC]">
          <p className="text-xs sm:text-sm text-[#737168] font-light text-center sm:text-left">
            Deseja saber qual prática ou atendimento é ideal para o seu momento?
          </p>

          <a
            id="sobre-cta-conversar"
            href={getWhatsAppLink('Olá Lorien! Gostaria de conversar com você para conhecer mais sobre os atendimentos e práticas.')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-7 py-3.5 rounded-full text-xs uppercase tracking-[0.18em] font-bold bg-[#5D7C56] hover:bg-[#4E6B47] text-white transition-all shadow-[0_4px_16px_rgba(50,75,45,0.25)] hover:shadow-md active:scale-98 cursor-pointer shrink-0 w-full sm:w-auto"
          >
            Conversar com a Lorien
          </a>
        </div>

      </div>
    </section>
  );
};
