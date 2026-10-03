"use client";

import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ReactNode, useEffect, useRef, useState } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  /** Quanto rolar a cada clique. Se não vier, usa ~85% da largura visível. */
  scrollAmount?: number;
  /** Texto de acessibilidade da seta esquerda. */
  ariaLabelLeft?: string;
  /** Texto de acessibilidade da seta direita. */
  ariaLabelRight?: string;
  /**
   * Altura (px) da mídia do card. Quando informada, as setas centralizam no
   * meio da imagem (ignorando título e padding). Sem ela, centralizam no
   * meio do carrossel inteiro (o padrão).
   */
  mediaHeight?: number;
  /** Classes extras para ajuste fino das setas. */
  arrowCenterClassName?: string;
};

const ScrollableCarousel = ({
  children,
  className = "",
  scrollAmount,
  ariaLabelLeft = "Rolar para a esquerda",
  ariaLabelRight = "Rolar para a direita",
  mediaHeight,
  arrowCenterClassName,
}: Props) => {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateButtons = () => {
    const el = scrollerRef.current;
    if (!el) return;
    const maxScrollLeft = el.scrollWidth - el.clientWidth;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft < maxScrollLeft - 1);
  };

  const scrollBy = (direction: "left" | "right") => {
    const el = scrollerRef.current;
    if (!el) return;
    const amount =
      scrollAmount ?? Math.max(320, Math.floor(el.clientWidth * 0.85));
    el.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    updateButtons();
    const onResize = () => updateButtons();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [children]);

  // Ponto vertical das setas: meio da mídia (se informada) ou meio do carrossel.
  const arrowTop = mediaHeight ? `${mediaHeight / 2}px` : "50%";

  const buttonClasses = cn(
    "absolute top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center",
    "rounded-full bg-gray-200/90 text-gray-800 shadow-md hover:bg-gray-200",
    arrowCenterClassName
  );

  return (
    <div className="relative">
      {canScrollLeft ? (
        <button
          type="button"
          onClick={() => scrollBy("left")}
          className={cn(buttonClasses, "left-2")}
          style={{ top: arrowTop }}
          aria-label={ariaLabelLeft}
        >
          <ChevronLeft />
        </button>
      ) : null}

      {canScrollRight ? (
        <button
          type="button"
          onClick={() => scrollBy("right")}
          className={cn(buttonClasses, "right-2")}
          style={{ top: arrowTop }}
          aria-label={ariaLabelRight}
        >
          <ChevronRight />
        </button>
      ) : null}

      <div
        ref={scrollerRef}
        onScroll={updateButtons}
        className={`no-scrollbar flex overflow-x-auto overflow-y-hidden scroll-smooth ${className}`}
      >
        {children}
      </div>
    </div>
  );
};

export default ScrollableCarousel;
