"use client";
import { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import EditorialPhoto from "./editorial-photo";
import { money, services } from "@/lib/content";
export default function ServiceCard({
  service,
  index,
  photo,
}: {
  service: (typeof services)[number];
  index: number;
  photo: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  return (
    <motion.div
      className="service-card"
      ref={ref}
      onPointerMove={(e) => {
        if (reduce || e.pointerType !== "mouse" || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        ref.current.style.setProperty(
          "--rx",
          `${(-(e.clientY - r.top - r.height / 2) / r.height) * 4}deg`,
        );
        ref.current.style.setProperty(
          "--ry",
          `${((e.clientX - r.left - r.width / 2) / r.width) * 4}deg`,
        );
      }}
      onPointerLeave={() => {
        ref.current?.style.setProperty("--rx", "0deg");
        ref.current?.style.setProperty("--ry", "0deg");
      }}
    >
      <Link
        href={`/agendamento?servico=${service.id}`}
        className="service-card-link"
      >
        <div className="service-card-photo">
          <EditorialPhoto
            src={photo}
            alt={`Imagem editorial ilustrativa de ${service.name}`}
            sizes="(max-width: 760px) 100vw, 33vw"
          />
          <span className="card-index">0{index + 1} / RITUAIS</span>
          <span className="card-arrow">
            <ArrowUpRight size={22} />
          </span>
        </div>
        <div className="service-card-info">
          <div className="card-title">
            <h3>{service.name}</h3>
            <span>{money(service.price)}</span>
          </div>
          <p>{service.description}</p>
          <div className="card-foot">
            <span>{service.duration} MINUTOS</span>
            <span>ESCOLHER EXPERIÊNCIA ↗</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
