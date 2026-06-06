import { FaDocker, FaNode, FaReact } from "react-icons/fa";
import { TbSailboat } from "react-icons/tb";
import {
  SiArgo,
  SiAnsible,
  SiExpress,
  SiGithubactions,
  SiGrafana,
  SiHelm,
  SiKubernetes,
  SiN8N,
  SiPostgresql,
  SiPrometheus,
  SiRedis,
  SiStripe,
  SiTailwindcss,
  SiTerraform,
  SiTypescript,
} from "react-icons/si";

const Tecs = () => {
  const technologyGroups = [
    {
      title: "Desarrollo",
      description:
        "Backend, APIs e integraciones de producto.",
      accent: "from-cyan-500/12 to-blue-500/5",
      technologies: [
        { name: "Node.js", icon: <FaNode />, color: "#339933" },
        { name: "ExpressJS", icon: <SiExpress />, color: "#FFFFFF" },
        { name: "PostgreSQL", icon: <SiPostgresql />, color: "#336791" },
        { name: "Redis", icon: <SiRedis />, color: "#DC382D" },
        { name: "TypeScript", icon: <SiTypescript />, color: "#3178C6" },
        { name: "LangChain", icon: <img src="/langchain.svg" alt="" className="h-6 w-6" />, color: "#2DD4BF" },
        { name: "React", icon: <FaReact />, color: "#61DAFB" },
        { name: "Tailwind", icon: <SiTailwindcss />, color: "#38BDF8" },
        { name: "Stripe", icon: <SiStripe />, color: "#635BFF" },
        { name: "n8n", icon: <SiN8N />, color: "#EA4B71" },
      ],
    },
    {
      title: "Platform & Cloud",
      description:
        "Infraestructura, despliegue y entrega continua del cluster.",
      accent: "from-blue-500/12 to-cyan-500/5",
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
        { name: "Velero", icon: <TbSailboat />, color: "#00ACD7" },
      ],
    },
  ];

  return (
    <section
      id="tecnologias"
      className="w-full py-20 md:py-28"
    >
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 md:px-8">
        <div className="mb-12 max-w-3xl">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.25em] text-cyan-300">
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
                  {/* En xl las dos tarjetas van lado a lado; reservar 2 líneas
                      evita que una descripción más larga baje su rejilla de techs
                      y la descentre respecto a la otra columna. */}
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-300 md:text-base xl:min-h-[3.5rem]">
                    {group.description}
                  </p>
                </div>
                <span className="self-start rounded-full border border-white/10 bg-slate-950/50 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-slate-200">
                  {group.technologies.length} tecnologías
                </span>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-2.5 sm:gap-3">
                {group.technologies.map((tech) => (
                  <div
                    key={`${group.title}-${tech.name}`}
                    className="min-w-0 flex items-center gap-2.5 rounded-2xl border border-white/10 bg-slate-950/55 px-3 py-3 sm:gap-3 sm:px-4 sm:py-4"
                  >
                    <span
                      className="text-2xl"
                      style={{ color: tech.color }}
                      role="img"
                      aria-label={tech.name}
                    >
                      {tech.icon}
                    </span>
                    <span className="min-w-0 text-sm font-medium leading-tight text-white md:text-base">
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
