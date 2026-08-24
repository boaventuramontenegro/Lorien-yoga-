import React from 'react';
import { ArrowRight } from 'lucide-react';
import { getWhatsAppLink } from '../data/services';
import { ScrollReveal, FadeInHeader } from './ScrollReveal';

export const AulasEmGrupo: React.FC = () => {
  return (
    <section
      id="aulas-em-grupo"
      className="py-16 sm:py-20 md:py-24 bg-[#FAF7F2] border-t border-[#EAE4DC] relative overflow-hidden scroll-mt-20 text-[#2C2B27]"
    >
      <div id="aulas" className="scroll-mt-24" />

      <div className="max-w-5xl mx-auto px-5 sm:px-8 lg:px-12 space-y-8 sm:space-y-10">
        
        {/* 1. CABEÇALHO DA SEÇÃO */}
        <FadeInHeader
          badge="Prática Coletiva & Conexão"
          title="Aulas em Grupo"
          description="Práticas pensadas para desenvolver presença, mobilidade, força e bem-estar em diferentes ritmos."
        >
          <div className="pt-1 flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] font-medium text-[#8A887E]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#5D7C56]" />
            <span>LE PARC ARBOS · CAXIAS DO SUL</span>
            <span className="text-[#C4BDB2]">•</span>
            <span className="text-[#5D7C56] font-serif italic normal-case tracking-normal text-xs">Práticas ao ar livre</span>
          </div>
        </FadeInHeader>

        {/* 2. PROGRAMAÇÃO EM CARDS ÚNICOS E COMPLETOS (STAGGER) */}
        <div className="space-y-4 sm:space-y-5">
          
          {/* CARD 1: QUINTA-FEIRA */}
          <ScrollReveal direction="up" delay={80} duration={800}>
            <div className="relative rounded-2xl bg-white/90 border border-[#E5E0D8] p-6 sm:p-7 shadow-2xs hover:border-[#CAD8C5] transition-all">
              {/* Top metadata strip (Mobile / Tablet / Desktop) */}
              <div className="flex items-center justify-between pb-4 border-b border-[#F0EBE3] text-[11px] uppercase tracking-[0.2em]">
                <span className="font-semibold text-[#5D7C56] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#5D7C56]" />
                  Turma Noturna
                </span>
                <span className="text-[#8A887E] font-medium">Semanal</span>
              </div>

              {/* Main Content: 3-area horizontal layout on desktop, stacked on mobile */}
              <div className="pt-5 grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6 items-center">
                
                {/* ÁREA 1: Dia + Horário */}
                <div className="md:col-span-3 space-y-1">
                  <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#334230] block">
                    Quinta-feira
                  </span>
                  <span className="font-serif text-3xl sm:text-4xl font-light text-[#4D6946] tabular-nums block leading-tight">
                    19:00
                  </span>
                </div>

                {/* ÁREA 2: Nome da prática + características + níveis */}
                <div className="md:col-span-6 space-y-2 md:border-l border-[#F0EBE3] md:pl-6">
                  <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#334230]">
                    Yoga / Movimento consciente
                  </h3>
                  <div className="space-y-1">
                    <p className="text-xs sm:text-sm text-[#6E6C64] font-light leading-relaxed">
                      Alongamento profundo <span className="text-[#C4BDB2]">•</span> Respiração <span className="text-[#C4BDB2]">•</span> Relaxamento
                    </p>
                    <p className="text-[11px] uppercase tracking-wider text-[#8A887E] font-medium">
                      Todos os níveis (iniciantes aos experientes)
                    </p>
                  </div>
                </div>

                {/* ÁREA 3: Reserva Direta */}
                <div className="md:col-span-3 flex justify-start md:justify-end pt-2 md:pt-0">
                  <a
                    id="btn-reserva-quinta"
                    href={getWhatsAppLink('Olá Lorien! Gostaria de reservar minha vaga na aula de Yoga em Grupo de Quinta-feira às 19h no Le Parc Arbos.')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 rounded-full text-xs font-bold uppercase tracking-[0.16em] bg-[#5D7C56] hover:bg-[#4E6B47] text-white transition-all shadow-[0_4px_16px_rgba(50,75,45,0.25)] hover:shadow-md group cursor-pointer"
                  >
                    <span>Reservar</span>
                    <ArrowRight className="w-3.5 h-3.5 text-white/80 transition-transform group-hover:translate-x-0.5" />
                  </a>
                </div>

              </div>
            </div>
          </ScrollReveal>

          {/* CARD 2: SÁBADOS */}
          <ScrollReveal direction="up" delay={200} duration={800}>
            <div className="relative rounded-2xl bg-white/90 border border-[#E5E0D8] p-6 sm:p-7 shadow-2xs hover:border-[#CAD8C5] transition-all">
              {/* Top metadata strip */}
              <div className="flex items-center justify-between pb-4 border-b border-[#F0EBE3] text-[11px] uppercase tracking-[0.2em]">
                <span className="font-semibold text-[#5D7C56] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8EA886]" />
                  Turma Matinal
                </span>
                <span className="text-[#8A887E] font-medium">Semanal</span>
              </div>

              {/* Main Content: 3-area horizontal layout on desktop, stacked on mobile */}
              <div className="pt-5 grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6 items-center">
                
                {/* ÁREA 1: Dia + Horário */}
                <div className="md:col-span-3 space-y-1">
                  <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#334230] block">
                    Sábados
                  </span>
                  <span className="font-serif text-3xl sm:text-4xl font-light text-[#4D6946] tabular-nums block leading-tight">
                    09:30
                  </span>
                </div>

                {/* ÁREA 2: Nome da prática + características + níveis */}
                <div className="md:col-span-6 space-y-2 md:border-l border-[#F0EBE3] md:pl-6">
                  <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#334230]">
                    Yoga ao ar livre
                  </h3>
                  <div className="space-y-1">
                    <p className="text-xs sm:text-sm text-[#6E6C64] font-light leading-relaxed">
                      Energização corporal <span className="text-[#C4BDB2]">•</span> Presença <span className="text-[#C4BDB2]">•</span> Contato com a natureza
                    </p>
                    <p className="text-[11px] uppercase tracking-wider text-[#8A887E] font-medium">
                      Todos os níveis (iniciantes aos experientes)
                    </p>
                  </div>
                </div>

                {/* ÁREA 3: Reserva Direta */}
                <div className="md:col-span-3 flex justify-start md:justify-end pt-2 md:pt-0">
                  <a
                    id="btn-reserva-sabado"
                    href={getWhatsAppLink('Olá Lorien! Gostaria de reservar minha vaga na aula de Yoga em Grupo de Sábado às 9h30 no Le Parc Arbos.')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 rounded-full text-xs font-bold uppercase tracking-[0.16em] bg-[#5D7C56] hover:bg-[#4E6B47] text-white transition-all shadow-[0_4px_16px_rgba(50,75,45,0.25)] hover:shadow-md group cursor-pointer"
                  >
                    <span>Reservar</span>
                    <ArrowRight className="w-3.5 h-3.5 text-white/80 transition-transform group-hover:translate-x-0.5" />
                  </a>
                </div>

              </div>
            </div>
          </ScrollReveal>

        </div>

        {/* 3. INFORMAÇÕES DE LOCALIZAÇÃO & VAGAS LIMITADAS */}
        <ScrollReveal direction="up" delay={260}>
          <div className="rounded-2xl bg-[#F4EFEA]/80 border border-[#E5E0D8] p-5 sm:p-6 text-center sm:text-left space-y-1">
            <h4 className="text-xs sm:text-sm uppercase tracking-[0.16em] font-semibold text-[#383A2A]">
              Vagas limitadas para máximo acolhimento
            </h4>
            <p className="text-xs sm:text-sm text-[#737168] font-light">
              As práticas em grupo no Le Parc Arbos são abertas tanto para alunos da academia quanto para o público externo. Traga seu tapetinho (mat).
            </p>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};

