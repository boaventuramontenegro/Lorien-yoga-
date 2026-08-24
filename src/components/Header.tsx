import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Logo } from './Logo';
import { getWhatsAppLink, INSTAGRAM_URL } from '../data/services';

interface HeaderProps {
  onNavigateHomeSection: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavigateHomeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    // Initial check
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'nav-inicio', label: 'Início', target: 'inicio', isExternal: false },
    { id: 'nav-servicos', label: 'Serviços', target: 'servicos', isExternal: false },
    { id: 'nav-sobre', label: 'Sobre', target: 'sobre', isExternal: false },
    { id: 'nav-depoimentos', label: 'Depoimentos', target: 'depoimentos', isExternal: false },
    { id: 'nav-aulas', label: 'Aulas em Grupo (Le Parc Arbos)', target: 'aulas-em-grupo', isExternal: false },
    { id: 'nav-faq', label: 'FAQ', target: 'faq', isExternal: false },
    { id: 'nav-blog', label: 'Blog', target: 'blog', isExternal: false },
    { id: 'nav-contato', label: 'Contato', target: 'contato', isExternal: false },
  ];

  const handleNavClick = (target: string, e: React.MouseEvent) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    onNavigateHomeSection(target);
  };

  return (
    <header
      id="header-nav"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FAF8F5]/96 backdrop-blur-md shadow-[0_4px_24px_rgba(40,65,35,0.08)] border-b border-[#D8E4D4]'
          : 'bg-gradient-to-b from-[#141710]/85 via-[#141710]/50 to-transparent border-b border-white/10'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Brand: Adaptive Color (White in Hero / Black when Scrolled) */}
          <a
            href="#inicio"
            id="header-brand-link"
            onClick={(e) => {
              e.preventDefault();
              onNavigateHomeSection('inicio');
            }}
            className="flex items-center group transition-transform active:scale-98 cursor-pointer"
          >
            <Logo 
              size="md" 
              variant={isScrolled ? 'black' : 'white'} 
              showText={true} 
            />
          </a>

          {/* Desktop Navigation */}
          <nav 
            className={`hidden lg:flex items-center gap-6 text-[11px] uppercase tracking-widest font-semibold transition-colors duration-300 ${
              isScrolled ? 'text-[#2C3B27]/90' : 'text-[#FAF7F2]/90'
            }`}
            aria-label="Navegação Principal"
          >
            {navLinks.map((link) => (
              link.isExternal ? (
                <a
                  key={link.id}
                  href={link.target}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`py-1 relative group transition-colors cursor-pointer ${
                    isScrolled ? 'hover:text-[#182315]' : 'hover:text-white'
                  }`}
                >
                  {link.label}
                  <span 
                    className={`absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                      isScrolled ? 'bg-[#5D7C56]' : 'bg-[#A3BFA0]'
                    }`} 
                  />
                </a>
              ) : (
                <button
                  key={link.id}
                  onClick={(e) => handleNavClick(link.target, e)}
                  className={`py-1 relative group transition-colors cursor-pointer ${
                    isScrolled ? 'hover:text-[#182315]' : 'hover:text-white'
                  }`}
                >
                  {link.label}
                  <span 
                    className={`absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                      isScrolled ? 'bg-[#5D7C56]' : 'bg-[#A3BFA0]'
                    }`} 
                  />
                </button>
              )
            ))}
          </nav>

          {/* Desktop Right CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              id="header-whatsapp-cta"
              href={getWhatsAppLink('Olá Lorien! Gostaria de saber mais sobre as práticas e agendamentos.')}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center justify-center px-6 py-2.5 rounded-full text-[10px] font-bold tracking-widest uppercase transition-all duration-200 shadow-md hover:shadow-lg active:scale-98 ${
                isScrolled
                  ? 'bg-gradient-to-r from-[#55734F] via-[#65875E] to-[#55734F] hover:from-[#496543] hover:to-[#577750] text-[#FDFBF7] border border-[#8DAF86]/50 shadow-[0_2px_14px_rgba(50,75,45,0.25)]'
                  : 'bg-[#5D7C56]/90 hover:bg-[#5D7C56] text-white border border-[#A3BFA0]/40 backdrop-blur-xs shadow-[0_2px_16px_rgba(0,0,0,0.3)]'
              }`}
            >
              Agendar pelo WhatsApp
            </a>
          </div>

          {/* Mobile Right Controls - Menu Hambúrguer */}
          <div className="flex lg:hidden items-center">
            <button
              id="mobile-menu-toggle"
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 transition-colors cursor-pointer bg-transparent border-0 outline-none focus:outline-none ${
                isScrolled
                  ? 'text-[#2C3B27] hover:text-[#182315]'
                  : 'text-white hover:text-white/80'
              }`}
              aria-label={mobileMenuOpen ? 'Fechar Menu' : 'Abrir Menu'}
            >
              {mobileMenuOpen ? (
                <X className={`w-7 h-7 ${isScrolled ? 'text-[#5D7C56]' : 'text-white'}`} />
              ) : (
                <Menu className="w-7 h-7" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div 
          id="mobile-nav-menu"
          className="lg:hidden bg-[#FAF8F5] border-b border-[#D8E4D4] px-5 pt-3 pb-6 space-y-2 shadow-2xl"
        >
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              link.isExternal ? (
                <a
                  key={link.id}
                  href={link.target}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 rounded-lg text-xs uppercase tracking-widest font-semibold text-[#2C3B27] hover:bg-[#EFF4EC] hover:text-[#182315] transition-colors"
                >
                  {link.label}
                </a>
              ) : (
                <button
                  key={link.id}
                  onClick={(e) => handleNavClick(link.target, e)}
                  className="text-left px-4 py-3 rounded-lg text-xs uppercase tracking-widest font-semibold text-[#2C3B27] hover:bg-[#EFF4EC] hover:text-[#182315] transition-colors"
                >
                  {link.label}
                </button>
              )
            ))}
          </div>

          <div className="pt-4 border-t border-[#E5E1D8] space-y-3">
            <a
              id="mobile-menu-whatsapp-btn"
              href={getWhatsAppLink('Olá Lorien! Gostaria de agendar uma prática de Yoga ou atendimento terapêutico.')}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-full text-xs font-bold tracking-widest uppercase bg-[#5D7C56] text-white shadow-md active:scale-98"
            >
              Agendar no WhatsApp
            </a>

            <a
              id="mobile-menu-instagram-btn"
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-full text-xs font-medium tracking-wide border border-[#C5D5C1] text-[#3E523A] bg-[#EFF4EC]"
            >
              Instagram @lorienvalsecchi
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
