export default function sitemap() {
  return [
    "",
    "/sobre",
    "/servicos",
    "/profissionais",
    "/galeria",
    "/agendamento",
    "/contato",
  ].map((path) => ({
    url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://barbearia-five-phi.vercel.app"}${path}`,
  }));
}
