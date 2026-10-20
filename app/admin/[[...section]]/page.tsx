import Admin from "@/components/admin";
export const metadata = {
  title: "Área administrativa",
  robots: { index: false, follow: false },
};
export default function Page() {
  return (
    <main id="conteudo" className="page-shell">
      <div className="page-intro">
        <span className="eyebrow">BARBER STUDIO / ÁREA RESTRITA</span>
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
