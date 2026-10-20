import Link from "next/link";
import { ArrowDown, ArrowUpRight, Plus } from "lucide-react";
import { Button, Reveal } from "@/components/chrome";
import { photos, services, money } from "@/lib/content";
import Instrument from "@/components/instrument";
export default function Home() {
  return (
    <main id="conteudo">
      <section className="hero">
        <img
          className="hero-photo"
          src={photos.hero}
          alt="Barbeiro realizando um corte com precisão"
          fetchPriority="high"
        />
        <div className="hero-shade" />
        <div className="hero-top">
          <span>THE ART OF GROOMING</span>
          <span>ESTILO. SEM EXCESSOS.</span>
        </div>
        <div className="hero-content">
          <div className="eyebrow">
            <span className="dot" /> UM NOVO OLHAR SOBRE O ESSENCIAL
          </div>
          <h1>
            <span>PRECISÃO EM</span>
            <span>
              CADA <em>DETALHE.</em>
            </span>
          </h1>
          <div className="hero-bottom">
            <p>
              Mais do que um corte.
              <br />
              Uma expressão de estilo,
              <br />
              personalidade e excelência.
            </p>
            <div className="hero-actions">
              <Button href="/agendamento">AGENDAR EXPERIÊNCIA</Button>
              <Link className="text-link" href="/servicos">
                EXPLORAR SERVIÇOS <ArrowUpRight size={15} />
              </Link>
            </div>
          </div>
        </div>
        <div className="hero-foot">
          <span>FEITO COM TEMPO. PENSADO PARA VOCÊ.</span>
          <a href="#filosofia">
            SCROLL PARA DESCOBRIR <ArrowDown size={14} />
          </a>
          <span>01 — 05</span>
        </div>
      </section>
      <div className="ticker" aria-hidden="true">
        <span>PRECISÃO</span>
        <Plus />
        <span>PERSONALIDADE</span>
        <Plus />
        <span>RITUAL</span>
        <Plus />
        <span>EXCELÊNCIA</span>
        <Plus />
        <span>PRECISÃO</span>
      </div>
      <section className="section about" id="filosofia">
        <Reveal>
          <div className="section-label">
            <span>01 / NOSSA ESSÊNCIA</span>
            <span>MENOS RUÍDO. MAIS IDENTIDADE.</span>
          </div>
          <div className="about-grid">
            <h2>
              TRADIÇÃO.
              <br />
              TÉCNICA.
              <br />
              <span>ATITUDE.</span>
            </h2>
            <div className="about-copy">
              <span className="tiny-cross">✳</span>
              <h3>Onde a tradição encontra a precisão.</h3>
              <p>
                Acreditamos no poder dos detalhes. No gesto preciso, na conversa
                sem pressa e no cuidado que transforma o cotidiano em um ritual.
              </p>
              <p>
                Um espaço para desacelerar. Um estilo que acompanha quem você é.
              </p>
              <Link className="text-link" href="/sobre">
                CONHEÇA NOSSA FILOSOFIA <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
          <div className="about-photo">
            <img
              src={photos.space}
              alt="Interior de uma barbearia com cadeiras e espelhos"
              loading="lazy"
            />
            <span>O SEU TEMPO. O NOSSO OFÍCIO.</span>
            <small>BARBER STUDIO — THE EXPERIENCE</small>
          </div>
        </Reveal>
      </section>
      <section className="section services-section">
        <Reveal>
          <div className="section-label">
            <span>02 / O NOSSO OFÍCIO</span>
            <span>CUIDADO EM SUA MELHOR FORMA</span>
          </div>
          <div className="section-heading">
            <h2>
              O ESSENCIAL.
              <br />
              <span>EXCEPCIONAL.</span>
            </h2>
            <Link className="text-link" href="/servicos">
              TODOS OS SERVIÇOS <ArrowUpRight size={16} />
            </Link>
          </div>
          <div className="service-layout">
            <div className="service-image">
              <img
                src={photos.cut}
                alt="Detalhe de um corte profissional"
                loading="lazy"
              />
              <span>
                FEITO À MÃO.
                <br />
                COM INTENÇÃO.
              </span>
            </div>
            <div>
              {[services[0], services[2], services[4]].map((s, i) => (
                <Link
                  className="service-row"
                  key={s.id}
                  href={"/agendamento?servico=" + s.id}
                >
                  <span className="service-number">0{i + 1}</span>
                  <div>
                    <h3>{s.name}</h3>
                    <p>{s.description}</p>
                    <small>
                      {s.duration} MIN · {money(s.price)}
                    </small>
                  </div>
                  <ArrowUpRight size={24} />
                </Link>
              ))}
              <p className="demo-note">
                Serviços e valores demonstrativos. Personalizáveis antes da
                publicação.
              </p>
            </div>
          </div>
        </Reveal>
      </section>
      <section className="craft">
        <div className="craft-copy">
          <span className="eyebrow">03 / A ARTE ESTÁ NO DETALHE</span>
          <h2>
            PRECISÃO
            <br />
            QUE SE
            <br />
            <em>SENTE.</em>
          </h2>
          <p>
            Instrumentos de um ofício.
            <br />
            Extensões de uma visão.
          </p>
        </div>
        <Instrument />
        <span className="craft-caption">ESTUDO DE OBJETO / NAVALHA Nº 01</span>
      </section>
      <section className="section">
        <Reveal>
          <div className="section-label">
            <span>04 / EM PERSPECTIVA</span>
            <Link href="/galeria">EXPLORAR GALERIA ↗</Link>
          </div>
          <div className="gallery-preview">
            <div>
              <img
                src={photos.detail}
                alt="Ritual de cuidado na barbearia"
                loading="lazy"
              />
              <span>01 — O RITUAL</span>
            </div>
            <div>
              <h2>
                UM ESTILO.
                <br />
                <span>SUA ASSINATURA.</span>
              </h2>
              <img
                src={photos.cut}
                alt="Acabamento de corte masculino"
                loading="lazy"
              />
              <span>02 — A EXPRESSÃO</span>
            </div>
          </div>
        </Reveal>
      </section>
      <section className="closing">
        <span>05 / SEU PRÓXIMO CAPÍTULO</span>
        <h2>
          SEU ESTILO.
          <br />
          <em>NOSSO OFÍCIO.</em>
        </h2>
        <Button href="/agendamento">RESERVE SUA EXPERIÊNCIA</Button>
        <p>Um momento para você. Um cuidado em cada detalhe.</p>
      </section>
    </main>
  );
}
