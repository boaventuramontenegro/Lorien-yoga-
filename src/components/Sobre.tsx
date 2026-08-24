import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { StackedDeck, DeckCardItem } from './StackedDeck';
import { getWhatsAppLink } from '../data/services';
import { FadeInHeader, ScrollReveal, RevealText, RevealButton, RevealIcon } from './ScrollReveal';

// Fotos autênticas, nítidas e 100% verificadas para os 5 cards do deck
const LORIEN_PHOTOS: DeckCardItem[] = [
  {
    id: 'lorien-aereo-1',
    image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=1000&q=85',
    fallbackImage: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1000&q=85',
    caption: 'Yoga Aéreo',
    subcaption: 'Fluidez, suspensão e leveza',
    alt: 'Prática de Yoga Aéreo com tecido suspenso',
  },
  {
    id: 'lorien-retrato',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1000&q=85',
    fallbackImage: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1000&q=85',
    caption: 'Lorien Valsecchi',
    subcaption: 'Terapeuta Corporal e Instrutora de Yoga',
    alt: 'Lorien Valsecchi - Terapeuta Corporal',
  },
  {
    id: 'lorien-aereo-2',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1000&q=85',
    fallbackImage: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=1000&q=85',
    caption: 'Acolhimento & Presença',
    subcaption: 'Atendimento seguro, guiado e individual',
    alt: 'Postura de acolhimento e consciência corporal no estúdio',
  },
  {
    id: 'lorien-solo-1',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1000&q=85',
    fallbackImage: 'https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?auto=format&fit=crop&w=1000&q=85',
    caption: 'Práticas de Solo',
    subcaption: 'Alinhamento postural e respiração consciente',
    alt: 'Prática de Yoga solo no tapete com foco e respiração',
  },
  {
    id: 'lorien-natureza',
    image: 'https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?auto=format&fit=crop&w=1000&q=85',
    fallbackImage: 'https://images.unsplash.com/photo-1510894347713-fc3ed6fdf539?auto=format&fit=crop&w=1000&q=85',
    caption: 'Conexão & Harmonia',
    subcaption: 'Práticas integrativas e bem-estar integral',
    alt: 'Prática de Yoga ao ar livre com equilíbrio e serenidade',
  },
];

export const Sobre: React.FC = () => {
  return (
    <section 
      id="sobre" 
      className="py-16 sm:py-20 md:py-24 bg-[#F5EFE6] relative overflow-hidden scroll-mt-20 text-[#2C2B27]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabeçalho da Seção */}
        <div className="mb-12 sm:mb-16">
          <FadeInHeader
            badge="Trajetória & Filosofia"
            title="Quem é Lorien Valsecchi"
            description="Terapeuta Corporal, Instrutora de Yoga e apaixonada pela arte de reconectar pessoas aos seus corpos."
          />
        </div>

        {/* Layout de 2 Colunas com Deck de Fotos Interativo à Esquerda */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* COLUNA ESQUERDA: Deck de Cartas Interativo Deslizando da Esquerda */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <ScrollReveal
              direction="right"
              distance={95}
              duration={1300}
              delay={120}
              easing="overshoot"
              className="w-full flex justify-center"
            >
              <StackedDeck cards={LORIEN_PHOTOS} />
            </ScrollReveal>

            {/* Dica de interação sutil */}
            <ScrollReveal direction="up" distance={30} delay={450} duration={900}>
              <p className="text-[11px] uppercase tracking-[0.2em] text-[#8C887B] text-center mt-3 font-medium">
                Toque ou arraste os cards para explorar as fotos
              </p>
            </ScrollReveal>
          </div>

          {/* COLUNA DIREITA: Texto Biográfico e Pilares Deslizando da Direita */}
          <div className="lg:col-span-7 space-y-6">
            
            <RevealText delay={200} duration={1150} distance={60}>
              <div className="space-y-4 text-sm sm:text-base text-[#5E5D56] font-light leading-relaxed">
                <p>
                  Com uma caminhada dedicada ao autoconhecimento e às práticas somáticas, 
                  Lorien integra a disciplina do <strong className="font-semibold text-[#334230]">Yoga Tradicional</strong>, 
                  a liberdade e descompressão do <strong className="font-semibold text-[#334230]">Yoga Aéreo</strong> e 
                  a sutileza de terapias integrativas como o Reiki, Aromaterapia e a Radiestesia.
                </p>

                <p>
                  Seu propósito é criar um espaço verdadeiramente seguro e acolhedor onde cada praticante 
                  possa desarmar as tensões cotidianas, respeitar seus limites anatômicos e redescobrir a alegria 
                  de habitar o próprio corpo.
                </p>
              </div>
            </RevealText>

            {/* 3 Pilares com Cards Staggered Overshoot */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
              {[
                {
                  number: '01',
                  title: 'Acolhimento',
                  desc: 'Atendimento gentil que respeita a história e o ritmo do seu corpo.',
                },
                {
                  number: '02',
                  title: 'Segurança',
                  desc: 'Ajustes anatômicos conscientes e materiais de alta qualidade.',
                },
                {
                  number: '03',
                  title: 'Presença',
                  desc: 'Práticas desenhadas para cultivar foco, calma e respiração fluida.',
                },
              ].map((pillar, i) => (
                <ScrollReveal
                  key={pillar.number}
                  preset="card-up"
                  delay={360 + i * 180}
                  duration={1150}
                  distance={65}
                  scale={0.96}
                  easing="overshoot"
                >
                  <div className="p-4 rounded-2xl bg-white/80 border border-[#E5DFD5] space-y-1.5 shadow-2xs hover:border-[#CAD8C5] hover:bg-white transition-all">
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-lg font-bold text-[#5D7C56] tabular-nums">
                        {pillar.number}
                      </span>
                      <RevealIcon delay={500 + i * 180} rotate={15} scale={0.75}>
                        <CheckCircle2 className="w-4 h-4 text-[#8EA886]" />
                      </RevealIcon>
                    </div>
                    <h4 className="font-serif text-base font-semibold text-[#334230]">
                      {pillar.title}
                    </h4>
                    <p className="text-xs text-[#6E6C64] font-light leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            {/* Botão de Agendamento com Efeito Scale-Up Pop */}
            <div className="pt-3">
              <RevealButton delay={750} duration={850}>
                <a
                  id="sobre-btn-whatsapp"
                  href={getWhatsAppLink('Olá Lorien! Li sobre sua trajetória e gostaria de agendar uma prática com você.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-xs font-bold uppercase tracking-[0.16em] bg-[#5D7C56] hover:bg-[#4E6B47] text-white transition-all shadow-[0_4px_16px_rgba(50,75,45,0.25)] hover:shadow-md group cursor-pointer"
                >
                  <span>Conversar com a Lorien</span>
                  <ArrowRight className="w-4 h-4 text-white/80 transition-transform group-hover:translate-x-1" />
                </a>
              </RevealButton>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
