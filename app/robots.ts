export default function robots() {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/admin", "/api/"] },
    sitemap: `${process.env.NEXT_PUBLIC_SITE_URL || "https://barbearia-five-phi.vercel.app"}/sitemap.xml`,
  };
}
