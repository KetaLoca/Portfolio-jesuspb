import { FaDocker, FaNode, FaReact } from "react-icons/fa";
import {
  SiArgo,
  SiAnsible,
  SiExpress,
  SiGithubactions,
  SiGrafana,
  SiHelm,
  SiJavascript,
  SiKubernetes,
  SiN8N,
  SiPostgresql,
  SiPrometheus,
  SiRedis,
  SiStripe,
  SiTerraform,
} from "react-icons/si";

const Tecs = () => {
  const technologyGroups = [
    {
      title: "Desarrollo",
      description:
        "Backend, APIs e integraciones de producto.",
      accent: "from-emerald-500/15 to-cyan-500/10",
      technologies: [
        { name: "Node.js", icon: <FaNode />, color: "#339933" },
        { name: "ExpressJS", icon: <SiExpress />, color: "#FFFFFF" },
        { name: "PostgreSQL", icon: <SiPostgresql />, color: "#336791" },
        { name: "Redis", icon: <SiRedis />, color: "#DC382D" },
        { name: "Stripe", icon: <SiStripe />, color: "#635BFF" },
        { name: "JavaScript", icon: <SiJavascript />, color: "#F7DF1E" },
        { name: "React", icon: <FaReact />, color: "#61DAFB" },
        { name: "n8n", icon: <SiN8N />, color: "#EA4B71" },
      ],
    },
    {
      title: "Platform & Cloud",
      description:
        "Infraestructura, despliegue y entrega continua del cluster.",
      accent: "from-blue-500/15 to-violet-500/10",
      technologies: [
        { name: "Docker", icon: <FaDocker />, color: "#2496ED" },
        { name: "Kubernetes", icon: <SiKubernetes />, color: "#326CE5" },
        { name: "Terraform", icon: <SiTerraform />, color: "#7B42BC" },
        { name: "Ansible", icon: <SiAnsible />, color: "#EE0000" },
        { name: "ArgoCD", icon: <SiArgo />, color: "#EF7B4D" },
        { name: "GitHub Actions", icon: <SiGithubactions />, color: "#2088FF" },
        { name: "Helm", icon: <SiHelm />, color: "#0F1689" },
        { name: "Prometheus", icon: <SiPrometheus />, color: "#E6522C" },
        { name: "Grafana", icon: <SiGrafana />, color: "#F46800" },
      ],
    },
  ];

  return (
    <section
      id="tecnologias"
      className="w-full bg-gradient-to-b from-slate-800 to-slate-900 py-16"
    >
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 md:px-8">
        <div className="mb-10 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-300">
            Stack actual
          </p>
          <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">
            Tecnologías con las que trabajo hoy
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-300 md:text-lg">
            El stack con el que trabajo a diario, repartido entre el desarrollo de producto y la
            operación de la plataforma.
          </p>
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          {technologyGroups.map((group) => (
            <article
              key={group.title}
              className={`rounded-3xl border border-white/10 bg-gradient-to-br ${group.accent} p-6 shadow-xl shadow-black/10 backdrop-blur md:p-8`}
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="text-2xl font-semibold text-white">{group.title}</h3>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-300 md:text-base">
                    {group.description}
                  </p>
                </div>
                <span className="rounded-full border border-white/10 bg-slate-950/50 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-slate-200">
                  {group.technologies.length} tecnologías
                </span>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {group.technologies.map((tech) => (
                  <div
                    key={`${group.title}-${tech.name}`}
                    className="min-w-0 flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/55 px-4 py-4"
                  >
                    <span
                      className="text-2xl"
                      style={{ color: tech.color }}
                      role="img"
                      aria-label={tech.name}
                    >
                      {tech.icon}
                    </span>
                    <span className="min-w-0 text-sm font-medium text-white md:text-base">
                      {tech.name}
                    </span>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Tecs;
