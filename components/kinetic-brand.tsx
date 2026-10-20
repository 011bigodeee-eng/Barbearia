"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
export default function KineticBrand({ name }: { name: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const media = gsap.matchMedia();
    media.add(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
      () => {
        const letters = Array.from(
          element.querySelectorAll<HTMLElement>(".kinetic-letter"),
        );
        const moves = letters.map((letter) => ({
          y: gsap.quickTo(letter, "y", { duration: 0.7, ease: "power3.out" }),
          z: gsap.quickTo(letter, "z", { duration: 0.8, ease: "power3.out" }),
          r: gsap.quickTo(letter, "rotationX", {
            duration: 0.7,
            ease: "power3.out",
          }),
        }));
        const move = (e: PointerEvent) => {
          const rect = element.getBoundingClientRect();
          letters.forEach((letter, i) => {
            const center = (i + 0.5) / letters.length;
            const proximity = Math.max(
              0,
              1 - Math.abs((e.clientX - rect.left) / rect.width - center) * 3,
            );
            moves[i].y(-9 * proximity);
            moves[i].z(18 * proximity);
            moves[i].r(
              ((e.clientY - rect.top - rect.height / 2) / rect.height) *
                10 *
                proximity,
            );
          });
        };
        const reset = () =>
          moves.forEach((m) => {
            m.y(0);
            m.z(0);
            m.r(0);
          });
        element.addEventListener("pointermove", move);
        element.addEventListener("pointerleave", reset);
        return () => {
          element.removeEventListener("pointermove", move);
          element.removeEventListener("pointerleave", reset);
        };
      },
    );
    return () => media.revert();
  }, []);
  return (
    <div
      ref={ref}
      className="hero-brand kinetic-brand"
      data-brand-target
      aria-label={name}
    >
      {Array.from(name).map((letter, i) => (
        <span key={i} className="kinetic-letter" aria-hidden="true">
          {letter === " " ? "\u00a0" : letter}
        </span>
      ))}
      <span className="brand-mark" aria-hidden="true">
        ®
      </span>
    </div>
  );
}
