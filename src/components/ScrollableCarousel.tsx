"use client";

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
};

const ScrollableCarousel = ({
  children,
  className = "",
  scrollAmount,
  ariaLabelLeft = "Rolar para a esquerda",
  ariaLabelRight = "Rolar para a direita",
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

  const buttonClasses =
    "absolute top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-gray-200/90 text-gray-800 shadow-md hover:bg-gray-200";

  return (
    <div className="relative">
      {canScrollLeft ? (
        <button
          type="button"
          onClick={() => scrollBy("left")}
          className={`${buttonClasses} left-2`}
          aria-label={ariaLabelLeft}
        >
          <ChevronLeft className="m-auto" />
        </button>
      ) : null}

      {canScrollRight ? (
        <button
          type="button"
          onClick={() => scrollBy("right")}
          className={`${buttonClasses} right-2`}
          aria-label={ariaLabelRight}
        >
          <ChevronRight className="m-auto" />
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
