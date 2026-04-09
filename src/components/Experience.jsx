import { FaCalendarAlt, FaCode, FaTools } from "react-icons/fa";
import { motion } from "framer-motion";
import {
  SiArgo,
  SiDocker,
  SiExpress,
  SiKubernetes,
  SiN8N,
  SiPostgresql,
  SiReact,
  SiTerraform,
} from "react-icons/si";

const formatMonthYear = (date) =>
  new Intl.DateTimeFormat("es-ES", {
    month: "long",
    year: "numeric",
  }).format(date);

const formatLongDate = (date) =>
  new Intl.DateTimeFormat("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);

const getDurationLabel = (startDate, endDate = new Date()) => {
  let totalMonths =
    (endDate.getFullYear() - startDate.getFullYear()) * 12 +
    endDate.getMonth() -
    startDate.getMonth();

  if (endDate.getDate() < startDate.getDate()) {
    totalMonths -= 1;
  }

  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  const parts = [];

  if (years > 0) {
    parts.push(`${years} año${years > 1 ? "s" : ""}`);
  }

  if (months > 0) {
    parts.push(`${months} mes${months > 1 ? "es" : ""}`);
  }

  return parts.join(" y ") || "menos de 1 mes";
};

const Experience = () => {
  const currentDate = new Date();
  const synergiaStartDate = new Date(2025, 6, 1);

  const experiences = [
    {
      company: "SynergIA",
      initials: "SA",
      role: "Platform Engineer",
      periodChip: `${formatMonthYear(synergiaStartDate)} - Actualidad`,
      periodDetail: `Desde el ${formatLongDate(synergiaStartDate)} hasta la actualidad`,
      meta: `${getDurationLabel(synergiaStartDate, currentDate)} en el rol · actualizado en ${formatMonthYear(currentDate)}`,
      summary:
        "Responsabilidad directa sobre plataforma, despliegues y automatización, combinada con desarrollo backend y soluciones internas con IA.",
      technologies: [
        { icon: <SiKubernetes />, name: "Kubernetes", color: "#326CE5" },
        { icon: <SiDocker />, name: "Docker", color: "#2496ED" },
        { icon: <SiTerraform />, name: "Terraform", color: "#7B42BC" },
        { icon: <SiArgo />, name: "ArgoCD", color: "#EF7B4D" },
        { icon: <SiN8N />, name: "n8n", color: "#EA4B71" },
      ],
      responsibilities: [
        "He levantado y gestiono un cluster de Kubernetes bare metal en Hetzner para despliegues y operación real.",
        "Desarrollo backend y piezas de plataforma que aceleran entregas y reducen trabajo manual.",
        "Creo automatizaciones con OCR, agentes de IA y flujos integrados con herramientas y APIs del negocio.",
        "Mantengo ownership técnico sobre la fiabilidad del entorno, los despliegues y la evolución de la plataforma.",
      ],
    },
    {
      company: "Landra Sistemas",
      initials: "LS",
      role: "Desarrollador Fullstack en prácticas",
      periodChip: "junio 2024 - octubre 2024",
      periodDetail: "Primera experiencia profesional en entorno de producto",
      meta: "Base sólida en desarrollo fullstack, APIs y trabajo con datos",
      summary:
        "Etapa en la que consolidé experiencia construyendo features fullstack y trabajando con frontend, backend y base de datos.",
      technologies: [
        { icon: <SiExpress />, name: "ExpressJS", color: "#6DB33F" },
        { icon: <SiReact />, name: "React", color: "#61DAFB" },
        { icon: <SiPostgresql />, name: "PostgreSQL", color: "#336791" },
        { icon: <SiDocker />, name: "Docker", color: "#2496ED" },
      ],
      responsibilities: [
        "Desarrollo de funcionalidades fullstack orientadas a producto.",
        "Creación y ajuste de consultas SQL para la capa de datos.",
        "Implementación de componentes React reutilizables.",
        "Integración y consumo de APIs REST con ExpressJS.",
      ],
    },
  ];

  return (
    <section
      id="experiencia"
      className="w-full bg-gradient-to-br from-slate-900 via-slate-950 to-black px-4 py-16 sm:px-6 md:px-8"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 max-w-3xl"
        >
          <h2 className="flex items-center gap-3 text-3xl font-bold text-white md:text-4xl">
            <FaCode className="text-blue-400" />
            Experiencia Profesional
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-300 md:text-lg">
            En este último año he pasado de construir producto a asumir ownership real sobre
            plataforma, despliegues y automatización. Mi perfil actual mezcla infraestructura,
            backend y entrega continua de soluciones útiles para negocio.
          </p>
        </motion.div>

        <div className="space-y-8">
          {experiences.map((experience, index) => (
            <motion.article
              key={experience.company}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: index * 0.08 }}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/20 backdrop-blur md:p-8"
            >
              <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
                <div className="rounded-3xl border border-white/10 bg-slate-950/50 p-6">
                  <div className="flex flex-col items-start">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-blue-400/40 bg-blue-500/10 text-2xl font-bold text-white">
                      {experience.initials}
                    </div>
                    <h3 className="mt-5 text-2xl font-bold text-white">{experience.company}</h3>
                    <p className="mt-2 text-lg text-blue-300">{experience.role}</p>
                  </div>

                  <div className="mt-6 space-y-4">
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <div className="flex items-center gap-3 text-blue-300">
                        <FaCalendarAlt className="text-lg" />
                        <span className="text-sm font-medium uppercase tracking-[0.2em]">
                          Período
                        </span>
                      </div>
                      <p className="mt-3 text-base font-semibold text-white">
                        {experience.periodChip}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-slate-300">
                        {experience.periodDetail}
                      </p>
                      <p className="mt-3 text-sm text-blue-100/80">{experience.meta}</p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <div className="flex items-center gap-3 text-blue-300">
                        <FaTools className="text-lg" />
                        <span className="text-sm font-medium uppercase tracking-[0.2em]">
                          Stack principal
                        </span>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {experience.technologies.map((tech) => (
                          <div
                            key={`${experience.company}-${tech.name}`}
                            className="flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/50 px-3 py-2"
                          >
                            <span style={{ color: tech.color }}>{tech.icon}</span>
                            <span className="text-sm text-white/90">{tech.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8">
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-200">
                    Impacto
                  </p>
                  <p className="mt-4 text-lg leading-relaxed text-white md:text-xl">
                    {experience.summary}
                  </p>

                  <div className="mt-8 grid gap-4 md:grid-cols-2">
                    {experience.responsibilities.map((responsibility, responsibilityIndex) => (
                      <motion.div
                        key={`${experience.company}-${responsibilityIndex}`}
                        whileHover={{ y: -2 }}
                        className="rounded-2xl border border-white/10 bg-slate-950/40 p-4 transition-colors duration-300 hover:bg-slate-950/60"
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-600/30 text-blue-300">
                            {responsibilityIndex + 1}
                          </div>
                          <p className="text-sm leading-relaxed text-slate-200 md:text-base">
                            {responsibility}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
