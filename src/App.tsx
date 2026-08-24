import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Servicos } from './components/Servicos';
import { Sobre } from './components/Sobre';
import { Depoimentos } from './components/Depoimentos';
import { AulasEmGrupo } from './components/AulasEmGrupo';
import { FAQ } from './components/FAQ';
import { BlogCTA } from './components/BlogCTA';
import { Agendamento } from './components/Agendamento';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { RevealSection } from './components/RevealSection';

export default function App() {
  const navigateToHomeSection = (sectionId: string) => {
    if (sectionId === 'inicio') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
    window.history.pushState(null, '', `#${sectionId}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#2C2926] font-sans selection:bg-[#E2EDE7] selection:text-[#293E34] w-full overflow-x-hidden">
      {/* Header Navigation */}
      <Header 
        onNavigateHomeSection={navigateToHomeSection} 
      />

      <main className="flex-1">
        {/* 1. Início (Hero) */}
        <Hero />

        {/* 2. Serviços & Terapias */}
        <RevealSection>
          <Servicos />
        </RevealSection>

        {/* 3. Sobre a Lorien */}
        <RevealSection>
          <Sobre />
        </RevealSection>

        {/* 4. Depoimentos */}
        <RevealSection>
          <Depoimentos />
        </RevealSection>

        {/* 5. Aulas em Grupo (Le Parc Arbos) */}
        <RevealSection>
          <AulasEmGrupo />
        </RevealSection>

        {/* 6. FAQ (Perguntas Frequentes) */}
        <RevealSection>
          <FAQ />
        </RevealSection>

        {/* 7. Blog (Card CTA para o Instagram) */}
        <RevealSection>
          <BlogCTA />
        </RevealSection>

        {/* 8. Agendamento & Contato */}
        <RevealSection>
          <Agendamento />
        </RevealSection>
      </main>

      {/* Rodapé */}
      <RevealSection threshold={0.05}>
        <Footer />
      </RevealSection>

      {/* Botão Flutuante Independente do WhatsApp (Canto Inferior Direito) */}
      <FloatingWhatsApp />
    </div>
  );
}




