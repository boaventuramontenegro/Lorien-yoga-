import React from 'react';
import { Instagram, MapPin, Phone, Mail, ArrowUp, Clock } from 'lucide-react';
import { Logo } from './Logo';
import { FULL_ADDRESS, INSTAGRAM_URL, WHATSAPP_DISPLAY, getWhatsAppLink, MAPS_URL } from '../data/services';
import { ScrollReveal } from './ScrollReveal';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="footer" className="bg-[#243321] text-[#FAF7F2] pt-14 pb-8 border-t border-[#384c33]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Footer 4-Column Balanced Grid on Desktop */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10 pb-10 border-b border-white/10 items-start">
          
          {/* COLUNA 1 — MARCA (md:col-span-4) */}
          <ScrollReveal direction="up" delay={50} className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-3.5">
              <Logo size="lg" variant="white" showText={false} />
              <div className="flex flex-col justify-center">
                <span className="font-serif text-2xl sm:text-3xl font-normal text-white leading-tight">
                  Lorien Valsecchi
                </span>
                <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-[#A3BFA0] font-bold mt-0.5">
                  Terapeuta Corporal & Yoga
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#FAF7F2]/80 leading-relaxed max-w-sm font-light">
              Espaço de acolhimento, respiração e movimento consciente. 
              Práticas que unem solo e aéreo, integrando corpo, mente e coração.
            </p>

            {/* Social Channel: Instagram */}
            <div className="flex items-center gap-3 pt-1">
              <a
                id="footer-instagram-link"
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram de Lorien"
                title="Seguir Lorien Valsecchi no Instagram"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#5D7C56] text-white flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </ScrollReveal>

          {/* COLUNA 2 — NAVEGAÇÃO (md:col-span-2) */}
          <ScrollReveal direction="up" delay={120} className="md:col-span-2 space-y-3">
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#A3BFA0] block">
              Navegação
            </span>
            <ul className="space-y-2 text-xs sm:text-sm text-[#FAF7F2]/80 font-light">
              <li>
                <a href="#inicio" className="hover:text-white transition-colors">Início</a>
              </li>
              <li>
                <a href="#servicos" className="hover:text-white transition-colors">Serviços & Terapias</a>
              </li>
              <li>
                <a href="#sobre" className="hover:text-white transition-colors">Sobre Lorien</a>
              </li>
              <li>
                <a href="#depoimentos" className="hover:text-white transition-colors">Depoimentos</a>
              </li>
              <li>
                <a href="#aulas-em-grupo" className="hover:text-white transition-colors">Aulas em Grupo</a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">Perguntas Frequentes</a>
              </li>
              <li>
                <a href="#blog" className="hover:text-white transition-colors">Blog</a>
              </li>
              <li>
                <a href="#contato" className="hover:text-white transition-colors">Contato & Localização</a>
              </li>
            </ul>
          </ScrollReveal>

          {/* COLUNA 3 — CONTATO (md:col-span-3) */}
          <ScrollReveal direction="up" delay={190} className="md:col-span-3 space-y-3">
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#A3BFA0] block">
              Contato
            </span>
            
            <div className="space-y-3 text-xs sm:text-sm text-[#FAF7F2]/85 font-light">
              {/* WhatsApp / Telefone */}
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#A3BFA0] shrink-0" />
                <a 
                  href={getWhatsAppLink()} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-white underline-offset-2 hover:underline transition-colors"
                >
                  {WHATSAPP_DISPLAY}
                </a>
              </div>

              {/* E-mail */}
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#A3BFA0] shrink-0" />
                <span className="text-[#FAF7F2]/75">E-mail: a definir</span>
              </div>

              {/* Endereço */}
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#A3BFA0] shrink-0 mt-0.5" />
                <span className="leading-snug text-xs">{FULL_ADDRESS}</span>
              </div>

              {/* Horários */}
              <div className="pt-2 border-t border-white/10 space-y-1">
                <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-[#A3BFA0] font-semibold">
                  <Clock className="w-3.5 h-3.5 shrink-0" />
                  <span>Horários</span>
                </div>
                <p className="text-xs text-[#FAF7F2]/80 leading-relaxed">
                  Atendimentos individuais com hora marcada • Seg a Sex
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* COLUNA 4 — LOCALIZAÇÃO (md:col-span-3) */}
          <ScrollReveal direction="up" delay={260} className="md:col-span-3 space-y-3">
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#A3BFA0] block">
              Localização
            </span>

            <div className="space-y-2">
              {/* Mapa Google Maps Incorporado */}
              <div className="w-full h-32 lg:h-36 rounded-xl overflow-hidden border border-white/15 shadow-sm bg-[#1B2719]">
                <iframe
                  title="Localização Lorien Valsecchi - Caxias do Sul"
                  src="https://maps.google.com/maps?q=R.+Os+Dezoito+do+Forte,+1520+-+S%C3%A3o+Pelegrino,+Caxias+do+Sul+-+RS,+95020-472&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
              </div>

              {/* Link Google Maps */}
              <a
                id="footer-maps-link"
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#FAF7F2]/90 underline underline-offset-4 hover:text-[#A3BFA0] transition-colors inline-flex items-center gap-1 font-medium pt-0.5"
              >
                Ver no Google Maps ↗
              </a>
            </div>
          </ScrollReveal>

        </div>

        {/* Bottom Copyright & Back to Top */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#FAF7F2]/60 font-light">
          <p>
            © {new Date().getFullYear()} Lorien Valsecchi • Terapeuta Corporal & Instrutora de Yoga. Todos os direitos reservados.
          </p>
          
          <button
            type="button"
            id="btn-back-to-top"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 text-xs text-[#A3BFA0] hover:text-white transition-colors cursor-pointer"
          >
            <span>Voltar ao topo</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};

