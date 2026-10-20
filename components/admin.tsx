"use client";
import { useState } from "react";
import { services, money } from "@/lib/content";
export default function Admin() {
  const [tab, setTab] = useState("Visão geral");
  return (
    <>
      <div className="notice">
        PRÉVIA DO PAINEL — Dados ilustrativos. Sem autenticação, reservas reais
        ou conexão com banco de dados.
      </div>
      <nav className="filters" aria-label="Prévia administrativa">
        {["Visão geral", "Agendamentos", "Serviços", "Profissionais"].map(
          (t) => (
            <button key={t} aria-pressed={tab === t} onClick={() => setTab(t)}>
              {t}
            </button>
          ),
        )}
      </nav>
      {tab === "Visão geral" && (
        <>
          <div className="preview-stats">
            {[
              ["08", "ATENDIMENTOS DO DIA"],
              ["32", "NESTA SEMANA"],
              ["76%", "OCUPAÇÃO ILUSTRATIVA"],
            ].map(([n, t]) => (
              <div key={t}>
                <span className="eyebrow">{t}</span>
                <h2>{n}</h2>
              </div>
            ))}
          </div>
          <p className="copy">
            Um olhar claro sobre o dia. Uma interface pensada para manter o foco
            no seu ofício.
          </p>
        </>
      )}
      {tab === "Agendamentos" &&
        ["09:00", "10:00", "14:00"].map((h, i) => (
          <div className="service-row" key={h}>
            <span className="service-number">{h}</span>
            <div>
              <h3>Cliente demonstrativo {i + 1}</h3>
              <p>{services[i].name} · Profissional 01</p>
              <small>EXEMPLO DE AGENDAMENTO</small>
            </div>
          </div>
        ))}
      {tab === "Serviços" &&
        services.map((s) => (
          <div className="service-row" key={s.id}>
            <div>
              <h3>{s.name}</h3>
              <p>
                {s.duration} min · {money(s.price)} · valor demonstrativo
              </p>
            </div>
          </div>
        ))}
      {tab === "Profissionais" &&
        ["01", "02"].map((n) => (
          <div className="service-row" key={n}>
            <div>
              <h3>Profissional {n}</h3>
              <p>Perfil demonstrativo · Especialidade personalizável</p>
            </div>
          </div>
        ))}
    </>
  );
}
