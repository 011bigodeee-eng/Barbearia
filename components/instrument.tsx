"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
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
export default function Instrument() {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    const q = matchMedia(
      "(min-width: 900px) and (prefers-reduced-motion: no-preference)",
    );
    let gl = false;
    try {
      gl = !!document.createElement("canvas").getContext("webgl2");
    } catch {}
    setEnabled(q.matches && gl);
  }, []);
  return <div className="instrument">{enabled ? <Scene /> : <Fallback />}</div>;
}
