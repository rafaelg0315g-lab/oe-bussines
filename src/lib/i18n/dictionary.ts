/**
 * OE BUSINESS — centralized ES/EN dictionary.
 * Structure is intentionally flat per section so copy is easy to edit.
 * Both languages MUST mirror the same keys.
 */

export type Lang = "es" | "en";

const es = {
  a11y: {
    skipToContent: "Saltar al contenido principal",
    mainLabel: "Contenido principal",
    navLabel: "Navegación principal",
    langSwitch: "Selector de idioma",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
  },
  nav: {
    home: "Inicio",
    identity: "Identidad",
    philosophy: "Filosofía",
    vision: "Visión",
    founders: "Fundadores",
    contact: "Contacto",
    cta: "Contacto",
  },
  hero: {
    label: "OE BUSINESS / INDEPENDENT VISION",
    title1: "EL FUTURO NO SE ESPERA.",
    title2: "Se construye.",
    support:
      "Una visión compartida. Una mentalidad innovadora. La determinación de construir lo que viene.",
    ctaPrimary: "Conocer nuestra identidad",
    ctaSecondary: "Nuestra visión",
    scroll: "Desplázate",
  },
  transition: {
    text: "Las grandes ideas comienzan con una forma diferente de mirar.",
  },
  identity: {
    kicker: "01 — IDENTIDAD",
    title: "Más que una empresa, una visión.",
    p1: "OE BUSINESS nace de la unión de dos personas con una visión compartida: mirar más allá de lo convencional, cuestionar los límites establecidos y construir una organización preparada para evolucionar con el mundo.",
    p2: "Creemos que las grandes ideas comienzan con una forma diferente de pensar. Nuestra identidad se fundamenta en la innovación, la creatividad, la determinación y la búsqueda constante de nuevas posibilidades.",
    p3: "Somos una empresa con mentalidad de futuro, construida sobre la convicción de que el progreso comienza cuando alguien se atreve a imaginar algo diferente.",
    panelLabel: "OE — INDEPENDENT VISION",
  },
  philosophy: {
    kicker: "02 — FILOSOFÍA",
    title: "Lo que nos mueve.",
    items: [
      {
        n: "01",
        title: "VISIÓN",
        text: "Miramos más allá del presente para imaginar nuevas posibilidades.",
      },
      {
        n: "02",
        title: "INNOVACIÓN",
        text: "Cuestionamos lo establecido y exploramos nuevas formas de pensar.",
      },
      {
        n: "03",
        title: "EVOLUCIÓN",
        text: "Cada idea, experiencia y desafío representa una oportunidad para avanzar.",
      },
    ],
  },
  vision: {
    kicker: "03 — VISIÓN",
    title: "Construir hoy lo que definirá el mañana.",
    p1: "Visualizamos OE BUSINESS como una empresa en constante evolución, con una perspectiva global y una identidad propia.",
    p2: "Aspiramos a construir una organización que crezca junto a las nuevas generaciones, impulse ideas ambiciosas y deje una huella significativa en el mundo empresarial y tecnológico.",
    fig: "FIG. 03 — HORIZONTE",
  },
  founders: {
    kicker: "04 — FUNDADORES",
    title: "Dos perspectivas. Una visión compartida.",
    intro:
      "OE BUSINESS nace de una convicción compartida: pensar en grande, aprender constantemente y trabajar para convertir una visión en algo real.",
    role: "Cofundador de OE BUSINESS",
    index: "COFUNDADOR",
    people: [
      { name: "OSCAR", initial: "O" },
      { name: "EDUARDO", initial: "E" },
    ],
  },
  manifesto: {
    lines: [
      "No seguimos el futuro.",
      "Lo imaginamos.",
      "Lo cuestionamos.",
      "Lo construimos.",
      "Y seguimos evolucionando.",
    ],
    brand: "OE BUSINESS.",
  },
  contact: {
    kicker: "05 — CONTACTO",
    title: "Toda gran visión comienza con una conversación.",
    text: "Conoce OE BUSINESS, comparte tus ideas y mantente conectado con nuestra evolución.",
    whatsappCta: "Escríbenos por WhatsApp",
    phoneLabel: "WHATSAPP",
    emailLabel: "CORREO",
    emailNote: "Correo empresarial",
    form: {
      title: "Envíanos un mensaje",
      name: "Nombre",
      namePlaceholder: "Tu nombre",
      email: "Correo electrónico",
      emailPlaceholder: "tu@correo.com",
      message: "Mensaje",
      messagePlaceholder: "Cuéntanos tu idea…",
      submit: "Enviar mensaje",
      sending: "Enviando…",
      successTitle: "Mensaje recibido.",
      successText:
        "Gracias por conectarte con OE BUSINESS. Tu mensaje ya está con nosotros y te responderemos pronto.",
      again: "Enviar otro mensaje",
      errorText:
        "No se pudo enviar el mensaje. Revisa tu conexión e inténtalo de nuevo.",
      errName: "Escribe tu nombre (mínimo 2 caracteres).",
      errEmail: "Escribe un correo electrónico válido.",
      errMessage: "Cuéntanos un poco más (mínimo 10 caracteres).",
    },
  },
  footer: {
    tagline: "El futuro no se espera. Se construye.",
    navTitle: "Navegación",
    contactTitle: "Contacto",
    rights: "Todos los derechos reservados.",
    concept: "THE NEXT FORM",
  },
} as const;

