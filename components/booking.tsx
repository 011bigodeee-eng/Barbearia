"use client";
import { useEffect, useState } from "react";
import { services, money } from "@/lib/content";
const professionals = ["Profissional 01", "Profissional 02"];
const slots = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"];
export default function Booking() {
  const [service, setService] = useState(services[0].id);
  const [professional, setProfessional] = useState(professionals[0]);
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState("");
  const [done, setDone] = useState(false);
  useEffect(() => {
    const selected = new URLSearchParams(location.search).get("servico");
    if (services.some((s) => s.id === selected)) setService(selected!);
  }, []);
  const selected = services.find((s) => s.id === service)!;
  if (done)
    return (
      <div className="form-card" role="status">
        <span className="eyebrow">PRÉVIA INTERATIVA</span>
        <h2>
          SEU ESTILO.
          <br />
          SEU MOMENTO.
        </h2>
        <p className="copy">Assim será o resumo da experiência escolhida.</p>
        <div className="notice">
          {selected.name} · {professional}
          <br />
          {date.split("-").reverse().join("/")} às {slot}
          <br />
          {selected.duration} min · {money(selected.price)}
        </div>
        <p className="status">
          Simulação concluída. Nenhuma reserva foi criada e nenhum dado foi
          enviado.
        </p>
        <button type="button" onClick={() => setDone(false)}>
          EXPLORAR OUTRA EXPERIÊNCIA ↗
        </button>
      </div>
    );
  return (
    <form
      className="form-card"
      onSubmit={(e) => {
        e.preventDefault();
        setDone(true);
      }}
    >
      <span className="eyebrow">PRÉVIA INTERATIVA / SEM RESERVAS REAIS</span>
      <h3>Experimente seu próximo ritual.</h3>
      <p className="copy">
        Explore o visual do agendamento. Os profissionais, preços e horários são
        ilustrativos.
      </p>
      <label className="field">
        Serviço
        <select value={service} onChange={(e) => setService(e.target.value)}>
          {services.map((s) => (
            <option value={s.id} key={s.id}>
              {s.name} · {s.duration} min · {money(s.price)}
            </option>
          ))}
        </select>
      </label>
      <div className="form-grid">
        <label className="field">
          Profissional demonstrativo
          <select
            value={professional}
            onChange={(e) => setProfessional(e.target.value)}
          >
            {professionals.map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>
        </label>
        <label className="field">
          Data
          <input
            type="date"
            required
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
              setSlot("");
            }}
          />
        </label>
      </div>
      <label className="field">
        Horário ilustrativo
        <select required value={slot} onChange={(e) => setSlot(e.target.value)}>
          <option value="">Escolha um horário</option>
          {slots.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </label>
      <p className="copy">
        {selected.name} · {selected.duration} min · {money(selected.price)}
      </p>
      <button type="submit">VISUALIZAR EXPERIÊNCIA ↗</button>
      <p className="demo-note">
        Esta é uma prévia de design. Não solicitamos dados pessoais nem
        recebemos agendamentos.
      </p>
    </form>
  );
}
