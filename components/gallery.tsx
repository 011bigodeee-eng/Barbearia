"use client";
import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import { photos } from "@/lib/content";
const items = [
  { src: photos.cut, type: "Cortes", title: "Precisão em perspectiva" },
  { src: photos.detail, type: "Rituais", title: "O tempo do cuidado" },
  { src: photos.space, type: "Rituais", title: "Um espaço para desacelerar" },
];
export default function Gallery() {
  const [filter, setFilter] = useState("Todos");
  const [selected, setSelected] = useState<(typeof items)[number] | null>(null);
  const close = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!selected) return;
    const previous = document.activeElement as HTMLElement;
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    close.current?.focus();
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
      if (e.key === "Tab") {
        e.preventDefault();
        close.current?.focus();
      }
    };
    document.addEventListener("keydown", key);
    return () => {
      document.body.style.overflow = old;
      document.removeEventListener("keydown", key);
      previous?.focus();
    };
  }, [selected]);
  return (
    <>
      <p className="demo-note">
        Seleção editorial de imagens ilustrativas. Não representa trabalhos
        realizados pela equipe.
      </p>
      <div className="filters">
        {["Todos", "Cortes", "Rituais"].map((t) => (
          <button
            key={t}
            aria-pressed={filter === t}
            onClick={() => setFilter(t)}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="gallery-grid">
        {items
          .filter((i) => filter === "Todos" || i.type === filter)
          .map((i) => (
            <button
              key={i.src}
              onClick={() => setSelected(i)}
              aria-label={"Ampliar " + i.title}
            >
              <img loading="lazy" src={i.src} alt={i.title} />
              <span>{i.title} ↗</span>
            </button>
          ))}
      </div>
      {selected && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={selected.title}
        >
          <button
            ref={close}
            onClick={() => setSelected(null)}
            aria-label="Fechar imagem"
          >
            <X />
          </button>
          <img src={selected.src} alt={selected.title} />
        </div>
      )}
    </>
  );
}
