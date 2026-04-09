import { FaDocker, FaGitAlt, FaGithub, FaNode, FaReact } from "react-icons/fa";
import {
  SiArgo,
  SiExpress,
  SiJavascript,
  SiKubernetes,
  SiN8N,
  SiPostgresql,
  SiTerraform,
} from "react-icons/si";

const Tecs = () => {
  const technologyGroups = [
    {
      title: "Platform & Cloud",
      description: "Contenedores, IaC, GitOps y herramientas base de plataforma.",
      technologies: [
        { name: "Docker", icon: <FaDocker />, color: "#2496ED" },
        { name: "Kubernetes", icon: <SiKubernetes />, color: "#326CE5" },
        { name: "Terraform", icon: <SiTerraform />, color: "#7B42BC" },
        { name: "ArgoCD", icon: <SiArgo />, color: "#EF7B4D" },
        { name: "Git", icon: <FaGitAlt />, color: "#F05032" },
        { name: "GitHub", icon: <FaGithub />, color: "#181717" },
      ],
    },
    {
      title: "Backend",
      description: "APIs, lógica de negocio y persistencia de datos.",
      technologies: [
        { name: "Node.js", icon: <FaNode />, color: "#339933" },
        { name: "ExpressJS", icon: <SiExpress />, color: "#FFFFFF" },
        { name: "PostgreSQL", icon: <SiPostgresql />, color: "#336791" },
      ],
    },
    {
      title: "Frontend",
      description: "Interfaces web cuidadas para producto y herramientas internas.",
      technologies: [
        { name: "JavaScript", icon: <SiJavascript />, color: "#F7DF1E" },
        { name: "React", icon: <FaReact />, color: "#61DAFB" },
      ],
    },
    {
      title: "Automatización",
      description: "Orquestación de procesos, integraciones y workflows operativos.",
      technologies: [{ name: "n8n", icon: <SiN8N />, color: "#EA4B71" }],
    },
  ];

  return (
    <section
      id="tecnologias"
      className="w-full bg-gradient-to-b from-slate-800 to-slate-900 px-4 py-16 sm:px-6 md:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-300">
            Stack actual
          </p>
          <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">
            Tecnologías con las que trabajo hoy
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-300 md:text-lg">
            Mi stack ha evolucionado hacia plataforma, backend y automatización. Aquí están
            las herramientas que mejor representan el tipo de trabajo que hago ahora.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {technologyGroups.map((group) => (
            <article
              key={group.title}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl shadow-black/10 backdrop-blur"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-semibold text-white">{group.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300 md:text-base">
                    {group.description}
                  </p>
                </div>
                <span className="rounded-full border border-blue-400/20 bg-blue-500/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-blue-200">
                  {group.technologies.length} herramientas
                </span>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                {group.technologies.map((tech) => (
                  <div
                    key={`${group.title}-${tech.name}`}
                    className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-3"
                  >
                    <span
                      className="text-2xl"
                      style={{ color: tech.color }}
                      role="img"
                      aria-label={tech.name}
                    >
                      {tech.icon}
                    </span>
                    <span className="text-sm font-medium text-white md:text-base">
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
