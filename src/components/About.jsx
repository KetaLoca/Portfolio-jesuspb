import { FaEnvelope, FaPhone } from "react-icons/fa";

const About = () => {
  const lastUpdated = new Intl.DateTimeFormat("es-ES", {
    month: "long",
    year: "numeric",
  }).format(new Date());

  const highlights = [
    {
      value: "1+ año",
      label: "de experiencia profesional entregando producto e infraestructura",
    },
    {
      value: "Kubernetes bare metal",
      label: "cluster levantado y operado por mí en Hetzner",
    },
    {
      value: "Backend + IA",
      label: "servicios, agentes y automatización con impacto real",
    },
  ];

  const focusAreas = [
    "Platform engineering",
    "Kubernetes",
    "Backend",
    "Automatización con OCR",
    "Agentes de IA",
    "Infraestructura",
  ];

  const currentWork = [
    "Opero infraestructura y despliegues sobre Kubernetes con ownership real de la plataforma.",
    "Desarrollo backend y herramientas internas para acelerar procesos y entregas.",
    "Diseño automatizaciones con OCR, workflows y agentes de IA conectados a necesidades de negocio.",
  ];

  return (
    <section
      id="sobre-mi"
      className="relative left-1/2 right-1/2 w-full -translate-x-1/2 bg-gradient-to-b from-slate-800 via-slate-900 to-slate-950 px-4 pb-16 pt-28 sm:px-6 md:pb-20 lg:px-8"
    >
      <div className="mx-auto grid w-full max-w-6xl items-start gap-10 lg:grid-cols-[1.35fr_0.85fr]">
        <div>
          <span className="inline-flex rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-100">
            Platform Engineer · Backend · IA aplicada
          </span>

          <div className="mt-6 text-center lg:text-left">
            <h1 className="text-4xl font-bold text-white md:text-5xl lg:text-6xl">
              Jesús Pérez Bañobre
            </h1>
            <p className="mt-6 text-base leading-relaxed text-slate-200 md:text-lg">
              Soy un ingeniero de software centrado en construir plataforma, backend y
              automatizaciones útiles para negocio. Ya no me defino como un perfil junior:
              llevo más de un año trabajando en entornos reales, tomando decisiones técnicas,
              manteniendo infraestructura y entregando soluciones que llegan a producción.
            </p>
            <p className="mt-4 text-base leading-relaxed text-slate-300 md:text-lg">
              Actualmente trabajo en SynergIA como Platform Engineer. He levantado y gestiono
              mi propio cluster de Kubernetes bare metal en Hetzner, desarrollo servicios
              backend, creo agentes de IA y automatizo procesos con OCR y flujos que reducen
              trabajo manual y tiempo operativo.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {highlights.map((highlight) => (
              <div
                key={highlight.value}
                className="rounded-2xl border border-white/10 bg-white/8 p-4 text-left shadow-lg shadow-black/10 backdrop-blur"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-200">
                  {highlight.value}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-200">
                  {highlight.label}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {focusAreas.map((area) => (
              <span
                key={area}
                className="rounded-full border border-white/10 bg-slate-900/70 px-4 py-2 text-sm text-slate-100"
              >
                {area}
              </span>
            ))}
          </div>

          <div className="mb-8 mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-start sm:gap-8 md:mb-12">
            <a
              href="mailto:xesuspb@gmail.com"
              className="flex items-center text-sm text-slate-200 transition-colors hover:text-blue-300 sm:text-base"
            >
              <FaEnvelope className="mr-2 h-4 w-4" />
              xesuspb@gmail.com
            </a>

            <div className="hidden h-6 w-px bg-white/20 sm:block" />

            <a
              href="tel:+34647736793"
              className="flex items-center text-sm text-slate-200 transition-colors hover:text-blue-300 sm:text-base"
            >
              <FaPhone className="mr-2 h-4 w-4" />
              +34 647 736 793
            </a>
          </div>

          <div className="text-center lg:text-left">
            <a
              href="/curriculum.pdf"
              download="JesusPerezBanobre_CV.pdf"
              className="inline-flex items-center rounded-lg bg-emerald-700/90 px-6 py-3 text-sm font-medium text-white transition-colors duration-200 hover:bg-emerald-800 sm:text-base"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              Descargar CV
            </a>
          </div>
        </div>

        <div className="space-y-6 lg:pt-8">
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl shadow-black/30">
            <img
              src="/Foto.jpg"
              alt="Jesús Pérez Bañobre"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/8 p-6 shadow-xl shadow-black/20 backdrop-blur">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-200">
              Ahora mismo
            </p>

            <ul className="mt-5 space-y-3">
              {currentWork.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-emerald-400" />
                  <span className="text-sm leading-relaxed text-slate-200">{item}</span>
                </li>
              ))}
            </ul>

            <p className="mt-5 text-sm text-blue-100/80">
              Perfil actualizado en {lastUpdated}.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
