import Link from "next/link";
import {
  ArrowDown,
  ArrowUpRight,
  Plus,
  ScanLine,
  UserRound,
  CalendarDays,
  Sparkles,
} from "lucide-react";
import { Button, Reveal } from "@/components/chrome";
import { brand, photos, services, highlights } from "@/lib/content";
import Instrument from "@/components/instrument";
import EditorialPhoto from "@/components/editorial-photo";
import ServiceCard from "@/components/service-card";
const icons = [Sparkles, UserRound, ScanLine, CalendarDays];
export default function Home() {
  return (
    <main id="conteudo">
      <section className="hero" aria-labelledby="hero-heading">
        <div className="hero-top">
          <span>ESTILO É IDENTIDADE. CUIDADO É CULTURA.</span>
          <span>
            UM NOVO OLHAR SOBRE O ESSENCIAL <span className="dot" />
          </span>
        </div>
        <div className="hero-brand" data-brand-target>
          {brand}
          <span className="brand-mark" aria-hidden="true">
            ®
          </span>
        </div>
        <div className="hero-editorial">
          <div className="hero-copy">
            <div className="eyebrow">
              <span className="mini-line" /> THE ART OF GROOMING
            </div>
            <h1 id="hero-heading" tabIndex={-1}>
              <span>SEU ESTILO.</span>
              <span>NOSSA</span>
              <span className="hero-signature">ASSINATURA.</span>
            </h1>
            <p>
              Precisão, personalidade e excelência
              <br className="desktop-break" /> em cada detalhe.
            </p>
            <div className="hero-actions">
              <Button href="/agendamento">AGENDAR MEU HORÁRIO</Button>
              <Button href="/sobre" outline>
                CONHECER A BARBEARIA
              </Button>
            </div>
            <div className="hero-coordinate">
              <span className="crosshair">+</span>
              <span>
                UM CORTE É SÓ O COMEÇO.
                <br />O RESTO É SOBRE VOCÊ.
              </span>
            </div>
          </div>
          <div className="hero-visual">
            <EditorialPhoto
              src={photos.hero}
              alt="Fotografia editorial de um barbeiro trabalhando"
              className="hero-photo"
              priority
              sizes="(max-width: 760px) 100vw, 52vw"
            />
            <div className="photo-side-label">ESTUDO Nº 01 — O OFÍCIO</div>
            <div className="hero-photo-label">
              <span>
                FEITO COM TEMPO.
                <br />
                PENSADO PARA VOCÊ.
              </span>
              <span>01 / 04</span>
            </div>
            <div className="hero-seal" aria-hidden="true">
              <span>
                O DETALHE
                <br />
                FAZ PARTE.
              </span>
              <Plus size={26} />
            </div>
          </div>
        </div>
        <div className="hero-foot">
          <span>CONCEITO EDITORIAL / PRÉVIA INTERATIVA</span>
          <a href="#filosofia">
            DESCUBRA O ESTÚDIO <ArrowDown size={14} />
          </a>
        </div>
      </section>
      <section className="section about" id="filosofia">
        <Reveal>
          <div className="section-label">
            <span>01 / A NOSSA ESSÊNCIA</span>
            <span>O CUIDADO COMO EXPRESSÃO.</span>
          </div>
          <div className="about-grid">
            <h2>
              MENOS EXCESSO.
              <br />
              MAIS <span>IDENTIDADE.</span>
            </h2>
            <div className="about-copy">
              <span className="tiny-cross" aria-hidden="true"><Plus size={36} strokeWidth={1}/></span>
              <h3>Onde a tradição encontra um novo olhar.</h3>
              <p>
                O gesto preciso. O tempo bem vivido. O cuidado que faz do
                cotidiano um ritual. Uma visão de barbearia que começa em você.
              </p>
              <Link className="text-link" href="/sobre">
                EXPLORE NOSSA FILOSOFIA <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
        </Reveal>
        <div className="essence-images">
          <Reveal className="essence-main">
            <EditorialPhoto
              src={photos.space}
              alt="Ambiente de barbearia em fotografia monocromática"
            />
            <span className="image-caption">
              01 — UM ESPAÇO PARA DESACELERAR.
            </span>
          </Reveal>
          <Reveal className="essence-detail">
            <EditorialPhoto
              src={photos.detail}
              alt="Detalhe de um ritual de cuidado masculino"
            />
            <span className="image-caption">02 — PRESENÇA EM CADA GESTO.</span>
            <p>
              Mais do que um lugar.
              <br />
              Um momento seu.
            </p>
          </Reveal>
        </div>
      </section>
      <section className="section services-section">
        <Reveal>
          <div className="section-label">
            <span>02 / ESCOLHA SEU RITUAL</span>
            <span>O ESSENCIAL. EXCEPCIONAL.</span>
          </div>
          <div className="section-heading">
            <h2>
              PRECISÃO EM
              <br />
              CADA <span>ESCOLHA.</span>
            </h2>
            <Link className="text-link" href="/servicos">
              TODOS OS SERVIÇOS <ArrowUpRight size={16} />
            </Link>
          </div>
          <div className="service-cards">
            {[services[0], services[2], services[4]].map((s, i) => (
              <ServiceCard
                key={s.id}
                service={s}
                index={i}
                photo={[photos.cut, photos.detail, photos.hero][i]}
              />
            ))}
          </div>
          <p className="demo-note">
            Curadoria demonstrativa. Serviços, valores e imagens são
            ilustrativos nesta prévia.
          </p>
        </Reveal>
      </section>
      <section className="craft">
        <div className="craft-copy">
          <span className="eyebrow">03 / MATÉRIA & PRECISÃO</span>
          <h2>
            A ARTE
            <br />
            ESTÁ NO
            <br />
            <span>DETALHE.</span>
          </h2>
          <p>
            A forma segue a intenção.
            <br />O cuidado deixa sua assinatura.
          </p>
          <Link className="text-link" href="/galeria">
            UM OLHAR MAIS PRÓXIMO <ArrowUpRight size={16} />
          </Link>
        </div>
        <Instrument />
        <span className="craft-orbit" aria-hidden="true" />
        <span className="craft-caption">
          ESTUDO TRIDIMENSIONAL / NAVALHA Nº 01
        </span>
      </section>
      <section className="section differences">
        <Reveal>
          <div className="section-label">
            <span>04 / UM NOVO PADRÃO DE CUIDADO</span>
            <span>CONCEITOS PARA A EXPERIÊNCIA DA MARCA</span>
          </div>
          <div className="section-heading">
            <h2>
              TUDO COMEÇA
              <br />
              EM <span>VOCÊ.</span>
            </h2>
            <p className="section-aside">
              Quatro pilares para uma experiência
              <br />
              com mais intenção.
            </p>
          </div>
          <div className="highlight-grid">
            {highlights.map((h, i) => {
              const Icon = icons[i];
              return (
                <Link href={h.href} className="highlight" key={h.title}>
                  <div className="highlight-top">
                    <span>0{i + 1}</span>
                    <Icon size={24} strokeWidth={1} />
                  </div>
                  <h3>{h.title}</h3>
                  <p>{h.text}</p>
                  <ArrowUpRight size={20} />
                </Link>
              );
            })}
          </div>
        </Reveal>
      </section>
      <section className="section gallery-section">
        <Reveal>
          <div className="section-label">
            <span>05 / EM PERSPECTIVA</span>
            <Link href="/galeria">EXPLORAR GALERIA ↗</Link>
          </div>
          <div className="gallery-preview">
            <div>
              <EditorialPhoto
                src={photos.detail}
                alt="Fotografia ilustrativa de cuidado com o cabelo"
              />
              <span>01 — O RITUAL</span>
            </div>
            <div>
              <h2>
                O ESTILO É SEU.
                <br />
                <span>O OLHAR, NOVO.</span>
              </h2>
              <EditorialPhoto
                src={photos.cut}
                alt="Detalhe editorial de um corte masculino"
              />
              <span>02 — A EXPRESSÃO</span>
            </div>
          </div>
        </Reveal>
      </section>
      <section className="closing">
        <span>SEU PRÓXIMO CAPÍTULO</span>
        <h2>
          VAMOS CRIAR
          <br />
          SUA <em>ASSINATURA?</em>
        </h2>
        <Button href="/agendamento">AGENDAR MEU HORÁRIO</Button>
        <p>
          Explore o agendamento demonstrativo. Seu próximo ritual começa aqui.
        </p>
        <div className="closing-watermark" aria-hidden="true">
          {brand}
        </div>
      </section>
    </main>
  );
}
