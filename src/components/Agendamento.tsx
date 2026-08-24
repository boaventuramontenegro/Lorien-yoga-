import React, { useState, useEffect, useRef } from 'react';
import { User, Sparkles, Send, Check, HeartHandshake, CheckCircle2, ChevronDown } from 'lucide-react';
import { WHATSAPP_PHONE } from '../data/services';

const SERVICE_OPTIONS = [
  { id: 'yoga-aereo', label: 'Yoga Aéreo' },
  { id: 'yoga-tradicional', label: 'Yoga Tradicional (Solo)' },
  { id: 'yoga-gestantes', label: 'Yoga para Gestantes' },
  { id: 'acroyoga', label: 'Acroyoga' },
  { id: 'yoga-kids', label: 'Yoga Kids' },
  { id: 'aulas-le-parc', label: 'Aulas em Grupo (Le Parc Arbos)' },
  { id: 'reiki', label: 'Reiki & Harmonização' },
  { id: 'radiestesia', label: 'Radiestesia Terapêutica' },
  { id: 'baralho-cigano', label: 'Baralho Cigano' },
  { id: 'aromaterapia-cristais', label: 'Aromaterapia & Cristais' },
  { id: 'cromoterapia', label: 'Cromoterapia' },
  { id: 'outro', label: 'Outro / Conversar com a Lorien' },
];