const en: typeof es = {
  a11y: {
    skipToContent: "Skip to main content",
    mainLabel: "Main content",
    navLabel: "Main navigation",
    langSwitch: "Language selector",
    openMenu: "Open menu",
    closeMenu: "Close menu",
  },
  nav: {
    home: "Home",
    identity: "Identity",
    philosophy: "Philosophy",
    vision: "Vision",
    founders: "Founders",
    contact: "Contact",
    cta: "Contact",
  },
  hero: {
    label: "OE BUSINESS / INDEPENDENT VISION",
    title1: "THE FUTURE ISN'T WAITED FOR.",
    title2: "It is built.",
    support:
      "A shared vision. An innovative mindset. The determination to build what comes next.",
    ctaPrimary: "Discover our identity",
    ctaSecondary: "Our vision",
    scroll: "Scroll",
  },
  transition: {
    text: "Great ideas begin with a different way of seeing.",
  },
  identity: {
    kicker: "01 — IDENTITY",
    title: "More than a company, a vision.",
    p1: "OE BUSINESS is born from the union of two people with a shared vision: looking beyond the conventional, questioning established limits and building an organization prepared to evolve with the world.",
    p2: "We believe great ideas begin with a different way of thinking. Our identity is grounded in innovation, creativity, determination and the constant search for new possibilities.",
    p3: "We are a company with a future-oriented mindset, built on the conviction that progress begins when someone dares to imagine something different.",
    panelLabel: "OE — INDEPENDENT VISION",
  },
  philosophy: {
    kicker: "02 — PHILOSOPHY",
    title: "What moves us.",
    items: [
      {
        n: "01",
        title: "VISION",
        text: "We look beyond the present to imagine new possibilities.",
      },
      {
        n: "02",
        title: "INNOVATION",
        text: "We question what is established and explore new ways of thinking.",
      },
      {
        n: "03",
        title: "EVOLUTION",
        text: "Every idea, experience and challenge is an opportunity to move forward.",
      },
    ],
  },
  vision: {
    kicker: "03 — VISION",
    title: "Building today what will define tomorrow.",
    p1: "We envision OE BUSINESS as a company in constant evolution, with a global perspective and an identity of its own.",
    p2: "We aspire to build an organization that grows alongside new generations, drives ambitious ideas and leaves a meaningful mark on the business and technological world.",
    fig: "FIG. 03 — HORIZON",
  },
  founders: {
    kicker: "04 — FOUNDERS",
    title: "Two perspectives. One shared vision.",
    intro:
      "OE BUSINESS is born from a shared conviction: to think big, learn constantly and work to turn a vision into something real.",
    role: "Co-founder of OE BUSINESS",
    index: "CO-FOUNDER",
    people: [
      { name: "OSCAR", initial: "O" },
      { name: "EDUARDO", initial: "E" },
    ],
  },
  manifesto: {
    lines: [
      "We don't follow the future.",
      "We imagine it.",
      "We question it.",
      "We build it.",
      "And we keep evolving.",
    ],
    brand: "OE BUSINESS.",
  },
  contact: {
    kicker: "05 — CONTACT",
    title: "Every great vision begins with a conversation.",
    text: "Get to know OE BUSINESS, share your ideas and stay connected with our evolution.",
    whatsappCta: "Message us on WhatsApp",
    phoneLabel: "WHATSAPP",
    emailLabel: "EMAIL",
    emailNote: "Business email",
    form: {
      title: "Send us a message",
      name: "Name",
      namePlaceholder: "Your name",
      email: "Email address",
      emailPlaceholder: "you@email.com",
      message: "Message",
      messagePlaceholder: "Tell us your idea…",
      submit: "Send message",
      sending: "Sending…",
      successTitle: "Message received.",
      successText:
        "Thank you for connecting with OE BUSINESS. Your message is with us and we will reply soon.",
      again: "Send another message",
      errorText:
        "The message could not be sent. Check your connection and try again.",
      errName: "Please enter your name (minimum 2 characters).",
      errEmail: "Please enter a valid email address.",
      errMessage: "Tell us a bit more (minimum 10 characters).",
    },
  },
  footer: {
    tagline: "The future is not waited for. It is built.",
    navTitle: "Navigation",
    contactTitle: "Contact",
    rights: "All rights reserved.",
    concept: "THE NEXT FORM",
  },
};

export type Dictionary = typeof es;

export const dictionaries: Record<Lang, Dictionary> = { es, en };

export const LANG_KEY = "oe-lang";

/** Configurable business email (set NEXT_PUBLIC_CONTACT_EMAIL in production). */
export const CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "contacto@oebusiness.com";

export const WHATSAPP_URL = "https://wa.me/573247078735";
export const WHATSAPP_DISPLAY = "+57 324 707 8735";
