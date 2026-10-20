"use client";
import dynamic from "next/dynamic";
import { Component, useEffect, useRef, useState, type ReactNode } from "react";
const Scene = dynamic(() => import("./scene"), {
  ssr: false,
  loading: () => <Fallback />,
});
function Fallback() {
  return (
    <div
      className="razor-fallback"
      role="img"
      aria-label="Estudo monocromático de uma navalha"
    >
      <div className="razor-blade" />
      <div className="razor-handle" />
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
  const ref = useRef<HTMLDivElement>(null);
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
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("webgl2");
        gl = !!context;
        context?.getExtension("WEBGL_lose_context")?.loseContext();
      } catch {}
      setEnabled(gl);
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        nearby = entry.isIntersecting;
        update();
      },
      { rootMargin: "250px" },
    );
    if (ref.current) observer.observe(ref.current);
    q.addEventListener("change", update);
    return () => {
      observer.disconnect();
      q.removeEventListener("change", update);
    };
  }, []);
  return (
    <div ref={ref} className="instrument">
      <GraphicsBoundary>{enabled ? <Scene /> : <Fallback />}</GraphicsBoundary>
    </div>
  );
}
