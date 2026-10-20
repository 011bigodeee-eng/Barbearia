import { notFound } from "next/navigation";
import Link from "next/link";
import { services, money, photos } from "@/lib/content";
import { Button, Reveal } from "@/components/chrome";
import Gallery from "@/components/gallery";
const titles: Record<string, string> = {
  sobre: "O CUIDADO É UM OFÍCIO.",
  servicos: "SEU ESTILO. SEU RITUAL.",
  profissionais: "TÉCNICA COM PERSONALIDADE.",
  galeria: "O DETALHE EM FOCO.",
  contato: "VAMOS CONVERSAR.",
};
export function generateStaticParams() {
  return Object.keys(titles).map((slug) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return { title: titles[slug] || "Página não encontrada" };
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!titles[slug]) notFound();
  return (
    <main id="conteudo" className="page-shell">
      <Reveal>
        <div className="page-intro">
          <span className="eyebrow">BARBER STUDIO / {slug.toUpperCase()}</span>
          <h1>{titles[slug]}</h1>
        </div>
        {slug === "servicos" && (
          <>
            <p className="notice">
              Catálogo demonstrativo. Valores e horários são ilustrativos nesta
              prévia.
            </p>
            <div className="catalog">
              {services.map((s, i) => (
                <Link
                  className="service-row"
                  href={"/agendamento?servico=" + s.id}
                  key={s.id}
                >
                  <span className="service-number">0{i + 1}</span>
                  <div>
                    <h3>{s.name}</h3>
                    <p>{s.description}</p>
                    <small>
                      {s.duration} MIN · {money(s.price)}
                    </small>
                  </div>
                  <span>↗</span>
                </Link>
              ))}
            </div>
          </>
        )}
        {slug === "sobre" && (
          <>
            <div className="about-grid">
              <img
                style={{ height: 500 }}
                src={photos.space}
                alt="Ambiente da barbearia"
              />
              <div className="about-copy">
                <h3>Onde a tradição encontra a precisão.</h3>
                <p>
                  Um conceito que valoriza o tempo, a atenção e a
                  individualidade. Cada gesto tem intenção. Cada detalhe faz
                  parte de uma experiência pessoal.
                </p>
                <p>
                  Este é um texto institucional demonstrativo, pronto para
                  receber a história real da sua barbearia.
                </p>
                <Button href="/agendamento">CONHEÇA A EXPERIÊNCIA</Button>
              </div>
            </div>
          </>
        )}
        {slug === "profissionais" && (
          <>
            <p className="copy">
              Pessoas que transformam técnica em expressão.
            </p>
            <div className="notice">
              Esta é uma prévia editorial. Os perfis serão personalizados com
              fotos, nomes e especialidades da equipe real.
            </div>
            <Button href="/agendamento">EXPLORAR AGENDAMENTO</Button>
          </>
        )}
        {slug === "galeria" && <Gallery />}
        {slug === "contato" && (
          <div className="about-grid">
            <div>
              <h3>O próximo passo começa com uma conversa.</h3>
              <p className="copy">
                Endereço, telefone, Instagram e horários aguardam cadastro.
                Nenhum endereço ou contato fictício foi publicado.
              </p>
              <Button href="/agendamento">AGENDAR EXPERIÊNCIA</Button>
            </div>
            <div className="notice">
              Para ativar WhatsApp, mapa e rotas, cadastre os dados reais do
              estabelecimento. O envio de mensagens pela plataforma oficial
              exige credenciais próprias.
            </div>
          </div>
        )}
      </Reveal>
    </main>
  );
}
