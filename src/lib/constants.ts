import {
  UserPlus,
  Share2,
  BarChart3,
  Banknote,
  DollarSign,
  Clock,
  Shield,
  Infinity,
  Users,
  Smartphone,
  type LucideIcon,
} from "lucide-react";

export const NAV_LINKS = [
  { label: "Inicio", href: "#inicio" },
  { label: "Cómo funciona", href: "#como-funciona" },
  { label: "El app", href: "#el-app" },
  { label: "Simulador", href: "#simulador" },
  { label: "Beneficios", href: "#beneficios" },
  { label: "FAQ", href: "#preguntas" },
];

export const HERO = {
  badge: "El programa de referidos #1 en leasing automotriz",
  title: "Convierte tu red de contactos en ",
  titleHighlight: "ingresos recurrentes",
  subtitle:
    "Conecta a tus clientes del sector automotriz y financiero con Pazz, el primer marketplace de arrendamiento puro en México, y recibe comisiones por cada referido exitoso.",
  primaryCta: "Regístrate gratis",
  secondaryCta: "Simular comisiones",
  stats: [
    { value: 100, prefix: "+", suffix: "", label: "Partners activos" },
    { value: 2, prefix: "$", suffix: "M+", label: "En comisiones pagadas" },
    { value: 4.8, prefix: "", suffix: "★", label: "Calificación promedio", decimals: 1 },
  ],
};

export interface Step {
  number: number;
  title: string;
  description: string;
  icon: LucideIcon;
}

export const HOW_IT_WORKS: Step[] = [
  {
    number: 1,
    title: "Regístrate",
    description:
      "Envía tu solicitud a Partner Plus, quedarás suscrito al programa en menos de 24 horas si cumples los requisitos.",
    icon: UserPlus,
  },
  {
    number: 2,
    title: "Refiere",
    description:
      "Comparte cotizaciones y enlaces de precalificación con personas interesadas en arrendamiento automotriz.",
    icon: Share2,
  },
  {
    number: 3,
    title: "Monitorea",
    description:
      "Monitorea el avance de tus referidos y acompáñalos hasta concretar su contratación de arrendamiento.",
    icon: BarChart3,
  },
  {
    number: 4,
    title: "Gana",
    description:
      "Recibe comisiones mensuales por cada contrato de arrendamiento automotriz cerrado.",
    icon: Banknote,
  },
];

export interface Benefit {
  title: string;
  description: string;
  icon: LucideIcon;
}

export const BENEFITS: Benefit[] = [
  {
    title: "Comisiones competitivas",
    description: "Gana hasta $5,000 MXN por cada arrendamiento concretado.",
    icon: DollarSign,
  },
  {
    title: "Pagos puntuales",
    description: "Recibe tus comisiones puntualmente y de forma automática.",
    icon: Clock,
  },
  {
    title: "Plataforma confiable",
    description: "Respaldado por Pazz, líder en arrendamiento digital en México.",
    icon: Shield,
  },
  {
    title: "Sin límites",
    description: "No hay límite en la cantidad de personas que puedes referir.",
    icon: Infinity,
  },
  {
    title: "Red exclusiva",
    description: "Acceso a una comunidad de partners y recursos exclusivos.",
    icon: Users,
  },
  {
    title: "App móvil",
    description: "Monitorea tus comisiones y referidos desde cualquier lugar.",
    icon: Smartphone,
  },
];

export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "¿Puede cualquier persona formar parte del programa Pazz Partner+?",
    answer:
      "Sí, cualquier persona o empresa puede aplicar al programa. Buscamos especialmente profesionales del sector automotriz, asesores financieros, gerentes de agencia y cualquier persona con acceso a clientes interesados en arrendamiento vehicular. Tu solicitud será revisada en menos de 24 horas.",
  },
  {
    question: "¿Tengo que pagar alguna tarifa para formar parte del programa?",
    answer:
      "No, el programa Partner+ de Pazz es completamente gratuito. No hay costos de inscripción, mensualidades ni cargos ocultos. Tú solo te enfocas en referir clientes y nosotros nos encargamos del resto.",
  },
  {
    question:
      "¿Tengo que compartir un mínimo de propuestas o cerrar un mínimo de contratos para mantenerme en el programa?",
    answer:
      "No existe un mínimo obligatorio de propuestas o contratos. Sin embargo, tu nivel de comisión se determina por el monto arrendado acumulado en los últimos 3 meses, por lo que mientras más activo seas, mejores comisiones recibirás.",
  },
  {
    question: "¿Cómo se calculan las comisiones?",
    answer:
      "Las comisiones se calculan como un porcentaje del monto arrendado de cada contrato cerrado. Tu porcentaje depende de tu nivel: Bronce (1.0%), Plata (1.5%) u Oro (2.0%). El nivel se determina por el monto arrendado acumulado en los últimos 3 meses.",
  },
  {
    question: "¿Cuándo y cómo se pagan las comisiones?",
    answer:
      "Las comisiones se pagan mensualmente de forma automática una vez que el contrato de arrendamiento es formalizado. El pago se realiza por transferencia bancaria directamente a tu cuenta registrada.",
  },
];

export const FOOTER = {
  tagline: "Una plataforma de referidos de Pazz.",
  links: [
    { label: "Inicio", href: "#inicio" },
    { label: "Cómo funciona", href: "#como-funciona" },
    { label: "El app", href: "#el-app" },
    { label: "Beneficios", href: "#beneficios" },
    { label: "FAQ", href: "#preguntas" },
  ],
  contact: {
    email: "info@partnerplus.mx",
    phone: "+52 (55) 9225-2280",
  },
  legal: [
    { label: "Aviso de privacidad", href: "#" },
    { label: "Políticas del programa", href: "#" },
  ],
  social: {
    facebook: "https://www.facebook.com/",
    instagram: "https://www.instagram.com/",
    tiktok: "https://www.tiktok.com/",
    linkedin: "https://www.linkedin.com/",
  },
};
