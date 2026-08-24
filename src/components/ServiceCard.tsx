import React, { useState } from 'react';
import { 
  Users, 
  Baby, 
  HandHeart, 
  Compass, 
  Droplets, 
  Gem, 
  Sparkles,
  Check, 
  ChevronDown, 
  ChevronUp, 
  Tag 
} from 'lucide-react';
import { ServiceItem } from '../types';
import { getWhatsAppLink } from '../data/services';

// Ícones vetorizados com precisão anatômica e simbólica
const LotusIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-label="Yoga Tradicional / Postura de Lótus">
    {/* Cabeça meditativa */}
    <circle cx="12" cy="4.5" r="2" />
    {/* Coluna / Alinhamento vertical central */}
    <path d="M12 7v6.5" />
    {/* Braços com mãos apoiadas nos joelhos em Chin Mudra */}
    <path d="M12 8.5L7.5 12l2 2.5" />
    <path d="M12 8.5L16.5 12l-2 2.5" />
    {/* Pernas cruzadas na base de Padmasana (Postura de Lótus) */}
    <path d="M5 19.5c1.5-2.8 4.2-3.5 7-3.5s5.5 0.7 7 3.5" />
    <path d="M3.5 20.5c2.5-1.2 5.5-1.5 8.5-1.5s6 0.3 8.5 1.5" />
  </svg>
);

const AerialSilkIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-label="Yoga Aéreo / Tecido Suspenso">
    {/* Pontos de ancoragem e mosquetões no teto */}
    <path d="M6 3h12" />
    <path d="M8 3v2.5" />
    <path d="M16 3v2.5" />
    {/* Tecido de suspensão formando a alça em U do Yoga Aéreo */}
    <path d="M8 5.5c0 6.5 1.8 14.5 4 14.5s4-8 4-14.5" />
    {/* Nó e dobras do tecido elástico */}
    <path d="M9 11.5c1.5 1.8 4.5 1.8 6 0" />
    <path d="M10 15c1 1.2 3 1.2 4 0" />
    {/* Argola / faixa superior */}
    <path d="M8 5.5h8" />
  </svg>
);

const ColorWheelIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-label="Cromoterapia / Espectro de Cores">
    {/* Círculo do espectro cromático */}
    <circle cx="12" cy="12" r="9" />
    {/* Centro focal de luz pura */}
    <circle cx="12" cy="12" r="2.8" />
    {/* Segmentos radiais de frequência cromática */}
    <line x1="12" y1="3" x2="12" y2="9.2" />
    <line x1="12" y1="14.8" x2="12" y2="21" />
    <line x1="3" y1="12" x2="9.2" y2="12" />
    <line x1="14.8" y1="12" x2="21" y2="12" />
    <line x1="5.64" y1="5.64" x2="10.02" y2="10.02" />
    <line x1="13.98" y1="13.98" x2="18.36" y2="18.36" />
    <line x1="5.64" y1="18.36" x2="10.02" y2="13.98" />
    <line x1="13.98" y1="10.02" x2="18.36" y2="5.64" />
  </svg>
);

const TarotCardIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-label="Baralho Cigano / Carta Oracular Mística">
    {/* Lâmina vertical da carta */}
    <rect x="5" y="2.5" width="14" height="19" rx="2.5" />
    {/* Moldura mística interna */}
    <rect x="7" y="4.5" width="10" height="15" rx="1.5" strokeDasharray="1.5 1.5" />
    {/* Olho da intuição e clarividência oracular */}
    <path d="M8.5 12c1.4-1.8 5.6-1.8 7 0" />
    <path d="M8.5 12c1.4 1.8 5.6 1.8 7 0" />
    <circle cx="12" cy="12" r="1.2" fill="currentColor" />
    {/* Detalhes astrais/estrelas místicas */}
    <path d="M12 7.5v1.2 M11.4 8.1h1.2" />
    <path d="M12 15.2v1.2 M11.4 15.8h1.2" />
  </svg>
);

const YogaKidsIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-label="Yoga Kids / Criança em Movimento e Yoga">
    {/* Cabeça da criança */}
    <circle cx="11" cy="4.5" r="2" />
    {/* Tronco */}
    <path d="M11 6.8v6" />
    {/* Braços abertos em postura alegre */}
    <path d="M11 8.8L6.5 5.5" />
    <path d="M11 8.8L15.5 5.5" />
    {/* Pernas em postura de equilíbrio e yoga */}
    <path d="M11 12.8v7.2" />
    <path d="M11 15.2l-3.8 2.2 3.8 1.4" />
    {/* Estrela lúdica no topo */}
    <path d="M19 4l.5 1.2 1.3.3-1.1.9.4 1.3-1.1-.7-1.1.7.4-1.3-1.1-.9 1.3-.3z" fill="currentColor" />
  </svg>
);

interface ServiceCardProps {
  service: ServiceItem;
  isHighlighted?: boolean;
  onHover?: (id: string | null) => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ 
  service, 
  isHighlighted = false,
  onHover 
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showPricing, setShowPricing] = useState(false);

  const getIcon = (iconName: string, active: boolean) => {
    const iconClass = `w-6 h-6 transition-colors duration-300 ${
      active ? 'text-white' : 'text-[#5D7C56] group-hover:text-white'
    }`;
    switch (iconName) {
      case 'Lotus': return <LotusIcon className={iconClass} />;
      case 'AerialSilk': return <AerialSilkIcon className={iconClass} />;
      case 'Users': return <Users className={iconClass} />;
      case 'Baby': return <Baby className={iconClass} />;
      case 'YogaKids': return <YogaKidsIcon className={iconClass} />;
      case 'HandHeart': return <HandHeart className={iconClass} />;
      case 'Compass': return <Compass className={iconClass} />;
      case 'Droplets': return <Droplets className={iconClass} />;
      case 'Gem': return <Gem className={iconClass} />;
      case 'ColorWheel': return <ColorWheelIcon className={iconClass} />;
      case 'TarotCard': return <TarotCardIcon className={iconClass} />;
      default: return <Sparkles className={iconClass} />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'yoga':
        return 'bg-[#EFF4EC] text-[#5D7C56] border-[#D8E6D3]';
      case 'terapias':
        return 'bg-[#EFF4EC] text-[#5D7C56] border-[#D8E6D3]';
      case 'oraculo':
        return 'bg-[#EFF4EC] text-[#5D7C56] border-[#D8E6D3]';
      default:
        return 'bg-[#EFF4EC] text-[#5D7C56] border-[#D8E6D3]';
    }
  };

  return (
    <div
      id={`card-${service.id}`}
      data-service-card={service.id}
      onMouseEnter={() => onHover?.(service.id)}
      onMouseLeave={() => onHover?.(null)}
      className={`w-[300px] min-[400px]:w-[330px] sm:w-[350px] min-h-[460px] shrink-0 rounded-[28px] bg-white border transition-all duration-300 ease-out flex flex-col justify-between p-6 sm:p-7 relative group ${
        isHighlighted
          ? 'border-[#8EA886] shadow-xl ring-2 ring-[#8EA886]/40 -translate-y-2.5 scale-[1.02] z-10'
          : 'border-[#E5E1D8] hover:border-[#8EA886] hover:shadow-xl hover:ring-2 hover:ring-[#8EA886]/40 hover:-translate-y-2.5 hover:scale-[1.02] shadow-2xs'
      }`}
    >
      <div className="flex flex-col flex-1">
        {/* Header Icon + Badge */}
        <div className="flex items-center justify-between gap-2 mb-4">
          {service.customIconUrl ? (
            <div className="h-16 w-16 flex items-center justify-start shrink-0">
              <img
                src={service.customIconUrl}
                alt={service.name}
                className={`w-full h-full object-contain transition-transform duration-300 group-hover:scale-105 ${
                  service.id === 'cromoterapia' ? '' : 'brightness-0'
                }`}
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
              />
            </div>
          ) : (
            <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center shrink-0 overflow-hidden transition-all duration-300 ${
              isHighlighted
                ? 'bg-[#5D7C56] text-white border-[#5D7C56] scale-110 shadow-xs'
                : 'bg-[#EFF4EC] border-[#DCE4D6] group-hover:bg-[#5D7C56] group-hover:text-white group-hover:scale-110'
            }`}>
              {getIcon(service.icon, isHighlighted)}
            </div>
          )}
          {service.badge && (
            <span
              className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border transition-colors ${getCategoryColor(
                service.category
              )}`}
            >
              {service.badge}
            </span>
          )}
        </div>

        {/* Title with standardized height */}
        <h3 className="font-serif text-2xl font-bold text-[#334230] mb-2 leading-snug min-h-[58px] flex items-center">
          {service.name}
        </h3>

        {/* Short Description with fixed readable block */}
        <p className="text-xs sm:text-sm text-[#4A4A4A] leading-relaxed mb-4 min-h-[56px] opacity-85">
          {service.shortDescription}
        </p>

        {/* Middle Content Area: Pricing Toggle (if exists) or Key Features list */}
        {service.pricing && service.pricing.length > 0 ? (
          <div className="my-2 space-y-2">
            <button
              type="button"
              onClick={() => setShowPricing(!showPricing)}
              aria-expanded={showPricing}
              className="w-full p-3 rounded-2xl bg-[#F7F3EE] hover:bg-[#EFF4EC] border border-[#E5E1D8] flex items-center justify-between transition-colors cursor-pointer text-left"
            >
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#334230]">
                <Tag className="w-3.5 h-3.5 text-[#5D7C56]" />
                <span>Tabela de Valores</span>
              </div>
              <div className="flex items-center gap-1 text-[11px] font-semibold text-[#7A7A7A]">
                <span>{showPricing ? 'Fechar' : 'Ver valores'}</span>
                {showPricing ? <ChevronUp className="w-3.5 h-3.5 text-[#5D7C56]" /> : <ChevronDown className="w-3.5 h-3.5 text-[#5D7C56]" />}
              </div>
            </button>

            {showPricing && (
              <div className="p-3.5 rounded-2xl bg-[#F7F3EE] border border-[#E5E1D8] space-y-2 animate-in fade-in duration-200">
                <div className="divide-y divide-[#E5E1D8] text-xs">
                  {service.pricing.map((tier, idx) => (
                    <div key={idx} className="py-2 flex items-center justify-between gap-2 first:pt-0.5 last:pb-0">
                      <div className="flex flex-col pr-2">
                        <span className="font-medium text-[#4A4A4A]">{tier.label}</span>
                        {tier.detail && (
                          <span className="text-[10px] text-[#7A7A7A] mt-0.5">{tier.detail}</span>
                        )}
                      </div>
                      <span className="font-sans font-bold tabular-nums text-sm text-[#4D6946] shrink-0">
                        {tier.price}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="my-2 py-1 flex flex-wrap gap-1.5 min-h-[38px] items-center">
            {service.benefits?.slice(0, 2).map((benefit, bIdx) => (
              <span 
                key={bIdx} 
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#EFF4EC] border border-[#DCE4D6] text-[10px] font-medium text-[#334230]"
              >
                <Check className="w-3 h-3 text-[#5D7C56]" />
                {benefit}
              </span>
            ))}
          </div>
        )}

        {/* Toggleable Details & Benefits */}
        {showDetails && (
          <div className="pt-3 pb-2 space-y-3 border-t border-[#F0EEE9] text-xs text-[#4A4A4A] mt-2 animate-in fade-in duration-200">
            <p className="leading-relaxed opacity-85">{service.description}</p>
            {service.benefits && (
              <div className="space-y-1.5 pt-1">
                <span className="font-bold text-[11px] uppercase tracking-wider text-[#334230] block">Benefícios principais:</span>
                {service.benefits.map((benefit, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#5D7C56] shrink-0" />
                    <span className="opacity-90">{benefit}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer Actions (always pinned at bottom) */}
      <div className="pt-4 border-t border-[#F0EEE9] mt-4 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setShowDetails(!showDetails)}
          className="text-xs font-semibold text-[#7A7A7A] hover:text-[#334230] inline-flex items-center gap-1 transition-colors cursor-pointer"
        >
          {showDetails ? (
            <>Menos detalhes <ChevronUp className="w-3.5 h-3.5" /></>
          ) : (
            <>Saber mais <ChevronDown className="w-3.5 h-3.5" /></>
          )}
        </button>

        <a
          id={`btn-agendar-${service.id}`}
          href={getWhatsAppLink(`Olá Lorien! Gostaria de agendar ou tirar dúvidas sobre: ${service.name}.`)}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center justify-center px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all duration-200 ${
            isHighlighted
              ? 'bg-[#5D7C56] text-white hover:bg-[#4E6B47] shadow-xs'
              : 'bg-[#FAF8F5] hover:bg-[#5D7C56] text-[#334230] hover:text-white border border-[#E5E1D8] hover:border-transparent'
          }`}
        >
          Agendar
        </a>
      </div>
    </div>
  );
};
