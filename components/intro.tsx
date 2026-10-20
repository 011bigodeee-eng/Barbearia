"use client";

import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

const SESSION_KEY = "barber-studio:intro:v2";
let seenInMemory = false;

export default function BrandIntro({ name }: { name: string }) {
  const pathname = usePathname();
  const [active, setActive] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const skip = useRef<HTMLButtonElement>(null);
  const complete = useCallback(() => {
    seenInMemory = true;
    try {
      sessionStorage.setItem(SESSION_KEY, "seen");
    } catch {
      /* Private browsing may block storage. */
    }
    delete document.documentElement.dataset.introPending;
    setActive(false);
  }, []);

  useLayoutEffect(() => {
    if (pathname !== "/") {
      delete document.documentElement.dataset.introPending;
      setActive(false);
      return;
    }
    let seen = seenInMemory;
    try {
      seen ||= sessionStorage.getItem(SESSION_KEY) === "seen";
    } catch {}
    if (
      seen ||
      matchMedia("(prefers-reduced-motion: reduce)").matches ||
      document.documentElement.dataset.introExpired === "true"
    ) {
      delete document.documentElement.dataset.introPending;
      return;
    }
    setActive(true);
  }, [pathname]);

  useLayoutEffect(() => {
    if (!active || !root.current) return;
    const shell = document.getElementById("site-shell");
    const previousInert = shell?.inert ?? false;
    const oldOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement as HTMLElement | null;
    if (shell) shell.inert = true;
    document.body.style.overflow = "hidden";
    // React's cover now owns the transition; remove the pre-paint cover so the white reveal is continuous.
    delete document.documentElement.dataset.introPending;
    skip.current?.focus({ preventScroll: true });
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const stopForReducedMotion = () => {
      if (media.matches) complete();
    };
    media.addEventListener("change", stopForReducedMotion);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") complete();
      if (e.key === "Tab") {
        e.preventDefault();
        skip.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    // Independent watchdog: content is never left behind a stalled animation.
    const watchdog = window.setTimeout(complete, 4000);
    const context = gsap.context(() => {
      const title = root.current!.querySelector(".intro-wordmark")!;
      // Streaming can leave the home hidden during mount. Measure only when the morph starts.
      const destination = () => {
        const rect = document
          .querySelector("[data-brand-target]")
          ?.getBoundingClientRect();
        return rect && rect.width > 0 ? rect : null;
      };
      const timeline = gsap.timeline({ onComplete: complete });
      timeline
        .fromTo(
          ".intro-beam",
          { scaleX: 0, opacity: 0 },
          { scaleX: 1, opacity: 1, duration: 0.55, ease: "power3.out" },
          0.12,
        )
        .to(
          ".intro-beam",
          { scaleY: 18, opacity: 0, duration: 0.7, ease: "power2.inOut" },
          0.6,
        )
        .fromTo(
          title,
          { opacity: 0, rotationX: 65, rotationY: -12, scale: 0.88, y: 32 },
          {
            opacity: 1,
            rotationX: 0,
            rotationY: 0,
            scale: 1,
            y: 0,
            duration: 1.15,
            ease: "power3.out",
          },
          0.55,
        )
        .fromTo(
          ".intro-spark",
          { opacity: 0, y: 18 },
          {
            opacity: 0.5,
            y: -25,
            stagger: 0.04,
            duration: 1.1,
            ease: "sine.out",
          },
          0.65,
        )
        .to(
          ".intro-wordmark",
          { backgroundPosition: "110% 50%", duration: 1.2, ease: "sine.inOut" },
          0.85,
        )
        .to(
          ".intro-wash",
          { scaleY: 1, duration: 0.9, ease: "power3.inOut" },
          2.1,
        )
        .to(
          ".intro-spark, .intro-caption, .intro-skip",
          { opacity: 0, duration: 0.3 },
          2.1,
        )
        .to(
          title,
          {
            x: () => {
              const r = destination();
              return r ? r.left + r.width / 2 - window.innerWidth / 2 : 0;
            },
            y: () => {
              const r = destination();
              return r ? r.top + r.height / 2 - window.innerHeight / 2 : -100;
            },
            scale: () => {
              const r = destination();
              return r ? r.width / (title as HTMLElement).offsetWidth : 1;
            },
            color: "#111111",
            textShadow: "0px 0px 0px transparent",
            duration: 0.9,
            ease: "power3.inOut",
          },
          2.18,
        )
        .to(title, { opacity: 0, duration: 0.18 }, 3.05)
        .to(root.current, { opacity: 0, duration: 0.15 }, 3.12);
    }, root);
    return () => {
      const focusedIntro = root.current?.contains(document.activeElement);
      clearTimeout(watchdog);
      context.revert();
      media.removeEventListener("change", stopForReducedMotion);
      document.removeEventListener("keydown", onKey);
      if (shell) shell.inert = previousInert;
      document.body.style.overflow = oldOverflow;
      if (focusedIntro || document.activeElement === document.body) {
        const heading = document.querySelector<HTMLElement>("h1");
        (heading || previousFocus)?.focus({ preventScroll: true });
      }
    };
  }, [active, complete]);

  if (!active) return null;
  return (
    <div
      className="brand-intro"
      ref={root}
      role="dialog"
      aria-modal="true"
      aria-label={`Introdução de ${name}`}
    >
      <div className="intro-wash" aria-hidden="true" />
      <div className="intro-beam" aria-hidden="true" />
      <div className="intro-atmosphere" aria-hidden="true">
        {Array.from({ length: 8 }, (_, i) => (
          <span
            className="intro-spark"
            key={i}
            style={{ left: `${14 + i * 10}%`, top: `${35 + (i % 3) * 12}%` }}
          />
        ))}
      </div>
      <div className="intro-wordmark" aria-hidden="true">
        {name}
      </div>
      <p className="intro-caption">A ARTE ESTÁ NO DETALHE.</p>
      <button ref={skip} className="intro-skip" onClick={complete}>
        Pular introdução <span aria-hidden="true">↗</span>
      </button>
    </div>
  );
}
