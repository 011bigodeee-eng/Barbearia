"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "motion/react";
import { money, photos, services } from "@/lib/content";
import EditorialPhoto from "./editorial-photo";
export default function ServiceList({
  items = services,
}: {
  items?: typeof services;
}) {
  const [selected, setSelected] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const x = useMotionValue(0),
    y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 130, damping: 24 }),
    sy = useSpring(y, { stiffness: 130, damping: 24 });
  return (
    <div
      className="service-editorial"
      ref={ref}
      onPointerMove={(e) => {
        if (reduced || e.pointerType !== "mouse") return;
        const r = ref.current!.getBoundingClientRect();
        x.set(Math.min(Math.max(e.clientX - r.left, 160), r.width - 180));
        y.set(e.clientY - r.top);
      }}
      onPointerLeave={() => setSelected(null)}
    >
      <div className="service-list">
        {items.map((s, i) => (
          <Link
            key={s.id}
            className="editorial-service-row"
            href={`/agendamento?servico=${s.id}`}
            data-cursor="VER MAIS"
            onPointerEnter={(e) => {
              if (!reduced && e.pointerType === "mouse") setSelected(i);
            }}
            onFocus={() => setSelected(null)}
          >
            <div className="service-mobile-photo">
              <EditorialPhoto
                src={
                  [photos.cut, photos.detail, photos.hero, photos.space][i % 4]
                }
                alt={`Fotografia ilustrativa de ${s.name}`}
                sizes="100vw"
              />
            </div>
            <span className="service-order">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="editorial-service-name">
              <h3>{s.name}</h3>
              <p>{s.description}</p>
            </div>
            <span className="service-meta">
              {s.duration} MIN<span>{money(s.price)}</span>
            </span>
            <ArrowUpRight
              className="service-row-arrow"
              size={30}
              strokeWidth={1}
            />
          </Link>
        ))}
      </div>
      <motion.div
        className="service-follow-photo"
        aria-hidden="true"
        style={{
          x: sx,
          y: sy,
          opacity: selected === null ? 0 : 1,
          rotate: selected === null ? 0 : -7,
        }}
      >
        {selected !== null && (
          <EditorialPhoto
            key={selected}
            src={
              [photos.cut, photos.detail, photos.hero, photos.space][
                selected % 4
              ]
            }
            alt=""
            sizes="300px"
          />
        )}
      </motion.div>
    </div>
  );
}
