"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type Props = {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
};
export default function EditorialPhoto({
  src,
  alt,
  className = "",
  priority = false,
  sizes = "(max-width: 760px) 100vw, 50vw",
}: Props) {
  const [failed, setFailed] = useState(false);
  const image = useRef<HTMLImageElement>(null);
  useEffect(() => {
    const node = image.current;
    if (node?.complete && node.naturalWidth === 0) setFailed(true);
  }, [src]);
  useEffect(() => {
    const node = image.current;
    const hero = node?.closest(".hero");
    if (!priority || failed || !node || !hero) return;
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add(
      "(min-width: 900px) and (hover: hover) and (prefers-reduced-motion: no-preference)",
      () => {
        gsap.fromTo(
          node,
          { yPercent: -3, scale: 1.1 },
          {
            yPercent: 3,
            scale: 1.1,
            ease: "none",
            scrollTrigger: {
              trigger: hero,
              start: "top top",
              end: "bottom top",
              scrub: 0.6,
            },
          },
        );
      },
    );
    return () => media.revert();
  }, [failed, priority]);
  const variants = [480, 800, 1200, 1920]
    .map((w) => `${src.replace(/([?&])w=\d+/, `$1w=${w}`)} ${w}w`)
    .join(", ");
  return (
    <div className={`editorial-photo ${className}`}>
      {failed ? (
        <div
          className="photo-fallback"
          role="img"
          aria-label={`${alt} — imagem indisponível`}
        >
          <span className="photo-monogram" aria-hidden="true">
            /
          </span>
          <span>ESTUDO EDITORIAL</span>
          <small>Imagem ilustrativa indisponível</small>
        </div>
      ) : (
        <img
          ref={image}
          src={src}
          srcSet={variants}
          sizes={sizes}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding="async"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