export const Agendamento: React.FC = () => {
  const [nome, setNome] = useState('');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [observacoes, setObservacoes] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [validationError, setValidationError] = useState('');

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Toggle selection of a service immediately
  const toggleService = (label: string) => {
    setSelectedServices((prev) => {
      const updated = prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label];
      return updated;
    });
    if (validationError) setValidationError('');
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!nome.trim()) {
      setValidationError('Por favor, informe seu nome.');
      return;
    }

    if (selectedServices.length === 0) {
      setValidationError('Por favor, selecione ao menos um serviço desejado.');
      return;
    }

    setValidationError('');
    setIsSubmitted(true);

    // Build the formatted WhatsApp message
    let message = `Olá Lorien! Gostaria de solicitar um agendamento:\n\n`;
    message += `👤 *Nome:* ${nome.trim()}\n`;
    message += `🌿 *Serviço(s) desejado(s):* ${selectedServices.join(', ')}\n`;
    if (observacoes.trim()) {
      message += `📝 *Observações / Detalhes:* ${observacoes.trim()}\n`;
    }

    const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
    
    // Open WhatsApp in new tab / app
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section
      id="contato"
      className="py-16 sm:py-20 md:py-28 bg-[#FAF7F2] relative overflow-hidden border-t border-[#EAE4DC] scroll-mt-20"
    >
      {/* Anchor aliases for backward compatibility with existing links */}
      <div id="localizacao" className="scroll-mt-24" />
      <div id="agendamento" className="scroll-mt-24" />

      {/* Ambient background decoration */}
      <div 
        aria-hidden="true" 
        className="absolute top-0 right-0 w-96 h-96 bg-[#7D8B68]/10 rounded-full blur-3xl pointer-events-none -z-0" 
      />
      <div 
        aria-hidden="true" 
        className="absolute bottom-0 left-0 w-96 h-96 bg-[#A3B18A]/10 rounded-full blur-3xl pointer-events-none -z-0" 
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="space-y-3 mb-10 sm:mb-12 text-center max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-3">
            <span className="w-8 h-[1px] bg-[#A3BFA0]" />
            <span className="uppercase tracking-[0.3em] text-xs sm:text-sm text-[#5D7C56] font-semibold">
              AGENDAMENTO & CONTATO
            </span>
            <span className="w-8 h-[1px] bg-[#A3BFA0]" />
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#334230] tracking-tight">
            Solicite seu Agendamento
          </h2>

          <p className="text-sm sm:text-base text-[#616059] font-light leading-relaxed">
            Preencha os campos abaixo com suas preferências. Você será direcionado para confirmar os horários diretamente no WhatsApp com a Lorien.
          </p>
        </div>

        {/* Form Container Card */}
        <div className="rounded-[28px] sm:rounded-[36px] bg-white border border-[#E5DFD5] p-6 sm:p-10 md:p-12 shadow-[0_8px_32px_rgba(25,35,20,0.06)] relative">
          
          {isSubmitted ? (
            <div className="text-center py-8 sm:py-12 space-y-6 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-[#EFF4EC] border border-[#CAD8C5] text-[#5D7C56] flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-8 h-8 text-[#5D7C56]" />
              </div>

              <div className="space-y-2 max-w-md mx-auto">
                <h3 className="font-serif text-2xl sm:text-3xl text-[#334230] font-medium">
                  Solicitação Pronta!
                </h3>
                <p className="text-sm text-[#616059] font-light leading-relaxed">
                  Sua mensagem foi gerada e direcionada para o WhatsApp da Lorien. Caso a janela não tenha aberto automaticamente, clique no botão abaixo:
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-full text-xs uppercase tracking-widest font-bold bg-[#5D7C56] hover:bg-[#4E6B47] text-white shadow-[0_4px_16px_rgba(50,75,45,0.25)] hover:shadow-md transition-all cursor-pointer"
                >
                  <span>Abrir Conversa no WhatsApp</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="w-full sm:w-auto inline-flex items-center justify-center py-3.5 px-6 rounded-full text-xs font-semibold uppercase tracking-wider text-[#7A786F] hover:text-[#334230] hover:bg-[#F7F3EE] transition-colors cursor-pointer"
                >
                  Editar Formulário
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-7" noValidate>
              
              {/* 1. Nome */}
              <div className="space-y-2.5">
                <label 
                  htmlFor="input-nome-agendamento" 
                  className="flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#334230]"
                >
                  <User className="w-4 h-4 text-[#5D7C56]" />
                  <span>Nome completo <span className="text-[#B95D50]">*</span></span>
                </label>
                <input
                  id="input-nome-agendamento"
                  type="text"
                  required
                  value={nome}
                  onChange={(e) => {
                    setNome(e.target.value);
                    if (validationError) setValidationError('');
                  }}
                  placeholder="Como prefere ser chamado(a)?"
                  className="w-full px-4 sm:px-5 py-3.5 sm:py-4 rounded-2xl bg-[#FAF7F2] border border-[#E5DFD5] text-[#334230] placeholder-[#A09D94] text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#8EA886] focus:border-transparent transition-all"
                />
              </div>

              {/* 2. Serviços Desejados: Dropdown expansível no fluxo (empurra conteúdo) */}
              <div className="space-y-2.5" ref={dropdownRef}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <label 
                    htmlFor="input-servicos-agendamento" 
                    className="flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#334230]"
                  >
                    <Sparkles className="w-4 h-4 text-[#5D7C56]" />
                    <span>Serviços desejados <span className="text-[#B95D50]">*</span></span>
                  </label>
                  <span className="text-[11px] text-[#8C887B] font-light">
                    {isOpen ? 'Clique nas opções para selecionar ou desmarcar' : 'Clique para abrir e selecionar'}
                  </span>
                </div>

                {/* Input Trigger */}
                <div 
                  onClick={() => setIsOpen((prev) => !prev)}
                  className="relative group cursor-pointer"
                >
                  <input
                    id="input-servicos-agendamento"
                    type="text"
                    readOnly
                    value={selectedServices.join(', ')}
                    placeholder="Clique para selecionar"
                    className="w-full pl-4 sm:pl-5 pr-11 py-3.5 sm:py-4 rounded-2xl bg-[#FAF7F2] border border-[#E5DFD5] text-[#334230] placeholder-[#A09D94] text-sm sm:text-base cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#8EA886] transition-all group-hover:border-[#8EA886] group-hover:bg-[#FAF5EE]"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 w-7 h-7 rounded-xl bg-white border border-[#E0D8CC] flex items-center justify-center text-[#5D7C56] group-hover:bg-[#5D7C56] group-hover:text-white group-hover:border-[#5D7C56] transition-all">
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                  </div>
                </div>

                {/* Lista Expansível (no fluxo da página, empurrando o conteúdo abaixo) */}
                {isOpen && (
                  <div className="pt-2">
                    <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF7F2] border border-[#E5DFD5] shadow-inner space-y-3 animate-fadeIn">
                      <div className="flex items-center justify-between pb-2 border-b border-[#EAE4DC]">
                        <span className="text-xs font-semibold uppercase tracking-wider text-[#5D7C56]">
                          Selecione um ou mais serviços
                        </span>
                        <span className="text-[11px] text-[#7A786F]">
                          {selectedServices.length} selecionado(s)
                        </span>
                      </div>

                      <div 
                        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2"
                        role="group"
                        aria-label="Opções de Serviços"
                      >
                        {SERVICE_OPTIONS.map((service) => {
                          const isSelected = selectedServices.includes(service.label);
                          return (
                            <button
                              key={service.id}
                              type="button"
                              onClick={() => toggleService(service.label)}
                              className={`flex items-center justify-between gap-2 p-3 rounded-xl text-left text-xs sm:text-sm font-medium transition-all duration-150 cursor-pointer border ${
                                isSelected
                                  ? 'bg-[#5D7C56] border-[#5D7C56] text-white shadow-xs'
                                  : 'bg-white border-[#E2DDD3] text-[#55534B] hover:border-[#8EA886] hover:bg-[#EFF4EC]'
                              }`}
                            >
                              <span className="leading-snug">{service.label}</span>
                              <div
                                className={`w-4 h-4 rounded-md flex items-center justify-center shrink-0 border transition-all ${
                                  isSelected
                                    ? 'bg-white border-white text-[#5D7C56]'
                                    : 'border-[#CEC7BA] bg-white'
                                }`}
                              >
                                {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* 3. Campo de Observações / Detalhes */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <label 
                    htmlFor="input-obs-agendamento" 
                    className="flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#334230]"
                  >
                    <HeartHandshake className="w-4 h-4 text-[#5D7C56]" />
                    <span>Observações ou detalhes do que você precisa</span>
                  </label>
                  <span className="text-[11px] text-[#8C887B] font-light">
                    Opcional
                  </span>
                </div>
                <textarea
                  id="input-obs-agendamento"
                  rows={4}
                  value={observacoes}
                  onChange={(e) => setObservacoes(e.target.value)}
                  placeholder="Conte um pouco sobre o que você busca, dores/restrições físicas, preferência de dia/horário ou qualquer detalhe prático para seu atendimento..."
                  className="w-full px-4 sm:px-5 py-3.5 sm:py-4 rounded-2xl bg-[#FAF7F2] border border-[#E5DFD5] text-[#334230] placeholder-[#A09D94] text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#8EA886] focus:border-transparent transition-all resize-y min-h-[110px]"
                />
              </div>

              {/* Error Message */}
              {validationError && (
                <div className="p-3.5 rounded-xl bg-[#FDF2F0] border border-[#F5C7C1] text-xs sm:text-sm text-[#A83226] font-medium flex items-center gap-2 animate-fadeIn">
                  <span className="w-2 h-2 rounded-full bg-[#A83226] shrink-0" />
                  <span>{validationError}</span>
                </div>
              )}

              {/* Submit CTA */}
              <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#F0EBE3]">
                <p className="text-xs text-[#8C887B] font-light text-center sm:text-left">
                  Seus dados serão enviados de forma privada diretamente para o WhatsApp da Lorien.
                </p>

                <button
                  id="btn-enviar-agendamento"
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-9 py-4 rounded-full text-xs uppercase tracking-[0.2em] font-bold bg-[#5D7C56] hover:bg-[#4E6B47] text-white shadow-[0_4px_16px_rgba(50,75,45,0.25)] hover:shadow-md active:scale-98 transition-all cursor-pointer shrink-0"
                >
                  <span>Enviar</span>
                  <Send className="w-3.5 h-3.5 opacity-90" />
                </button>
              </div>

            </form>
          )}

        </div>

      </div>
    </section>
  );
};
