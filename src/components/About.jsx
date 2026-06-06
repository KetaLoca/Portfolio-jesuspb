import { FaEnvelope, FaPhone } from "react-icons/fa";
import ProfilePhoto from "./ProfilePhoto";

const About = () => {
  const lastUpdated = new Intl.DateTimeFormat("es-ES", {
    month: "long",
    year: "numeric",
  }).format(new Date());

  const highlights = [
    {
      value: "SynergIA",
      label: "Platform Engineer desde julio de 2025",
    },
    {
      value: "Kubernetes en HA",
      label: "cluster bare metal en Hetzner, levantado y operado por mí",
    },
    {
      value: "Backend + IA",
      label: "servicios internos, OCR y agentes conectados al negocio",
    },
  ];

  const focusAreas = [
    "Node.js",
    "PostgreSQL",
    "Kubernetes",
    "Terraform",
    "ArgoCD",
    "CI/CD",
  ];

  const currentWork = [
    "Operación diaria del cluster: despliegues, fiabilidad y evolución de la plataforma.",
    "Desarrollo backend y herramientas internas para producto y equipo.",
    "Procesos automatizados con OCR, n8n y agentes de IA.",
  ];

  return (
    <section
      id="sobre-mi"
      className="relative isolate w-full pb-20 pt-28 md:pb-28 lg:pt-36"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -right-24 -top-24 h-[36rem] w-[36rem] rounded-full bg-cyan-500/[0.16] blur-[150px]" />
        <div className="absolute -bottom-40 -left-24 h-[32rem] w-[32rem] rounded-full bg-blue-600/10 blur-[150px]" />
      </div>

      <div className="mx-auto grid w-full max-w-[1360px] gap-10 px-4 sm:px-6 md:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(320px,380px)] lg:items-center lg:px-8">
        <div className="min-w-0">
          <p className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.25em] text-cyan-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400/70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
            </span>
            Backend · Platform · DevOps
          </p>
          <span className="mt-4 inline-flex rounded-full border border-cyan-400/30 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-100">
            Jesús Pérez Bañobre
          </span>

          <div className="mt-6 text-left">
            <h1 className="max-w-4xl text-4xl font-bold leading-[1.05] tracking-tight text-white md:text-6xl lg:text-7xl">
              Platform Engineer centrado en backend, Kubernetes y entrega continua
            </h1>
            <p className="mt-6 text-base leading-relaxed text-slate-200 md:text-lg">
              Trabajo en SynergIA desde 2025 en un rol transversal entre desarrollo backend y
              plataforma. Me ocupo del ciclo completo de los servicios internos: diseño técnico,
              implementación, despliegue y operación en producción.
            </p>
            <p className="mt-4 text-base leading-relaxed text-slate-300 md:text-lg">
              Levanté y opero el cluster Kubernetes en alta disponibilidad sobre el que corre el
              producto, con GitOps en ArgoCD, observabilidad con Prometheus y Grafana, y políticas
              de seguridad y copias de seguridad gestionadas como código. En la capa de producto
              construyo APIs e integraciones, varias apoyadas en OCR y agentes de IA.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {highlights.map((highlight) => (
              <div
                key={highlight.value}
                className="rounded-2xl border border-white/10 bg-white/5 p-4 text-left shadow-lg shadow-black/10 backdrop-blur"
              >
                <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200">
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
                className="rounded-full border border-white/10 bg-slate-900/80 px-4 py-2 text-sm text-slate-100"
              >
                {area}
              </span>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="mailto:xesuspb@gmail.com"
              className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 transition-colors hover:border-cyan-400/40 hover:text-cyan-200 sm:text-base"
            >
              <FaEnvelope className="mr-2 h-4 w-4" />
              xesuspb@gmail.com
            </a>
            <a
              href="tel:+34647736793"
              className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 transition-colors hover:border-cyan-400/40 hover:text-cyan-200 sm:text-base"
            >
              <FaPhone className="mr-2 h-4 w-4" />
              +34 647 736 793
            </a>
            <a
              href="/curriculum.pdf"
              download="JesusPerezBanobre_CV.pdf"
              className="inline-flex items-center rounded-full bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition-colors duration-200 hover:bg-cyan-300 sm:text-base"
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

        <div className="min-w-0 grid gap-4 lg:gap-5">
          <ProfilePhoto />

          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl shadow-black/20 backdrop-blur sm:col-span-3 lg:col-span-1">
              <p className="font-mono text-xs font-medium uppercase tracking-[0.25em] text-cyan-300">
                Ahora mismo
              </p>

              <ul className="mt-5 space-y-3">
                {currentWork.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-cyan-400" />
                    <span className="text-sm leading-relaxed text-slate-200">{item}</span>
                  </li>
                ))}
              </ul>

              <p className="mt-5 text-sm text-slate-400">
                Perfil actualizado en {lastUpdated}.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
