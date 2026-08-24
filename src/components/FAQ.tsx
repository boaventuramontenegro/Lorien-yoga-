import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { getWhatsAppLink } from '../data/services';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'faq-agendamento',
    question: 'Como funciona o agendamento?',
    answer: 'O agendamento é feito diretamente pelo WhatsApp. É só clicar no botão "Agendar pelo WhatsApp" em qualquer parte do site.',
  },
  {
    id: 'faq-experiencia',
    question: 'Preciso ter experiência prévia para começar?',
    answer: 'Não. As práticas são adaptadas para todos os níveis, de iniciantes a experientes.',
  },
  {
    id: 'faq-aereo-seguranca',
    question: 'O Yoga Aéreo é seguro para gestantes ou iniciantes?',
    answer: 'Cada prática é ajustada individualmente. Gestantes têm modalidade específica com foco em conforto e segurança.',
  },
  {
    id: 'faq-cancelamento',
    question: 'Qual a política de cancelamento ou remarcação?',
    answer: '[A definir com a Lorien]',
  },
  {
    id: 'faq-pagamento',
    question: 'Quais as formas de pagamento aceitas?',
    answer: '[A definir com a Lorien]',
  },
  {
    id: 'faq-presencial-online',
    question: 'O atendimento é presencial ou também online?',
    answer: '[A definir com a Lorien]',
  },
];

export const FAQ: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="faq"
      className="py-16 sm:py-20 md:py-24 bg-[#FAF7F2] border-t border-[#EAE4DC] relative overflow-hidden scroll-mt-20"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Cabeçalho da Seção */}
        <div className="space-y-3 mb-10 sm:mb-12">
          <div className="flex items-center gap-3">
            <span className="w-8 h-[1px] bg-[#A3BFA0]" />
            <span className="uppercase tracking-[0.3em] text-xs sm:text-sm text-[#5D7C56] font-semibold">
              DÚVIDAS FREQUENTES
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#334230] tracking-tight">
            Perguntas Frequentes
          </h2>

          <p className="text-sm sm:text-base text-[#616059] font-light leading-relaxed max-w-2xl">
            Tire suas principais dúvidas sobre horários, formato dos atendimentos e como iniciar suas práticas.
          </p>
        </div>

        {/* Acordeão de Perguntas */}
        <div className="space-y-3.5" role="region" aria-label="Lista de Perguntas Frequentes">
          {FAQ_ITEMS.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                id={item.id}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'bg-white border-[#8EA886]/70 shadow-[0_4px_20px_rgba(70,95,65,0.08)]'
                    : 'bg-white/80 hover:bg-white border-[#E5DFD5] shadow-2xs'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleItem(item.id)}
                  aria-expanded={isOpen}
                  aria-controls={`${item.id}-answer`}
                  className="w-full py-4.5 sm:py-5 px-5 sm:px-6 flex items-center justify-between gap-4 text-left cursor-pointer group"
                >
                  <span className="font-serif text-base sm:text-lg text-[#334230] group-hover:text-[#233020] transition-colors leading-snug">
                    {item.question}
                  </span>

                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen
                        ? 'bg-[#5D7C56] text-[#FDFBF7] rotate-180 shadow-xs'
                        : 'bg-[#EFF4EC] text-[#5D7C56] group-hover:bg-[#E2ECDE] group-hover:text-[#4A6444]'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div
                    id={`${item.id}-answer`}
                    className="px-5 sm:px-6 pb-5 pt-1 text-sm sm:text-base text-[#5E5D56] font-light leading-relaxed border-t border-[#F0EBE3]/80 animate-fadeIn"
                  >
                    <p className={item.answer.includes('[A definir') ? 'italic text-[#8A887E]' : ''}>
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
