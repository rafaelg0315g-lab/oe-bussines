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
  intro: {
    concept: "THE NEXT FORM",
    cornerBrand: "OE BUSINESS",
    cornerVision: "TECHNOLOGY COMPANY",
  },
  ticker: {
    words: [
      "OE BUSINESS",
      "ECOSISTEMA",
      "INTELIGENCIA ARTIFICIAL",
      "SOFTWARE",
      "AUTOMATIZACIÓN",
      "EVOLUCIÓN",
    ],
  },
  hero: {
    label: "OE BUSINESS / TECHNOLOGY COMPANY",
    title1: "CONSTRUIMOS TECNOLOGÍA.",
    title2: "Creamos posibilidades.",
    support:
      "OE BUSINESS es una empresa tecnológica que desarrolla productos digitales, inteligencia artificial y soluciones de software. Estamos construyendo un ecosistema de herramientas diseñado para transformar ideas en tecnología útil.",
    ctaPrimary: "Descubrir nuestro ecosistema",
    ctaSecondary: "Conocer nuestra visión",
    scroll: "Desplázate",
    hud: "V.02 — THE NEXT FORM",
  },
  transition: {
    text: "Las grandes ideas comienzan con una forma diferente de mirar.",
  },
  identity: {
    kicker: "01 — IDENTIDAD",
    title: "Más que una empresa: un ecosistema tecnológico.",
    p1: "OE BUSINESS es una empresa tecnológica dedicada al desarrollo de productos digitales, software e inteligencia artificial. Trabajamos para transformar ideas en soluciones tecnológicas útiles, construir herramientas que respondan a necesidades reales y desarrollar un ecosistema de productos conectados por una misma visión de innovación.",
    p2: "Desde plataformas inteligentes hasta herramientas de automatización y desarrollo de software, nuestro objetivo es ampliar las posibilidades de la tecnología y hacer que sus beneficios lleguen a más personas y empresas.",
    p3: "OE BUSINESS representa el proyecto empresarial que impulsa estas iniciativas, conecta sus capacidades y construye las bases de un ecosistema tecnológico en constante evolución.",
    panelLabel: "OE — TECHNOLOGY COMPANY",
    areasKicker: "A QUÉ NOS DEDICAMOS",
    areasTitle: "Áreas de actividad",
    areas: [
      {
        title: "Inteligencia artificial",
        text: "Investigación aplicada, integración y desarrollo de herramientas basadas en IA para asistir a usuarios, automatizar tareas y facilitar la creación de soluciones digitales.",
      },
      {
        title: "Desarrollo de software",
        text: "Diseño, construcción y evolución de aplicaciones, plataformas web, sistemas y herramientas digitales.",
      },
      {
        title: "Automatización tecnológica",
        text: "Flujos de trabajo y agentes inteligentes capaces de ejecutar tareas definidas, conectar servicios y simplificar procesos.",
      },
      {
        title: "Productos digitales",
        text: "Creación de productos propios orientados a diferentes necesidades, con identidad individual y una visión compartida dentro del ecosistema OE.",
      },
      {
        title: "Soluciones para empresas",
        text: "Desarrollo e integración de tecnología para ayudar a negocios a mejorar sus procesos, presencia digital, productividad y capacidades tecnológicas.",
      },
      {
        title: "Investigación e innovación",
        text: "Exploración progresiva de nuevas ideas, herramientas y tecnologías que puedan convertirse en productos útiles y viables.",
      },
    ],
    ecosystemKicker: "EL ECOSISTEMA OE",
    ecosystemLead:
      "OE BUSINESS es la empresa matriz de su ecosistema de productos tecnológicos. Cada producto puede tener objetivos, interfaces, usuarios y modelos de negocio diferentes, pero todos comparten una misma identidad corporativa y una dirección estratégica común.",
    ecosystemNote: "ARQUITECTURA DE MARCA",
    ecosystem: [
      {
        name: "OE BUSINESS",
        role: "Empresa y marca corporativa",
        status: "ACTIVA",
      },
      {
        name: "OE AI",
        role: "Familia de productos de inteligencia artificial",
        status: "EN PLANIFICACIÓN",
      },
      {
        name: "OE VIRAL ENGINE",
        role: "Plataforma de SEO y crecimiento orgánico",
        status: "PROPUESTA",
      },
      {
        name: "OE STUDIO",
        role: "Creación y diseño digital",
        status: "PROPUESTA",
      },
      {
        name: "OE SYSTEMS",
        role: "Software e infraestructura",
        status: "PROPUESTA",
      },
      {
        name: "OE FLOW",
        role: "Automatización empresarial",
        status: "PROPUESTA",
      },
      {
        name: "PRÓXIMOS PRODUCTOS",
        role: "Se incorporarán conforme avancen su desarrollo y validación",
        status: "FUTURO",
      },
    ],
    missionKicker: "MISIÓN",
    mission: [
      "Nuestra misión es desarrollar tecnología útil e innovadora que permita transformar ideas en productos digitales y soluciones capaces de resolver necesidades reales.",
      "Buscamos combinar software, inteligencia artificial y pensamiento creativo para construir herramientas que aporten valor a personas, desarrolladores y empresas.",
    ],
  },
  philosophy: {
    kicker: "02 — FILOSOFÍA",
    title: "Lo que nos mueve.",
    items: [
      {
        n: "01",
        title: "INNOVACIÓN CON PROPÓSITO",
        text: "Desarrollamos tecnología para resolver problemas concretos.",
      },
      {
        n: "02",
        title: "CONSTRUCCIÓN CONTINUA",
        text: "Convertimos ideas en productos mediante experimentación, desarrollo y mejora.",
      },
      {
        n: "03",
        title: "VISIÓN A LARGO PLAZO",
        text: "Construimos un ecosistema que crece de manera sostenible.",
      },
      {
        n: "04",
        title: "CALIDAD TECNOLÓGICA",
        text: "Priorizamos soluciones funcionales, seguras y bien construidas.",
      },
      {
        n: "05",
        title: "ACCESIBILIDAD",
        text: "Exploramos formas de hacer que más personas puedan beneficiarse de la tecnología.",
      },
      {
        n: "06",
        title: "RESPONSABILIDAD",
        text: "Utilizamos los datos, la automatización y la inteligencia artificial de manera transparente.",
      },
    ],
  },
  vision: {
    kicker: "03 — VISIÓN",
    title: "Construir hoy lo que definirá el mañana.",
    p1: "Nuestra visión es construir un ecosistema tecnológico en constante evolución, compuesto por productos digitales que trabajen de forma complementaria y amplíen las posibilidades de la tecnología.",
    p2: "Queremos crecer mediante la creación de soluciones útiles, el desarrollo continuo de nuestras capacidades y la construcción de productos que puedan evolucionar junto con las necesidades de sus usuarios.",
    fig: "FIG. 03 — HORIZONTE",
    aiKicker: "LÍNEA PRINCIPAL — INTELIGENCIA ARTIFICIAL",
    aiTitle: "OE AI",
    aiText:
      "OE AI es la línea de inteligencia artificial del ecosistema OE, orientada al desarrollo de asistentes inteligentes, herramientas de productividad y soluciones capaces de ayudar a las personas y empresas a trabajar con información, generar contenido y automatizar tareas.",
    aiStatus: "EN PLANIFICACIÓN",
    aiItems: [
      { name: "OE AI Chat", detail: "Asistente conversacional" },
      { name: "OE AI Agents", detail: "Agentes para automatizar tareas y flujos de trabajo" },
      { name: "OE AI Studio", detail: "Espacio para configurar y crear experiencias de IA" },
      { name: "OE AI Vision", detail: "Análisis visual y documental" },
      { name: "OE AI Voice", detail: "Interacción mediante voz" },
      { name: "OE AI API", detail: "Integración de capacidades de IA en aplicaciones" },
      { name: "OE AI Workspace", detail: "Entorno de productividad asistido por IA" },
    ],
    viralKicker: "PRÓXIMO PROYECTO — SEO Y CRECIMIENTO ORGÁNICO",
    viralTitle: "OE VIRAL ENGINE",
    viralText:
      "OE VIRAL ENGINE es una iniciativa del ecosistema OE orientada a desarrollar herramientas inteligentes para mejorar la visibilidad orgánica de sitios web mediante auditorías SEO, análisis de palabras clave, optimización de contenido y automatización responsable.",
    viralCapLabel: "CAPACIDADES PREVISTAS",
    viralItems: [
      "Auditorías técnicas de sitios web",
      "Análisis de consultas y oportunidades de búsqueda",
      "Detección de problemas de rastreo e indexación",
      "Recomendaciones de optimización de contenido",
      "Análisis de enlaces internos",
      "Seguimiento del rendimiento orgánico",
      "Planificación de campañas legítimas de distribución de contenido",
    ],
    roadmapTitle: "Lo que viene: el futuro del ecosistema OE",
    roadmapSubtitle:
      "Estamos construyendo nuevas herramientas, productos y experiencias digitales para ampliar las posibilidades de nuestro ecosistema tecnológico.",
    roadmapLabel: "HOJA DE RUTA",
    roadmap: [
      {
        tag: "EN PLANIFICACIÓN",
        tone: "hi" as const,
        cat: "INTELIGENCIA ARTIFICIAL",
        items: ["OE AI Chat", "OE AI Agents", "OE AI Studio", "OE AI Vision", "OE AI API"],
        goal: "Crear herramientas inteligentes para conversar, desarrollar, analizar información y automatizar tareas.",
      },
      {
        tag: "EN EXPLORACIÓN",
        tone: "lo" as const,
        cat: "DESARROLLO Y CREACIÓN DIGITAL",
        items: ["OE Studio", "OE Code", "OE Web"],
        goal: "Simplificar la creación de sitios web, aplicaciones, interfaces y software.",
      },
      {
        tag: "EN PLANIFICACIÓN",
        tone: "hi" as const,
        cat: "SEO Y CRECIMIENTO",
        items: ["OE VIRAL ENGINE", "OE SEO", "OE Analytics", "OE Campaigns"],
        goal: "Ayudar a empresas y creadores a comprender sus audiencias, mejorar su presencia digital y tomar decisiones basadas en datos.",
      },
      {
        tag: "EN EXPLORACIÓN",
        tone: "lo" as const,
        cat: "AUTOMATIZACIÓN EMPRESARIAL",
        items: ["OE FLOW", "OE CRM", "OE Connect"],
        goal: "Conectar herramientas, organizar procesos y reducir tareas repetitivas.",
      },
      {
        tag: "EN EXPLORACIÓN",
        tone: "lo" as const,
        cat: "INFRAESTRUCTURA TECNOLÓGICA",
        items: ["OE Cloud", "OE API Hub", "OE Monitor"],
        goal: "Integrar, desplegar y supervisar aplicaciones y servicios digitales.",
      },
      {
        tag: "EN EXPLORACIÓN",
        tone: "lo" as const,
        cat: "EDUCACIÓN Y CONOCIMIENTO",
        items: ["OE Academy", "OE Code School", "OE Tutor"],
        goal: "Explorar nuevas formas de aprender programación, tecnología e inteligencia artificial.",
      },
      {
        tag: "CONCEPTO FUTURO",
        tone: "lo" as const,
        cat: "FUTURAS EXPLORACIONES",
        items: ["OE Secure", "OE Data", "OE Life"],
        goal: "Otras iniciativas digitales que puedan surgir de la evolución de la empresa.",
      },
    ],
    roadmapNote:
      "Hoja de ruta conceptual: las etiquetas reflejan el estado real de cada iniciativa. Sin fechas ni compromisos de lanzamiento.",
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
    label: "MANIFIESTO",
    lines: [
      "No seguimos el futuro.",
      "Lo imaginamos.",
      "Lo cuestionamos.",
      "Lo construimos.",
      "Y seguimos evolucionando.",
      "La base de todo lo que viene.",
    ],
    brand: "OE BUSINESS.",
  },
  contact: {
    kicker: "05 — CONTACTO",
    title: "Toda gran visión comienza con una conversación.",
    text: "Conoce OE BUSINESS, comparte tus ideas y mantente conectado con la evolución de nuestro ecosistema.",
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
    tagline:
      "El punto de partida de un ecosistema tecnológico en construcción. Lo que hoy construimos es la base de todo lo que viene.",
    navTitle: "Navegación",
    contactTitle: "Contacto",
    rights: "Todos los derechos reservados.",
    concept: "THE NEXT FORM",
  },
};

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
  intro: {
    concept: "THE NEXT FORM",
    cornerBrand: "OE BUSINESS",
    cornerVision: "TECHNOLOGY COMPANY",
  },
  ticker: {
    words: [
      "OE BUSINESS",
      "ECOSYSTEM",
      "ARTIFICIAL INTELLIGENCE",
      "SOFTWARE",
      "AUTOMATION",
      "EVOLUTION",
    ],
  },
  hero: {
    label: "OE BUSINESS / TECHNOLOGY COMPANY",
    title1: "WE BUILD TECHNOLOGY.",
    title2: "We create possibilities.",
    support:
      "OE BUSINESS is a technology company that develops digital products, artificial intelligence and software solutions. We are building an ecosystem of tools designed to turn ideas into useful technology.",
    ctaPrimary: "Discover our ecosystem",
    ctaSecondary: "Discover our vision",
    scroll: "Scroll",
    hud: "V.02 — THE NEXT FORM",
  },
  transition: {
    text: "Great ideas begin with a different way of seeing.",
  },
  identity: {
    kicker: "01 — IDENTITY",
    title: "More than a company: a technological ecosystem.",
    p1: "OE BUSINESS is a technology company dedicated to developing digital products, software and artificial intelligence. We work to turn ideas into useful technological solutions, build tools that respond to real needs and develop an ecosystem of products connected by one shared vision of innovation.",
    p2: "From intelligent platforms to automation and software development tools, our goal is to expand the possibilities of technology and bring its benefits to more people and companies.",
    p3: "OE BUSINESS represents the business project that drives these initiatives, connects their capabilities and builds the foundations of a technological ecosystem in constant evolution.",
    panelLabel: "OE — TECHNOLOGY COMPANY",
    areasKicker: "WHAT WE DO",
    areasTitle: "Areas of activity",
    areas: [
      {
        title: "Artificial intelligence",
        text: "Applied research, integration and development of AI-based tools to assist users, automate tasks and make building digital solutions easier.",
      },
      {
        title: "Software development",
        text: "Design, construction and evolution of applications, web platforms, systems and digital tools.",
      },
      {
        title: "Technology automation",
        text: "Workflows and intelligent agents capable of executing defined tasks, connecting services and simplifying processes.",
      },
      {
        title: "Digital products",
        text: "Creation of our own products oriented to different needs, each with its own identity and a shared vision within the OE ecosystem.",
      },
      {
        title: "Solutions for companies",
        text: "Development and integration of technology to help businesses improve their processes, digital presence, productivity and technological capabilities.",
      },
      {
        title: "Research and innovation",
        text: "Progressive exploration of new ideas, tools and technologies that can become useful, viable products.",
      },
    ],
    ecosystemKicker: "THE OE ECOSYSTEM",
    ecosystemLead:
      "OE BUSINESS is the parent company of its ecosystem of technology products. Each product may have different goals, interfaces, users and business models, but they all share one corporate identity and one common strategic direction.",
    ecosystemNote: "BRAND ARCHITECTURE",
    ecosystem: [
      {
        name: "OE BUSINESS",
        role: "Company and corporate brand",
        status: "ACTIVE",
      },
      {
        name: "OE AI",
        role: "Family of artificial intelligence products",
        status: "IN PLANNING",
      },
      {
        name: "OE VIRAL ENGINE",
        role: "SEO and organic growth platform",
        status: "PROPOSAL",
      },
      {
        name: "OE STUDIO",
        role: "Digital creation and design",
        status: "PROPOSAL",
      },
      {
        name: "OE SYSTEMS",
        role: "Software and infrastructure",
        status: "PROPOSAL",
      },
      {
        name: "OE FLOW",
        role: "Business automation",
        status: "PROPOSAL",
      },
      {
        name: "UPCOMING PRODUCTS",
        role: "Will join as their development and validation advance",
        status: "FUTURE",
      },
    ],
    missionKicker: "MISSION",
    mission: [
      "Our mission is to develop useful, innovative technology that makes it possible to turn ideas into digital products and solutions capable of solving real needs.",
      "We seek to combine software, artificial intelligence and creative thinking to build tools that bring value to people, developers and companies.",
    ],
  },
  philosophy: {
    kicker: "02 — PHILOSOPHY",
    title: "What moves us.",
    items: [
      {
        n: "01",
        title: "PURPOSE-DRIVEN INNOVATION",
        text: "We develop technology to solve concrete problems.",
      },
      {
        n: "02",
        title: "CONTINUOUS BUILDING",
        text: "We turn ideas into products through experimentation, development and improvement.",
      },
      {
        n: "03",
        title: "LONG-TERM VISION",
        text: "We build an ecosystem that grows in a sustainable way.",
      },
      {
        n: "04",
        title: "TECHNOLOGICAL QUALITY",
        text: "We prioritize functional, secure and well-built solutions.",
      },
      {
        n: "05",
        title: "ACCESSIBILITY",
        text: "We explore ways for more people to benefit from technology.",
      },
      {
        n: "06",
        title: "RESPONSIBILITY",
        text: "We use data, automation and artificial intelligence in a transparent way.",
      },
    ],
  },
  vision: {
    kicker: "03 — VISION",
    title: "Building today what will define tomorrow.",
    p1: "Our vision is to build a constantly evolving technological ecosystem, made up of digital products that work in a complementary way and expand the possibilities of technology.",
    p2: "We want to grow by creating useful solutions, continuously developing our capabilities and building products that can evolve alongside the needs of their users.",
    fig: "FIG. 03 — HORIZON",
    aiKicker: "FLAGSHIP LINE — ARTIFICIAL INTELLIGENCE",
    aiTitle: "OE AI",
    aiText:
      "OE AI is the artificial intelligence line of the OE ecosystem, focused on developing intelligent assistants, productivity tools and solutions that help people and companies work with information, generate content and automate tasks.",
    aiStatus: "IN PLANNING",
    aiItems: [
      { name: "OE AI Chat", detail: "Conversational assistant" },
      { name: "OE AI Agents", detail: "Agents to automate tasks and workflows" },
      { name: "OE AI Studio", detail: "A space to configure and create AI experiences" },
      { name: "OE AI Vision", detail: "Visual and document analysis" },
      { name: "OE AI Voice", detail: "Voice-based interaction" },
      { name: "OE AI API", detail: "AI capabilities integrated into applications" },
      { name: "OE AI Workspace", detail: "AI-assisted productivity environment" },
    ],
    viralKicker: "UPCOMING PROJECT — SEO & ORGANIC GROWTH",
    viralTitle: "OE VIRAL ENGINE",
    viralText:
      "OE VIRAL ENGINE is an initiative of the OE ecosystem aimed at developing intelligent tools to improve the organic visibility of websites through SEO audits, keyword analysis, content optimization and responsible automation.",
    viralCapLabel: "PLANNED CAPABILITIES",
    viralItems: [
      "Technical website audits",
      "Search query and opportunity analysis",
      "Crawling and indexing issue detection",
      "Content optimization recommendations",
      "Internal link analysis",
      "Organic performance tracking",
      "Planning of legitimate content distribution campaigns",
    ],
    roadmapTitle: "What's next: the future of the OE ecosystem",
    roadmapSubtitle:
      "We are building new tools, products and digital experiences to expand the possibilities of our technological ecosystem.",
    roadmapLabel: "ROADMAP",
    roadmap: [
      {
        tag: "IN PLANNING",
        tone: "hi" as const,
        cat: "ARTIFICIAL INTELLIGENCE",
        items: ["OE AI Chat", "OE AI Agents", "OE AI Studio", "OE AI Vision", "OE AI API"],
        goal: "Create intelligent tools to converse, build, analyze information and automate tasks.",
      },
      {
        tag: "IN EXPLORATION",
        tone: "lo" as const,
        cat: "DEVELOPMENT & DIGITAL CREATION",
        items: ["OE Studio", "OE Code", "OE Web"],
        goal: "Simplify the creation of websites, applications, interfaces and software.",
      },
      {
        tag: "IN PLANNING",
        tone: "hi" as const,
        cat: "SEO & GROWTH",
        items: ["OE VIRAL ENGINE", "OE SEO", "OE Analytics", "OE Campaigns"],
        goal: "Help companies and creators understand their audiences, improve their digital presence and make data-driven decisions.",
      },
      {
        tag: "IN EXPLORATION",
        tone: "lo" as const,
        cat: "BUSINESS AUTOMATION",
        items: ["OE FLOW", "OE CRM", "OE Connect"],
        goal: "Connect tools, organize processes and reduce repetitive work.",
      },
      {
        tag: "IN EXPLORATION",
        tone: "lo" as const,
        cat: "TECHNOLOGY INFRASTRUCTURE",
        items: ["OE Cloud", "OE API Hub", "OE Monitor"],
        goal: "Integrate, deploy and monitor applications and digital services.",
      },
      {
        tag: "IN EXPLORATION",
        tone: "lo" as const,
        cat: "EDUCATION & KNOWLEDGE",
        items: ["OE Academy", "OE Code School", "OE Tutor"],
        goal: "Explore new ways to learn programming, technology and artificial intelligence.",
      },
      {
        tag: "FUTURE CONCEPT",
        tone: "lo" as const,
        cat: "FUTURE EXPLORATIONS",
        items: ["OE Secure", "OE Data", "OE Life"],
        goal: "Other digital initiatives that may emerge from the company's evolution.",
      },
    ],
    roadmapNote:
      "Conceptual roadmap: labels reflect the real status of each initiative. No dates or launch commitments.",
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
    label: "MANIFESTO",
    lines: [
      "We don't follow the future.",
      "We imagine it.",
      "We question it.",
      "We build it.",
      "And we keep evolving.",
      "The foundation of everything to come.",
    ],
    brand: "OE BUSINESS.",
  },
  contact: {
    kicker: "05 — CONTACT",
    title: "Every great vision begins with a conversation.",
    text: "Get to know OE BUSINESS, share your ideas and stay connected with the evolution of our ecosystem.",
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
    tagline:
      "The starting point of a technological ecosystem under construction. What we build today is the foundation of everything to come.",
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
