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
import { GatedScrollProvider } from './components/ScrollReveal';

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
    <GatedScrollProvider>
      <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#2C2926] font-sans selection:bg-[#E2EDE7] selection:text-[#293E34] w-full overflow-x-hidden">
        {/* Header Navigation */}
        <Header 
          onNavigateHomeSection={navigateToHomeSection} 
        />

        <main className="flex-1">
          {/* 1. Início (Hero) */}
          <Hero />

          {/* 2. Serviços & Terapias */}
          <Servicos />

          {/* 3. Sobre a Lorien */}
          <Sobre />

          {/* 4. Depoimentos */}
          <Depoimentos />

          {/* 5. Aulas em Grupo (Le Parc Arbos) */}
          <AulasEmGrupo />

          {/* 6. FAQ (Perguntas Frequentes) */}
          <FAQ />

          {/* 7. Blog (Card CTA para o Instagram) */}
          <BlogCTA />

          {/* 8. Agendamento & Contato */}
          <Agendamento />
        </main>

        {/* Rodapé */}
        <Footer />

        {/* Botão Flutuante Independente do WhatsApp (Canto Inferior Direito) */}
        <FloatingWhatsApp />
      </div>
    </GatedScrollProvider>
  );
}




