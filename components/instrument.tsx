"use client";
import dynamic from "next/dynamic";
import { Component, useEffect, useRef, useState, type ReactNode } from "react";
import { RotateCcw, ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
const Scene = dynamic(() => import("./scene"), {
  ssr: false,
  loading: () => <Fallback />,
});
const details = [
  {
    title: "A LÂMINA.",
    text: "Dentes precisos. A geometria do detalhe.",
    label: "Lâmina",
  },
  {
    title: "A MATÉRIA.",
    text: "Metal escovado. Reflexos que revelam a forma.",
    label: "Corpo",
  },
  {
    title: "O CONTROLE.",
    text: "Equilíbrio entre o instrumento e o gesto.",
    label: "Controle",
  },
];
function Fallback() {
  return (
    <div
      className="clipper-fallback"
      role="img"
      aria-label="Estudo visual monocromático de uma máquina de cortar cabelo"
    >
      <div className="clipper-teeth" />
      <div className="clipper-blade" />
      <div className="clipper-body">
        <div className="clipper-switch" />
        <div className="clipper-grip" />
      </div>
    </div>
  );
}
class GraphicsBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? <Fallback /> : this.props.children;
  }
}
export default function Instrument() {
  const [enabled, setEnabled] = useState(false);
  const [detail, setDetail] = useState(-1);
  const ref = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const progress = useRef(0);
  const drag = useRef({ x: 0, y: 0 });
  const dragging = useRef<{ x: number; y: number } | null>(null);
  useEffect(() => {
    const q = matchMedia(
      "(min-width: 900px) and (prefers-reduced-motion: no-preference)",
    );
    let nearby = false;
    const update = () => {
      if (!q.matches || !nearby) {
        setEnabled(false);
        return;
      }
      let gl = false;
      try {
        const c = document.createElement("canvas").getContext("webgl2");
        gl = !!c;
        c?.getExtension("WEBGL_lose_context")?.loseContext();
      } catch {}
      setEnabled(gl);
    };
    const io = new IntersectionObserver(
      ([entry]) => {
        nearby = entry.isIntersecting;
        update();
      },
      { rootMargin: "250px" },
    );
    if (stage.current) io.observe(stage.current);
    q.addEventListener("change", update);
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add(
      "(min-width: 900px) and (prefers-reduced-motion: no-preference)",
      () => {
        gsap.to(progress, {
          current: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 70%",
            end: "bottom 30%",
            scrub: 0.7,
          },
        });
      },
    );
    return () => {
      io.disconnect();
      q.removeEventListener("change", update);
      media.revert();
    };
  }, []);
  return (
    <div ref={ref} className="product-scroll">
      <div className="product-sticky">
        <div className="product-copy">
          <span className="eyebrow">ENGENHARIA DO GESTO.</span>
          <h2>
            PRECISÃO.
            <br />
            NÃO É<br />
            <span>ACASO.</span>
          </h2>
          <p className="copy">
            Uma exploração da forma,
            <br />
            da matéria e do movimento.
          </p>
          <div
            className="product-details"
            role="group"
            aria-label="Detalhes da máquina"
          >
            {details.map((d, i) => (
              <button
                key={d.label}
                type="button"
                aria-pressed={detail === i}
                onClick={() => setDetail(detail === i ? -1 : i)}
              >
                <span>0{i + 1}</span>
                {d.label}
                <ArrowUpRight size={16} />
              </button>
            ))}
          </div>
          <div className="product-detail-note" aria-live="polite">
            <h3>{detail < 0 ? "O INSTRUMENTO." : details[detail].title}</h3>
            <p>
              {detail < 0
                ? "Explore os detalhes. Mude o ângulo. Descubra um novo olhar."
                : details[detail].text}
            </p>
          </div>
        </div>
        <div className="product-stage" ref={stage}>
          <div
            className="product-model"
            data-cursor={enabled ? "ARRASTE" : undefined}
            onPointerDown={(e) => {
              if (!enabled || e.pointerType !== "mouse" || e.button !== 0)
                return;
              dragging.current = { x: e.clientX, y: e.clientY };
              e.currentTarget.setPointerCapture(e.pointerId);
            }}
            onPointerMove={(e) => {
              if (!dragging.current) return;
              drag.current.y += (e.clientX - dragging.current.x) * 0.006;
              drag.current.x = Math.max(
                -0.5,
                Math.min(
                  0.5,
                  drag.current.x + (e.clientY - dragging.current.y) * 0.003,
                ),
              );
              dragging.current = { x: e.clientX, y: e.clientY };
            }}
            onPointerUp={() => {
              dragging.current = null;
            }}
            onPointerCancel={() => {
              dragging.current = null;
            }}
          >
            <GraphicsBoundary>
              {enabled ? (
                <Scene progress={progress} drag={drag} detail={detail} />
              ) : (
                <Fallback />
              )}
            </GraphicsBoundary>
          </div>
          <span className="product-cross cross-one" aria-hidden="true">
            +
          </span>
          <span className="product-cross cross-two" aria-hidden="true">
            +
          </span>
          <div className="product-stage-bottom">
            <span>
              MODELO PROCEDURAL ORIGINAL
              <br />
              ESTUDO CROMADO / 001
            </span>
            <button
              type="button"
              onClick={() => {
                drag.current = { x: 0, y: 0 };
                setDetail(-1);
              }}
              aria-label="Restaurar ângulo da máquina"
            >
              <RotateCcw size={15} /> RESTAURAR
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
