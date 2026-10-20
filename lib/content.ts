export const brand = "BARBER STUDIO";
export const services = [
  {
    id: "corte",
    name: "Corte de assinatura",
    description:
      "Técnica, proporção e personalidade. Um corte pensado para você.",
    duration: 45,
    price: 90,
  },
  {
    id: "degrade",
    name: "Degradê",
    description: "Transições impecáveis. Acabamento preciso em cada ângulo.",
    duration: 45,
    price: 90,
  },
  {
    id: "barba",
    name: "Barba tradicional",
    description: "Navalha, toalha quente e um ritual que merece tempo.",
    duration: 30,
    price: 65,
  },
  {
    id: "premium",
    name: "Barba premium",
    description: "Desenho, tratamento e acabamento em um ritual completo.",
    duration: 45,
    price: 85,
  },
  {
    id: "combo",
    name: "Corte & barba",
    description:
      "O encontro entre cuidado e expressão. A experiência completa.",
    duration: 75,
    price: 145,
  },
  {
    id: "sobrancelha",
    name: "Sobrancelha",
    description: "Pequenos detalhes. Uma diferença singular.",
    duration: 15,
    price: 25,
  },
  {
    id: "pigmentacao",
    name: "Pigmentação",
    description: "Definição sutil, respeitando a sua identidade.",
    duration: 45,
    price: 80,
  },
  {
    id: "tratamento",
    name: "Tratamento capilar",
    description: "Cuidado profundo para renovar textura e vitalidade.",
    duration: 30,
    price: 70,
  },
];
export const photos = {
  hero: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1920&q=85",
  space:
    "https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=1000&q=80",
  cut: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=1000&q=80",
  detail:
    "https://images.unsplash.com/photo-1622287162716-f311baa1a2b8?auto=format&fit=crop&w=1000&q=80",
};
export const money = (n: number) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(n);
