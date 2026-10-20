import InteractiveCursor from "@/components/interactive-cursor";
import { introBootstrap } from "@/lib/intro-bootstrap";
import BrandIntro from "@/components/intro";
import { brand } from "@/lib/content";
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
    default: `${brand} — Seu estilo. Nossa assinatura.`,
    template: `%s — ${brand}`,
  },
  description:
    "Um novo olhar sobre o cuidado masculino. Técnica, tempo e personalidade.",
  robots: { index: true, follow: true },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: introBootstrap }} />
      </head>
      <body>
        <a className="skip" href="#conteudo">
          Pular para o conteúdo
        </a>
        <Progress />
        <InteractiveCursor />
        <BrandIntro name={brand} />
        <div id="site-shell">
          <Navigation />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
