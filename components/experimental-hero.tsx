"use client";
import { useEffect, useRef } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import KineticBrand from "./kinetic-brand";
import EditorialPhoto from "./editorial-photo";
import { Button } from "./chrome";
import { brand, photos } from "@/lib/content";
export default function ExperimentalHero() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add(
      "(min-width: 900px) and (prefers-reduced-motion: no-preference)",
      () => {
        const section = ref.current!;
        const image = section.querySelector(".hero-film");
        gsap.fromTo(
          image,
          { clipPath: "inset(0 21% 0 21%)" },
          {
            clipPath: "inset(0 0% 0 0%)",
            ease: "none",
            scrollTrigger: {
              trigger: image,
              start: "top 75%",
              end: "center 35%",
              scrub: 0.8,
            },
          },
        );
        gsap.fromTo(
          ".manifesto-word",
          { opacity: 0.22 },
          {
            opacity: 1,
            stagger: 0.08,
            ease: "none",
            scrollTrigger: {
              trigger: ".hero-manifesto",
              start: "top 90%",
              end: "bottom 55%",
              scrub: 0.5,
            },
          },
        );
        return () => {};
      },
    );
    return () => media.revert();
  }, []);
  return (
    <section
      className="hero experimental-hero"
      ref={ref}
      aria-labelledby="hero-heading"
    >
      <div className="hero-top">
        <span>THE ART OF GROOMING — DIGITAL EXPERIENCE</span>
        <span>
          ESTUDO EDITORIAL / Nº 001 <span className="dot" />
        </span>
      </div>
      <KineticBrand name={brand} />
      <div className="hero-subline">
        <span>
          ESTILO NÃO SE EXPLICA.
          <br />
          SE EXPRESSA.
        </span>
        <span className="hero-edition">
          PRECISÃO / PERSONALIDADE / PRESENÇA
        </span>
        <a href="#identidade" aria-label="Explorar os capítulos">
          <ArrowDown size={20} strokeWidth={1} />
        </a>
      </div>
      <div className="hero-film" data-cursor="EXPLORAR">
        <EditorialPhoto
          src={photos.hero}
          alt="Fotografia editorial monocromática de um barbeiro trabalhando"
          priority
          className="hero-photo"
          sizes="100vw"
        />
        <span className="film-top">UM OFÍCIO. INFINITAS POSSIBILIDADES.</span>
        <span className="film-word" aria-hidden="true">
          O GESTO.
        </span>
        <div className="film-bottom">
          <span>THE HUMAN SIDE OF PRECISION</span>
          <span>01 / 05</span>
        </div>
        <a
          className="film-cta"
          href="/agendamento"
          aria-label="Reserve sua experiência"
        >
          <ArrowUpRight size={28} strokeWidth={1} />
        </a>
      </div>
      <div className="hero-manifesto">
        <span className="eyebrow">NÃO É SÓ SOBRE CABELO.</span>
        <h1 id="hero-heading" tabIndex={-1}>
          {["PRECISÃO", "NÃO É", "UM DETALHE.", "É A NOSSA", "IDENTIDADE."].map(
            (word, i) => (
              <span className={"manifesto-word word-" + i} key={word}>
                {word}{" "}
              </span>
            ),
          )}
        </h1>
        <div className="manifesto-bottom">
          <p>
            Técnica que respeita quem você é.
            <br />
            Cuidado que deixa sua assinatura.
          </p>
          <Button href="/agendamento">RESERVE SUA EXPERIÊNCIA</Button>
          <span className="manifesto-index">01—05</span>
        </div>
      </div>
    </section>
  );
}
