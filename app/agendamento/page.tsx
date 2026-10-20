import Booking from "@/components/booking";
export const metadata = { title: "Agendamento" };
export default function Page() {
  return (
    <main id="conteudo" className="page-shell">
      <div className="page-intro">
        <span className="eyebrow">SEU TEMPO. SEU RITUAL.</span>
        <h1>
          RESERVE UM
          <br />
          MOMENTO SEU.
        </h1>
        <p>
          Explore a experiência de agendamento nesta prévia interativa. Nenhuma
          reserva real será criada.
        </p>
      </div>
      <Booking />
    </main>
  );
}
