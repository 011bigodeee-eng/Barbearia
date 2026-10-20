"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
export default function InteractiveCursor() {
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const media = gsap.matchMedia();
    media.add(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
      () => {
        const x = gsap.quickTo(node, "x", {
            duration: 0.35,
            ease: "power3.out",
          }),
          y = gsap.quickTo(node, "y", { duration: 0.35, ease: "power3.out" });
        const move = (e: PointerEvent) => {
          if (e.pointerType !== "mouse") return;
          const target = (e.target as Element).closest<HTMLElement>(
            "[data-cursor]",
          );
          const text = target?.dataset.cursor;
          node.textContent = text || "";
          node.classList.toggle("is-visible", !!text);
          x(e.clientX);
          y(e.clientY);
        };
        const leave = () => node.classList.remove("is-visible");
        document.addEventListener("pointermove", move);
        document.addEventListener("pointerleave", leave);
        document.addEventListener("pointerdown", leave);
        return () => {
          document.removeEventListener("pointermove", move);
          document.removeEventListener("pointerleave", leave);
          document.removeEventListener("pointerdown", leave);
          leave();
        };
      },
    );
    return () => media.revert();
  }, [pathname]);
  return <div ref={ref} className="interactive-cursor" aria-hidden="true" />;
}
