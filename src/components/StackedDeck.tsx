import React, { useState, useRef, useEffect } from 'react';

export interface DeckCardItem {
  id: string;
  image: string;
  caption?: string;
  subcaption?: string;
  alt?: string;
}

interface StackedDeckProps {
  cards: DeckCardItem[];
  className?: string;
}

export const StackedDeck: React.FC<StackedDeckProps> = ({
  cards,
  className = '',
}) => {
  // isOpen: false = Fan Deck / Fechado (abanado em leque); true = Aberto / Em Foco
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const startPosRef = useRef<{ x: number; y: number; time: number }>({ x: 0, y: 0, time: 0 });
  const isHorizontalGestureRef = useRef<boolean | null>(null);

  const count = cards.length;

  // Fechar deck ao clicar/tocar fora do container apenas quando estiver aberto
  useEffect(() => {
    if (!isOpen) return;

    const handleOutsideClick = (e: MouseEvent | TouchEvent) => {
      // Se o clique foi dentro do próprio deck, não faz nada
      if (containerRef.current && containerRef.current.contains(e.target as Node)) {
        return;
      }

      setIsOpen(false);
      setDragOffset({ x: 0, y: 0 });
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('touchstart', handleOutsideClick, { passive: true });

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('touchstart', handleOutsideClick);
    };
  }, [isOpen]);

  const handleCardClick = (idx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    // Se o usuário estava apenas arrastando, não trata como clique acidental
    if (Math.abs(dragOffset.x) > 6 || Math.abs(dragOffset.y) > 6) {
      return;
    }

    if (!isOpen) {
      setIsOpen(true);
      setCurrentIndex(idx);
    } else {
      if (idx === currentIndex) {
        // Se clicar no card central já em foco, avança para o próximo se houver, ou fecha se for o último
        if (currentIndex < count - 1) {
          setCurrentIndex((prev) => prev + 1);
        } else {
          setIsOpen(false);
        }
      } else {
        setCurrentIndex(idx);
      }
    }
  };

  // --- TOUCH HANDLERS (Com suporte a touch-action: pan-y e detecção de scroll vertical) ---
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    startPosRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now(),
    };
    setIsDragging(true);
    isHorizontalGestureRef.current = null;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const touch = e.touches[0];
    const dx = touch.clientX - startPosRef.current.x;
    const dy = touch.clientY - startPosRef.current.y;

    // Se ainda não determinamos se o gesto é primariamente horizontal ou vertical:
    if (isHorizontalGestureRef.current === null) {
      if (Math.abs(dx) > 7 || Math.abs(dy) > 7) {
        if (Math.abs(dy) > Math.abs(dx)) {
          // Gesto vertical detectado: NÃO interfere no scroll nativo da página
          isHorizontalGestureRef.current = false;
          // Se estiver aberto e o movimento vertical for nítido (> 24px), fecha o deck suavemente
          if (isOpen && Math.abs(dy) > 24) {
            setIsOpen(false);
            setIsDragging(false);
            setDragOffset({ x: 0, y: 0 });
          }
          return;
        } else {
          // Gesto horizontal intencional
          isHorizontalGestureRef.current = true;
        }
      }
    }

    if (isHorizontalGestureRef.current === true) {
      // Movimento horizontal fluido
      // Aplicar resistência nas extremidades (limites sem loop infinito)
      let appliedDx = dx;
      if (isOpen) {
        if (currentIndex === 0 && dx > 0) {
          appliedDx = dx * 0.3; // Resistência elástica
        } else if (currentIndex === count - 1 && dx < 0) {
          appliedDx = dx * 0.3; // Resistência elástica
        }
      }
      setDragOffset({ x: appliedDx, y: dy * 0.2 });
    }
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    const dx = dragOffset.x;
    const threshold = 45; // Pixels mínimos para swipe deliberado

    if (isHorizontalGestureRef.current === true) {
      if (dx < -threshold) {
        // Arrastou da DIREITA para a ESQUERDA -> Avança
        if (!isOpen) {
          setIsOpen(true);
        } else if (currentIndex < count - 1) {
          setCurrentIndex((prev) => prev + 1);
        }
      } else if (dx > threshold) {
        // Arrastou da ESQUERDA para a DIREITA -> Volta
        if (!isOpen) {
          setIsOpen(true);
        } else if (currentIndex > 0) {
          setCurrentIndex((prev) => prev - 1);
        }
      }
    }

    setDragOffset({ x: 0, y: 0 });
    isHorizontalGestureRef.current = null;
  };

  // --- MOUSE HANDLERS (Desktop) ---
  const handleMouseDown = (e: React.MouseEvent) => {
    startPosRef.current = {
      x: e.clientX,
      y: e.clientY,
      time: Date.now(),
    };
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - startPosRef.current.x;
    const dy = e.clientY - startPosRef.current.y;

    let appliedDx = dx;
    if (isOpen) {
      if (currentIndex === 0 && dx > 0) {
        appliedDx = dx * 0.3;
      } else if (currentIndex === count - 1 && dx < 0) {
        appliedDx = dx * 0.3;
      }
    }
    setDragOffset({ x: appliedDx, y: dy * 0.2 });
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);

    const dx = dragOffset.x;
    const threshold = 40;

    if (dx < -threshold) {
      if (!isOpen) {
        setIsOpen(true);
      } else if (currentIndex < count - 1) {
        setCurrentIndex((prev) => prev + 1);
      }
    } else if (dx > threshold) {
      if (!isOpen) {
        setIsOpen(true);
      } else if (currentIndex > 0) {
        setCurrentIndex((prev) => prev - 1);
      }
    }

    setDragOffset({ x: 0, y: 0 });
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      setDragOffset({ x: 0, y: 0 });
    }
  };

  return (
    <div
      ref={containerRef}
      id="stacked-deck-container"
      className={`relative flex flex-col items-center select-none w-full ${className}`}
    >
      {/* Área do Deck de Cards com Perspective */}
      <div
        className="relative w-[290px] sm:w-[320px] h-[420px] sm:h-[460px] flex items-center justify-center cursor-grab active:cursor-grabbing touch-pan-y"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        {cards.map((card, i) => {
          let transform = '';
          let zIndex = 10;
          let opacity = 1;
          let filter = 'none';

          if (!isOpen) {
            // ==========================================
            // ESTADO INICIAL (FECHADO / FAN DECK NA MEDIDA EXATA DA REFERÊNCIA)
            // ==========================================
            // O card da frente inclinado para a esquerda (-4°), revelando discretamente
            // apenas as bordas superiores e laterais dos cards seguintes em leque equilibrado.
            const offsetFromTop = i;

            // Rotações e deslocamentos calibrados na medida exata
            const fanRotations = [-4, -0.5, 3.2, 7, 10.8];
            const fanTranslateX = [-14, -2, 10, 22, 34];
            const fanTranslateY = [0, -5, -7, -5, -1];

            const baseRot = offsetFromTop < fanRotations.length ? fanRotations[offsetFromTop] : -4 + offsetFromTop * 3.6;
            const baseTx = offsetFromTop < fanTranslateX.length ? fanTranslateX[offsetFromTop] : -14 + offsetFromTop * 12;
            const baseTy = offsetFromTop < fanTranslateY.length ? fanTranslateY[offsetFromTop] : -5;
            const baseScale = Math.max(1 - offsetFromTop * 0.015, 0.94);

            // Drag durante o estado de leque
            const dragX = isDragging ? dragOffset.x * 0.4 : 0;
            const dragRot = isDragging ? dragOffset.x * 0.04 : 0;

            transform = `translate3d(${baseTx + dragX}px, ${baseTy}px, 0) rotate(${baseRot + dragRot}deg) scale(${baseScale})`;
            zIndex = 40 - offsetFromTop * 5;
            // Opacidade e filtro que preservam o contorno das cartas sem expor a foto completa dos cards de trás
            opacity = offsetFromTop === 0 ? 1 : Math.max(0.96 - offsetFromTop * 0.04, 0.85);
            filter = offsetFromTop === 0 ? 'none' : 'brightness(0.88) contrast(0.96)';
          } else {
            // ==========================================
            // ESTADO ABERTO (CARD EM FOCO & CASCATA LATERAL)
            // ==========================================
            const diff = i - currentIndex; // 0 = card em foco, < 0 = esquerda, > 0 = direita

            if (diff === 0) {
              // Card Central em Foco
              const dragX = isDragging ? dragOffset.x : 0;
              const dragRot = isDragging ? dragOffset.x * 0.05 : 0;
              transform = `translate3d(${dragX}px, 0, 0) rotate(${dragRot}deg) scale(1.06)`;
              zIndex = 40;
              opacity = 1;
              filter = 'none';
            } else if (diff < 0) {
              // Cards Anteriores (À esquerda)
              const depth = Math.abs(diff);
              const tx = -38 * depth + (isDragging ? dragOffset.x * 0.3 : 0);
              const rot = -3.5 * depth;
              const sc = Math.max(1 - depth * 0.07, 0.78);
              transform = `translate3d(${tx}px, ${depth * 8}px, 0) rotate(${rot}deg) scale(${sc})`;
              zIndex = 40 - depth * 8;
              opacity = Math.max(0.65 - depth * 0.2, 0.15);
              filter = 'brightness(0.92)';
            } else {
              // Cards Posteriores (À direita)
              const depth = diff;
              const tx = 38 * depth + (isDragging ? dragOffset.x * 0.3 : 0);
              const rot = 3.5 * depth;
              const sc = Math.max(1 - depth * 0.07, 0.78);
              transform = `translate3d(${tx}px, ${depth * 8}px, 0) rotate(${rot}deg) scale(${sc})`;
              zIndex = 40 - depth * 8;
              opacity = Math.max(0.65 - depth * 0.2, 0.15);
              filter = 'brightness(0.92)';
            }
          }

          return (
            <div
              key={card.id}
              onClick={(e) => handleCardClick(i, e)}
              style={{
                transform,
                transformOrigin: !isOpen ? '28% 94%' : 'center center',
                zIndex,
                opacity,
                filter,
                transition: isDragging ? 'none' : 'transform 420ms cubic-bezier(0.16, 1, 0.3, 1), opacity 350ms ease, filter 350ms ease',
              }}
              className="absolute inset-0 w-[290px] sm:w-[320px] h-[420px] sm:h-[460px] rounded-[12px] overflow-hidden bg-[#FAF7F2] border border-[#8FAF87]/50 shadow-[-6px_10px_28px_rgba(28,41,27,0.2)] will-change-transform cursor-pointer"
            >
              {/* Imagem de Fundo Completa do Card */}
              <img
                src={card.image}
                alt={card.alt || card.caption || 'Foto da Lorien ou do Espaço'}
                referrerPolicy="no-referrer"
                loading={i <= 1 ? 'eager' : 'lazy'}
                decoding="async"
                className="w-full h-full object-cover object-center pointer-events-none"
              />

              {/* Overlay Gradiente Sutil na Base para Legibilidade da Legenda */}
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#1C291B]/85 via-[#1C291B]/40 to-transparent pointer-events-none" />

              {/* Legenda na base do Card (Tipografia Serifada nos Títulos) */}
              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 text-white pointer-events-none">
                {card.caption && (
                  <h4 className="font-serif text-lg sm:text-xl font-normal tracking-wide text-[#FAF7F2] drop-shadow-sm leading-snug">
                    {card.caption}
                  </h4>
                )}
                {card.subcaption && (
                  <p className="text-xs sm:text-[13px] text-[#FAF7F2]/85 font-light leading-relaxed mt-0.5 drop-shadow-xs">
                    {card.subcaption}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Indicadores de Cards (Sutis e Centralizados) */}
      <div className="mt-4 flex items-center justify-center gap-1.5 h-3">
        {isOpen &&
          cards.map((_, idx) => (
            <button
              key={`dot-${idx}`}
              type="button"
              onClick={() => {
                setIsOpen(true);
                setCurrentIndex(idx);
              }}
              aria-label={`Ver foto ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                idx === currentIndex
                  ? 'w-5 bg-[#5D7C56]'
                  : 'w-1.5 bg-[#D3CBC0] hover:bg-[#A3BFA0]'
              }`}
            />
          ))}
      </div>
    </div>
  );
};
