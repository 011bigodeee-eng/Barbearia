import { brand } from "@/lib/content";
export default function Loading() {
  return (
    <main id="conteudo" className="page-shell" role="status">
      <span className="eyebrow">{brand}</span>
      <h2>
        PREPARANDO
        <br />
        SEU PRÓXIMO CAPÍTULO.
      </h2>
    </main>
  );
}
