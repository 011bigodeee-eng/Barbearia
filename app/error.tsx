"use client";
export default function Error({ reset }: { reset: () => void }) {
  return (
    <main id="conteudo" className="page-shell">
      <h1>
        UMA PAUSA
        <br />
        INESPERADA.
      </h1>
      <button className="button" onClick={reset}>
        TENTAR NOVAMENTE
      </button>
    </main>
  );
}
