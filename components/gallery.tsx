"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { X, ArrowLeft, ArrowRight } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import EditorialPhoto from "./editorial-photo";
import { photos } from "@/lib/content";
const items = [
  { src: photos.cut, type: "Cortes", title: "Precisão em perspectiva" },
  { src: photos.detail, type: "Rituais", title: "O tempo do cuidado" },
  { src: photos.space, type: "Rituais", title: "Um espaço para desacelerar" },
];
export default function Gallery() {
  const [filter, setFilter] = useState("Todos");
  const [selected, setSelected] = useState<number | null>(null);
  const [zoom, setZoom] = useState(false);
  const close = useRef<HTMLButtonElement>(null);
  const dialog = useRef<HTMLDivElement>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const reduced = useReducedMotion();
  const navigate = useCallback((direction: number) => {
    setSelected((value) =>
      value === null ? null : (value + direction + items.length) % items.length,
    );
    setZoom(false);
  }, []);
  useEffect(() => {
    if (selected === null) return;
    const previous = document.activeElement as HTMLElement;
    const overflow = document.body.style.overflow;
    const shell = document.getElementById("site-shell");
    const oldInert = shell?.inert ?? false;
    if (shell) shell.inert = true;
    document.body.style.overflow = "hidden";
    close.current?.focus();
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
      if (e.key === "ArrowRight") navigate(1);
      if (e.key === "ArrowLeft") navigate(-1);
      if (e.key === "Tab") {
        const buttons = Array.from(
          dialog.current?.querySelectorAll<HTMLElement>("button") || [],
        );
        const first = buttons[0],
          last = buttons[buttons.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    document.addEventListener("keydown", key);
    return () => {
      document.removeEventListener("keydown", key);
      document.body.style.overflow = overflow;
      if (shell) shell.inert = oldInert;
      previous?.focus();
    };
  }, [selected === null, navigate]);
  return (
    <>
      <p className="demo-note">
        EXPOSIÇÃO EDITORIAL — Fotografias ilustrativas. Não representam
        trabalhos da equipe.
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
      <div className="gallery-grid exhibition-grid">
        {items.map((i, index) =>
          filter !== "Todos" && i.type !== filter ? null : (
            <motion.button
              key={i.src}
              initial={false}
              whileHover={reduced ? {} : { y: -5 }}
              onClick={() => {
                setSelected(index);
                setZoom(false);
              }}
              aria-label={"Ampliar " + i.title}
              data-cursor="EXPLORAR"
            >
              <EditorialPhoto src={i.src} alt={i.title} />
              <span>
                <small>
                  0{index + 1} / {i.type.toUpperCase()}
                </small>
                {i.title}
                <ArrowRight size={18} />
              </span>
            </motion.button>
          ),
        )}
      </div>
      {selected !== null &&
        createPortal(
          <div
            className="lightbox exhibition-modal"
            ref={dialog}
            role="dialog"
            aria-modal="true"
            aria-label={items[selected].title}
          >
            <div className="exhibition-modal-top">
              <span>
                EXPOSIÇÃO / {String(selected + 1).padStart(2, "0")} —{" "}
                {String(items.length).padStart(2, "0")}
              </span>
              <button
                ref={close}
                onClick={() => setSelected(null)}
                aria-label="Fechar imagem"
              >
                <X />
              </button>
            </div>
            <div
              className={"exhibition-image " + (zoom ? "is-zoomed" : "")}
              onTouchStart={(e) => {
                touch.current = {
                  x: e.touches[0].clientX,
                  y: e.touches[0].clientY,
                };
              }}
              onTouchEnd={(e) => {
                if (!touch.current) return;
                const dx = e.changedTouches[0].clientX - touch.current.x,
                  dy = e.changedTouches[0].clientY - touch.current.y;
                if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.3)
                  navigate(dx > 0 ? -1 : 1);
                touch.current = null;
              }}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={selected}
                  className="exhibition-image-frame"
                  initial={reduced ? false : { opacity: 0, scale: 1.025 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={reduced ? undefined : { opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <EditorialPhoto
                    src={items[selected].src}
                    alt={items[selected].title}
                    priority
                    sizes="90vw"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="exhibition-modal-bottom">
              <button onClick={() => navigate(-1)} aria-label="Imagem anterior">
                <ArrowLeft size={20} />
              </button>
              <p aria-live="polite">{items[selected].title}</p>
              <button
                onClick={() => setZoom(!zoom)}
                aria-pressed={zoom}
                aria-label={zoom ? "Reduzir imagem" : "Ampliar enquadramento"}
              >
                {zoom ? "−" : "+"}
              </button>
              <button onClick={() => navigate(1)} aria-label="Próxima imagem">
                <ArrowRight size={20} />
              </button>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
