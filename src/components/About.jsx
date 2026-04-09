import { FaEnvelope, FaPhone } from "react-icons/fa";

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
      value: "Kubernetes bare metal",
      label: "cluster levantado y operado por mí en Hetzner",
    },
    {
      value: "Backend + IA",
      label: "servicios internos, OCR y agentes conectados a negocio",
    },
  ];

  const focusAreas = [
    "Backend",
    "React",
    "Node.js",
    "Redis",
    "Stripe",
    "Kubernetes",
    "Terraform",
    "ArgoCD",
    "GitHub Actions",
    "Ansible",
    "n8n",
    "Agentes de IA",
  ];

  const currentWork = [
    "Plataforma, despliegues y operación diaria sobre Kubernetes.",
    "Desarrollo backend y herramientas internas para producto y equipo.",
    "Automatización de procesos con OCR, n8n y agentes de IA.",
  ];

  return (
    <section
      id="sobre-mi"
      className="w-full overflow-hidden bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 pb-16 pt-28 md:pb-20 lg:pt-32"
    >
      <div className="mx-auto grid w-full max-w-[1360px] gap-10 px-4 sm:px-6 md:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(320px,380px)] lg:items-center lg:px-8">
        <div className="min-w-0">
          <span className="inline-flex rounded-full border border-sky-400/30 bg-sky-500/10 px-4 py-2 text-sm font-medium text-sky-100">
            Jesús Pérez Bañobre
          </span>

          <div className="mt-6 text-left">
            <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
              Platform Engineer con foco en backend, Kubernetes y automatización
            </h1>
            <p className="mt-6 text-base leading-relaxed text-slate-200 md:text-lg">
              Trabajo en SynergIA en un rol muy transversal: plataforma, desarrollo backend y
              automatización. Mi día a día mezcla despliegues, operación, servicios internos y
              soluciones que terminan usándose de verdad.
            </p>
            <p className="mt-4 text-base leading-relaxed text-slate-300 md:text-lg">
              He levantado y gestiono un cluster de Kubernetes bare metal en Hetzner, desarrollo
              backend, diseño automatizaciones con OCR y n8n, y construyo agentes de IA cuando
              encajan bien con el problema a resolver.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {highlights.map((highlight) => (
              <div
                key={highlight.value}
                className="rounded-2xl border border-white/10 bg-white/5 p-4 text-left shadow-lg shadow-black/10 backdrop-blur"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-200">
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
              className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 transition-colors hover:border-sky-400/40 hover:text-sky-200 sm:text-base"
            >
              <FaEnvelope className="mr-2 h-4 w-4" />
              xesuspb@gmail.com
            </a>
            <a
              href="tel:+34647736793"
              className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 transition-colors hover:border-sky-400/40 hover:text-sky-200 sm:text-base"
            >
              <FaPhone className="mr-2 h-4 w-4" />
              +34 647 736 793
            </a>
            <a
              href="/curriculum.pdf"
              download="JesusPerezBanobre_CV.pdf"
              className="inline-flex items-center rounded-full bg-emerald-600 px-5 py-3 text-sm font-medium text-white transition-colors duration-200 hover:bg-emerald-500 sm:text-base"
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
          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-2xl shadow-black/30">
            <img
              src="/Foto.jpg"
              alt="Jesús Pérez Bañobre"
              className="aspect-[4/5] w-full object-cover"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl shadow-black/20 backdrop-blur sm:col-span-3 lg:col-span-1">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-200">
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

              <p className="mt-5 text-sm text-sky-100/80">
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
