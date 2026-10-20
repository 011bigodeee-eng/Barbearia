import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "./chrome";
import EditorialPhoto from "./editorial-photo";
import { photos } from "@/lib/content";
export default function TeamEditorial() {
  return (
    <div className="artists-grid">
      {[
        {
          n: "01",
          name: "O OLHAR.",
          photo: photos.hero,
          text: "Forma, proporção e personalidade.",
        },
        {
          n: "02",
          name: "O GESTO.",
          photo: photos.detail,
          text: "Técnica, textura e precisão.",
        },
      ].map((p, i) => (
        <Reveal className={`artist artist-${i}`} key={p.n}>
          <Link href="/profissionais" data-cursor="VER MAIS">
            <div className="artist-portrait">
              <EditorialPhoto
                src={p.photo}
                alt="Imagem editorial ilustrativa do ofício. Não representa um membro real da equipe."
              />
              <span className="artist-number">{p.n}</span>
            </div>
            <div className="artist-title">
              <h3>{p.name}</h3>
              <ArrowUpRight size={30} strokeWidth={1} />
            </div>
            <p>{p.text}</p>
            <span className="demo-note">
              PERFIL EDITORIAL DEMONSTRATIVO · EQUIPE A PERSONALIZAR
            </span>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}
