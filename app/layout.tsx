import Progress from "@/components/progress";
import type { Metadata } from "next";
import "@fontsource/manrope/400.css";
import "@fontsource/manrope/500.css";
import "@fontsource/manrope/600.css";
import "@fontsource/manrope/800.css";
import "./globals.css";
import { Navigation, Footer } from "@/components/chrome";
export const metadata: Metadata = {
  title: {
    default: "BARBER STUDIO — Precisão em cada detalhe",
    template: "%s — BARBER STUDIO",
  },
  description:
    "Um novo olhar sobre o cuidado masculino. Técnica, tempo e personalidade.",
  robots: { index: true, follow: true },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <a className="skip" href="#conteudo">
          Pular para o conteúdo
        </a>
        <Progress />
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}
