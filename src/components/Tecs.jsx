import { FaJava, FaGitAlt, FaGithub, FaDocker, FaReact, FaNode } from "react-icons/fa";
import { SiHibernate, SiPostgresql, SiKotlin, SiJavascript, SiExpress, SiKubernetes } from "react-icons/si";
import { TbSql } from "react-icons/tb";


const Tecs = () => {
  const technologies = [
    { name: "Java", icon: <FaJava />, color: "#007396" },
    { name: "Hibernate", icon: <SiHibernate />, color: "#59666C" },
    { name: "PostgreSQL", icon: <SiPostgresql />, color: "#61DAFB" },
    { name: "Kotlin", icon: <SiKotlin />, color: "#7F52FF" },
    { name: "Javascript", icon: <SiJavascript />, color: "#F7DF1E" },
    { name: "React", icon: <FaReact />, color: "#61DAFB" },
    { name: "nodeJS", icon: <FaNode />, color: "#339933" },
    { name: "ExpressJS", icon: <SiExpress />, color: "#000000" },
    { name: "Docker", icon: <FaDocker />, color: "#2496ED" },
    { name: "Kubernetes", icon: <SiKubernetes />, color: "#326CE5" },
    { name: "Git", icon: <FaGitAlt />, color: "#F05032" },
    { name: "Github", icon: <FaGithub />, color: "#181717" },
  ];

  return (
    <section id="tecnologias" className="w-screen bg-gray-700 py-16 px-4 md:px-8">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">
        Mi Stack Tecnológico
      </h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 max-w-6xl mx-auto">
        {technologies.map((tech, index) => (
          <div 
            key={tech.name}
            className="flex flex-col items-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 group"
          >
            <div 
              className="text-5xl mb-4 transition-transform duration-300 hover:scale-110"
              style={{ color: tech.color }}
              role="img"
              aria-label={tech.name}
            >
              {tech.icon}
            </div>
            <span className="text-lg font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
              {tech.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Tecs;