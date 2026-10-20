"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import EditorialPhoto from "./editorial-photo";
import { services, money, photos } from "@/lib/content";
const professionals = ["Profissional 01", "Profissional 02"];
const slots = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"];
const steps = ["Serviço", "Profissional", "Data & hora", "Resumo"];
export default function Booking() {
  const [service, setService] = useState(services[0].id);
  const [professional, setProfessional] = useState(professionals[0]);
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState("");
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const previousStep = useRef(0);
  const reduced = useReducedMotion();
  useEffect(() => {
    const selected = new URLSearchParams(location.search).get("servico");
    if (services.some((s) => s.id === selected)) setService(selected!);
  }, []);
  useEffect(() => {
    if (previousStep.current !== step) {
      heading.current?.focus({ preventScroll: true });
      previousStep.current = step;
    }
  }, [step]);
  const selected = services.find((s) => s.id === service)!;
  const dateText = date ? date.split("-").reverse().join("/") : "A escolher";
  const summary = (
    <dl>
      <div>
        <dt>Ritual</dt>
        <dd>{selected.name}</dd>
      </div>
      <div>
        <dt>Profissional</dt>
        <dd>{professional}</dd>
      </div>
      <div>
        <dt>Data</dt>
        <dd>{dateText}</dd>
      </div>
      <div>
        <dt>Horário</dt>
        <dd>{slot || "A escolher"}</dd>
      </div>
      <div>
        <dt>Duração</dt>
        <dd>{selected.duration} minutos</dd>
      </div>
      <div>
        <dt>Valor ilustrativo</dt>
        <dd className="summary-price">{money(selected.price)}</dd>
      </div>
    </dl>
  );
  if (done)
    return (
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="form-card"
        role="status"
      >
        <div className="booking-success-mark">
          <Check size={26} strokeWidth={1} />
        </div>
        <span className="eyebrow">PRÉVIA INTERATIVA</span>
        <h2>
          ESTILO RESERVADO.
          <br />
          NOS VEMOS EM BREVE.
        </h2>
        <p className="copy">Assim será o resumo da experiência escolhida.</p>
        <div className="booking-aside">{summary}</div>
        <p className="status" style={{ margin: "25px 0" }}>
          Simulação concluída. Nenhuma reserva foi criada e nenhum dado foi
          enviado.
        </p>
        <button
          type="button"
          onClick={() => {
            setDone(false);
            setStep(0);
          }}
        >
          EXPLORAR OUTRA EXPERIÊNCIA ↗
        </button>
      </motion.div>
    );
  return (
    <div className="booking-layout">
      <form
        className="form-card"
        onSubmit={(e) => {
          e.preventDefault();
          if (step < 3) setStep(step + 1);
          else if (date && slot) setDone(true);
        }}
      >
        <span className="eyebrow">PRÉVIA INTERATIVA / SEM RESERVAS REAIS</span>
        <ol className="booking-steps" aria-label="Etapas do agendamento">
          {steps.map((s, i) => (
            <li
              key={s}
              aria-current={step === i ? "step" : undefined}
              className={step > i ? "completed" : ""}
            >
              <span>{step > i ? "✓" : `0${i + 1}`}</span>
              {s}
            </li>
          ))}
        </ol>
        <h3 ref={heading} tabIndex={-1}>
          {
            [
              "Escolha seu ritual.",
              "O cuidado é pessoal.",
              "Um momento para você.",
              "Sua experiência, em detalhes.",
            ][step]
          }
        </h3>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            className="booking-pane"
            key={step}
            initial={reduced ? false : { opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduced ? undefined : { opacity: 0, x: -8 }}
            transition={{ duration: 0.18 }}
          >
            {step === 0 && (
              <>
                <p className="copy">
                  Cada escolha, uma expressão de estilo. Valores demonstrativos.
                </p>
                <label className="field">
                  Serviço
                  <select
                    aria-label="Serviço"
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                  >
                    {services.map((s) => (
                      <option value={s.id} key={s.id}>
                        {s.name} · {s.duration} min · {money(s.price)}
                      </option>
                    ))}
                  </select>
                </label>
                <p className="copy">{selected.description}</p>
              </>
            )}
            {step === 1 && (
              <>
                <p className="copy">
                  Perfis ilustrativos. A equipe real será apresentada na versão
                  final.
                </p>
                <div className="booking-professional-photo">
                  <EditorialPhoto
                    src={
                      professional === professionals[0]
                        ? photos.hero
                        : photos.detail
                    }
                    alt="Foto ilustrativa, não representa um profissional cadastrado"
                    sizes="400px"
                  />
                </div>
                <label className="field">
                  Profissional demonstrativo
                  <select
                    aria-label="Profissional demonstrativo"
                    value={professional}
                    onChange={(e) => setProfessional(e.target.value)}
                  >
                    {professionals.map((p) => (
                      <option key={p}>{p}</option>
                    ))}
                  </select>
                </label>
                <div className="notice">
                  Atendimento com atenção, do primeiro gesto ao acabamento.
                  Conceito editorial da experiência.
                </div>
              </>
            )}
            {step === 2 && (
              <>
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
                <fieldset>
                  <legend>Horário ilustrativo</legend>
                  <div className="slot-grid">
                    {slots.map((s) => (
                      <button
                        className="slot-button"
                        key={s}
                        type="button"
                        aria-pressed={slot === s}
                        onClick={() => setSlot(s)}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </fieldset>
                <p className="demo-note">
                  Todos os horários são demonstrativos. Não representam
                  disponibilidade real.
                </p>
              </>
            )}
            {step === 3 && (
              <>
                <p className="copy">
                  Revise sua seleção. Esta experiência é uma demonstração de
                  interface e não solicita dados pessoais.
                </p>
                <div className="notice">
                  {selected.name}
                  <br />
                  {professional}
                  <br />
                  {dateText} às {slot}
                  <br />
                  {selected.duration} minutos · {money(selected.price)}
                </div>
              </>
            )}
          </motion.div>
        </AnimatePresence>
        <div className="booking-actions">
          {step > 0 ? (
            <button
              className="booking-back"
              type="button"
              onClick={() => setStep(step - 1)}
            >
              <ArrowLeft
                size={13}
                style={{ display: "inline", marginRight: 8 }}
              />{" "}
              VOLTAR
            </button>
          ) : (
            <span className="demo-note">01 / 04</span>
          )}
          <button type="submit" disabled={step === 2 && (!date || !slot)}>
            {step === 3 ? "VISUALIZAR EXPERIÊNCIA" : "CONTINUAR"}{" "}
            <ArrowUpRight
              size={14}
              style={{ display: "inline", marginLeft: 15 }}
            />
          </button>
        </div>
        <p className="demo-note">
          Esta é uma prévia de design. Não solicitamos dados pessoais nem
          recebemos agendamentos.
        </p>
      </form>
      <aside className="booking-aside">
        <span className="eyebrow">SUA EXPERIÊNCIA</span>
        <h3>
          O essencial.
          <br />
          Pensado para você.
        </h3>
        {summary}
        <p className="demo-note">Prévia interativa · Sem reservas reais.</p>
      </aside>
    </div>
  );
}
