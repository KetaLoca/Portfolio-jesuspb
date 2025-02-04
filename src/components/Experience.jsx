import { FaCode, FaCalendarAlt, FaTools, FaExternalLinkAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import { SiExpress, SiPostgresql, SiReact, SiDocker } from "react-icons/si";

const Experience = () => {
  const experiencia = {
    empresa: "Landra Sistemas",
    puesto: "Desarrollador Fullstack (Prácticas)",
    periodo: "Junio 2024 - Octubre 2024",
    tecnologias: [
      { icon: <SiExpress />, name: "ExpressJS", color: "#6DB33F" },
      { icon: <SiReact />, name: "React", color: "#61DAFB" },
      { icon: <SiPostgresql />, name: "PostgreSQL", color: "#336791" },
      { icon: <SiDocker />, name: "Docker", color: "#2496ED" }
    ],
    responsabilidades: [
      "Desarrollo de features fullstack",
      "Creación de consultas SQL",
      "Implementación de componentes React reutilizables",
      "Integración de APIs REST con ExpressJS",
    ]
  };

  return (
    <section id="experiencia" className="w-screen bg-gradient-to-br from-gray-700 to-gray-900 py-16 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-12 text-white flex items-center justify-center gap-3"
        >
          <FaCode className="text-blue-400" />
          Experiencia Profesional
        </motion.h2>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Tarjeta izquierda - Información de la empresa */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 lg:sticky lg:top-24"
          >
            <div className="flex flex-col items-center mb-6">
              <div className="w-32 h-32 rounded-full bg-blue-600/20 flex items-center justify-center mb-4 border-2 border-blue-400">
                <span className="text-4xl font-bold text-white">LS</span>
              </div>
              <h3 className="text-2xl font-bold text-white text-center">{experiencia.empresa}</h3>
              <p className="text-blue-300 text-lg text-center mt-2">{experiencia.puesto}</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <FaCalendarAlt className="text-blue-400 text-xl" />
                <span className="text-white/90">{experiencia.periodo}</span>
              </div>

              <div className="flex items-center gap-3">
                <FaTools className="text-blue-400 text-xl" />
                <span className="text-white/90">Tecnologías principales:</span>
              </div>

              <div className="flex flex-wrap gap-3">
                {experiencia.tecnologias.map((tech, index) => (
                  <motion.div
                    key={tech.name}
                    whileHover={{ scale: 1.05 }}
                    className="px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm flex items-center gap-2 border border-white/10"
                  >
                    <span style={{ color: tech.color }}>{tech.icon}</span>
                    <span className="text-white/90 text-sm">{tech.name}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Tarjeta derecha - Responsabilidades */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 bg-white/5 backdrop-blur-lg rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300"
          >
            <h4 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <FaExternalLinkAlt className="text-blue-400" />
              Principales Responsabilidades
            </h4>

            <div className="grid md:grid-cols-2 gap-6">
              {experiencia.responsabilidades.map((responsabilidad, index) => (
                <motion.div
                  key={index}
                  whileHover={{ translateX: 5 }}
                  className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors duration-300 border border-white/10"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-600/30 flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-400">#{index + 1}</span>
                    </div>
                    <p className="text-white/90">{responsabilidad}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Experience;