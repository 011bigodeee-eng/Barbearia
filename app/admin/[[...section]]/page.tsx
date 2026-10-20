import { brand } from "@/lib/content";
import Admin from "@/components/admin";
export const metadata = {
  title: "Área administrativa",
  robots: { index: false, follow: false },
};
export default function Page() {
  return (
    <main id="conteudo" className="page-shell">
      <div className="page-intro">
        <span className="eyebrow">{brand} / PRÉVIA DO PAINEL</span>
        <h1>
          SEU ESTÚDIO.
          <br />
          EM PERSPECTIVA.
        </h1>
      </div>
      <Admin />
    </main>
  );
}
