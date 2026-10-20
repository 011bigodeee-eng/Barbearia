"use client";
import Link from "next/link";
import EditorialPhoto from "./editorial-photo";
import { brand, photos } from "@/lib/content";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { ArrowUpRight, Menu, X, ArrowUp } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
const links = [
  ["Sobre", "/sobre"],
  ["Serviços", "/servicos"],
  ["Profissionais", "/profissionais"],
  ["Galeria", "/galeria"],
  ["Contato", "/contato"],
];
export function Navigation() {
  const [open, setOpen] = useState(false);
  const [menuPhoto, setMenuPhoto] = useState(photos.hero);
  const pathname = usePathname();
  const reduced = useReducedMotion();
  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement;
    const nodes = () =>
      Array.from(
        document.querySelectorAll<HTMLElement>(".menu-toggle, #mobile-menu a"),
      );
    requestAnimationFrame(() => nodes()[1]?.focus());
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "Tab") {
        const list = nodes(),
          first = list[0],
          last = list[list.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = old;
      document.removeEventListener("keydown", onKey);
      previous?.focus();
    };
  }, [open]);
  return (
    <>
      <header>
        <Link className="logo" href="/" onClick={() => setOpen(false)}>
          <span className="logo-name">{brand}</span>
          <span className="logo-sub">THE ART OF GROOMING</span>
        </Link>
        <nav aria-label="Principal">
          {links.map(([n, p]) => (
            <Link
              key={p}
              href={p}
              aria-current={pathname === p ? "page" : undefined}
            >
              {n}
            </Link>
          ))}
        </nav>
        <Link className="nav-book" href="/agendamento">
          Agendar horário <ArrowUpRight size={15} />
        </Link>
        <button
          className="menu-toggle"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </header>
      {open && (
        <motion.div
          initial={reduced ? false : { opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="mobile-menu"
          id="mobile-menu"
        >
          <nav aria-label="Navegação expandida">
            {[["Início", "/"], ...links, ["Agendamento", "/agendamento"]].map(
              ([n, p], i) => (
                <Link
                  onClick={() => setOpen(false)}
                  key={p}
                  href={p}
                  onPointerEnter={() =>
                    setMenuPhoto(
                      [photos.hero, photos.space, photos.cut, photos.detail][
                        i % 4
                      ],
                    )
                  }
                  onFocus={() =>
                    setMenuPhoto(
                      [photos.hero, photos.space, photos.cut, photos.detail][
                        i % 4
                      ],
                    )
                  }
                  aria-current={pathname === p ? "page" : undefined}
                  style={{ animationDelay: `${i * 35}ms` }}
                >
                  <small>0{i + 1}</small>
                  {n}
                  <ArrowUpRight />
                </Link>
              ),
            )}
          </nav>
          <div className="menu-editorial-image">
            <EditorialPhoto
              key={menuPhoto}
              src={menuPhoto}
              alt="Imagem ilustrativa da experiência editorial"
            />
            <span>O SEU TEMPO. O NOSSO OFÍCIO.</span>
          </div>
        </motion.div>
      )}
    </>
  );
}
export function Button({
  children,
  href,
  outline = false,
}: {
  children: React.ReactNode;
  href: string;
  outline?: boolean;
}) {
  const reduce = useReducedMotion();
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  return (
    <motion.div
      className="magnetic"
      animate={offset}
      transition={{ type: "spring", stiffness: 180, damping: 19 }}
      onPointerMove={(e) => {
        if (reduce || e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        setOffset({
          x: (e.clientX - r.left - r.width / 2) * 0.12,
          y: (e.clientY - r.top - r.height / 2) * 0.15,
        });
      }}
      onPointerLeave={() => setOffset({ x: 0, y: 0 })}
    >
      <Link className={"button " + (outline ? "outline" : "")} href={href}>
        {children}
        <ArrowUpRight size={18} />
      </Link>
    </motion.div>
  );
}
export function Reveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={`reveal ${className}`}
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: "some", margin: "0px 0px -40px 0px" }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
export function Footer() {
  return (
    <footer className="cinematic-footer">
      <Reveal>
        <div className="section-label">
          <span>O PRÓXIMO CAPÍTULO É SEU.</span>
          <span>THE ART OF GROOMING</span>
        </div>
        <div className="footer-invitation">
          <h2>
            SEU PRÓXIMO ESTILO
            <br />
            <span>COMEÇA AQUI.</span>
          </h2>
          <Button href="/agendamento">AGENDAR AGORA</Button>
        </div>
        <div className="footer-contact">
          <Link href="/contato">
            CONTATO & LOCALIZAÇÃO <ArrowUpRight size={16} />
          </Link>
          <p>
            Contatos, endereço e redes sociais
            <br />
            aguardam os dados reais da barbearia.
          </p>
          <Link href="/galeria">
            UM NOVO OLHAR <ArrowUpRight size={16} />
          </Link>
        </div>
      </Reveal>
      <Reveal className="footer-wordmark">
        <Link href="/" aria-label={brand}>
          {brand}
        </Link>
      </Reveal>
      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()} {brand}
        </span>
        <span>PRÉVIA INTERATIVA · CONTEÚDO DEMONSTRATIVO</span>
        <a href="#conteudo" aria-label="Voltar ao conteúdo">
          VOLTAR AO TOPO <ArrowUp size={12} />
        </a>
      </div>
    </footer>
  );
}
