import Link from "next/link";
import { ArrowUpRight, Plus } from "lucide-react";
import { Reveal, Button } from "@/components/chrome";
import { photos, services } from "@/lib/content";
import ExperimentalHero from "@/components/experimental-hero";
import Instrument from "@/components/instrument";
import EditorialPhoto from "@/components/editorial-photo";
import ServiceList from "@/components/service-list";
import TeamEditorial from "@/components/team-editorial";
export default function Home() {
  return (
    <main id="conteudo">
      <ExperimentalHero />
      <section className="section identity-chapter" id="identidade">
        <Reveal>
          <div className="section-label">
            <span>CAPÍTULO 01 / A IDENTIDADE</span>
            <span>O ESSENCIAL NÃO PRECISA DE EXCESSOS.</span>
          </div>
          <div className="identity-composition">
            <h2>
              O ESTILO
              <br />É SEU.
              <span className="identity-indent">
                O OLHAR,
                <br />
                SEMPRE NOVO.
              </span>
            </h2>
            <div className="identity-note">
              <Plus size={35} strokeWidth={1} />
              <p>
                Não seguimos uma fórmula.
                <br />
                Seguimos a sua identidade.
              </p>
              <p className="copy">
                Um conceito de cuidado que valoriza o gesto preciso, o tempo e a
                liberdade de ser quem você é.
              </p>
              <Link className="text-link" href="/sobre">
                A FILOSOFIA <ArrowUpRight size={17} />
              </Link>
            </div>
          </div>
        </Reveal>
        <div className="identity-image" data-cursor="EXPLORAR">
          <EditorialPhoto
            src={photos.space}
            alt="Ambiente de barbearia em fotografia editorial ilustrativa"
          />
          <span className="image-caption">UM ESPAÇO PARA ESTAR PRESENTE.</span>
        </div>
      </section>
      <section className="precision-chapter" id="precisao">
        <div className="section-label">
          <span>CAPÍTULO 02 / A PRECISÃO</span>
          <span>ESTUDO DE OBJETO Nº 02</span>
        </div>
        <Instrument />
      </section>
      <section className="section artists-chapter" id="artistas">
        <Reveal>
          <div className="section-label">
            <span>CAPÍTULO 03 / OS ARTISTAS</span>
            <span>O LADO HUMANO DA TÉCNICA.</span>
          </div>
          <div className="section-heading">
            <h2>
              MÃOS QUE
              <br />
              CRIAM <span>IDENTIDADE.</span>
            </h2>
            <Link className="text-link" href="/profissionais">
              CONHEÇA A PROPOSTA DA EQUIPE <ArrowUpRight size={17} />
            </Link>
          </div>
        </Reveal>
        <TeamEditorial />
      </section>
      <section className="section experience-chapter" id="experiencia">
        <Reveal>
          <div className="section-label">
            <span>CAPÍTULO 04 / A EXPERIÊNCIA</span>
            <span>ESCOLHA SEU RITUAL.</span>
          </div>
          <div className="section-heading">
            <h2>
              SEU TEMPO.
              <br />
              <span>SEU RITUAL.</span>
            </h2>
            <p className="section-aside">
              O cuidado começa na escolha.
              <br />
              Explore cada experiência.
            </p>
          </div>
        </Reveal>
        <ServiceList
          items={[services[0], services[1], services[3], services[4]]}
        />
        <div className="services-ending">
          <p className="demo-note">
            Serviços, preços e imagens ilustrativos nesta prévia.
          </p>
          <Link className="text-link" href="/servicos">
            O CATÁLOGO COMPLETO <ArrowUpRight size={17} />
          </Link>
        </div>
      </section>
      <section className="section exhibition-chapter">
        <Reveal>
          <div className="section-label">
            <span>EM EXPOSIÇÃO / A GALERIA</span>
            <Link href="/galeria">ENTRAR NA GALERIA ↗</Link>
          </div>
          <div className="exhibition-heading">
            <h2>
              O DETALHE.
              <br />
              <span>EM OUTRA ESCALA.</span>
            </h2>
            <span className="exhibition-star" aria-hidden="true">
              <Plus size={64} strokeWidth={0.75} />
            </span>
          </div>
          <Link
            className="exhibition-cover"
            href="/galeria"
            data-cursor="EXPLORAR"
          >
            <EditorialPhoto
              src={photos.cut}
              alt="Estudo editorial de um corte masculino"
              sizes="100vw"
            />
            <span>O OFÍCIO EM PERSPECTIVA.</span>
            <ArrowUpRight size={40} strokeWidth={1} />
          </Link>
        </Reveal>
      </section>
      <section className="section next-chapter">
        <Reveal>
          <div className="section-label">
            <span>CAPÍTULO 05 / SEU PRÓXIMO CORTE</span>
            <span>UM MOMENTO QUE É SÓ SEU.</span>
          </div>
          <div className="next-composition">
            <span className="next-number" aria-hidden="true">
              05
            </span>
            <div>
              <h2>
                MENOS ESPERA.
                <br />
                MAIS <span>PRESENÇA.</span>
              </h2>
              <p className="copy">
                Serviço. Profissional. Data. Seu horário.
                <br />
                Explore o agendamento em poucos passos.
              </p>
              <Button href="/agendamento">RESERVE SUA EXPERIÊNCIA</Button>
              <p className="demo-note">
                Agendamento demonstrativo. Nenhuma reserva real será criada.
              </p>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
