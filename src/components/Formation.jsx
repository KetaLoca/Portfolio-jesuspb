import { FaGraduationCap, FaBook, FaSchool, FaLaptopCode } from "react-icons/fa";
import { motion } from "framer-motion";

const Formation = () => {
  const formations = [
    {
      title: "Técnico Superior en Desarrollo de Aplicaciones Multiplataforma",
      year: "2022-2024",
      icon: <FaLaptopCode />,
      details: [
        "Desarrollo de aplicaciones Android",
        "Programación en Java, Kotlin y C#",
        "Diseño de interfaces multiplataforma",
        "Gestión de bases de datos relacionales",
        "Programación orientada a objetos",
        "Integración de APIs REST"
      ]
    },
    {
      title: "Bachillerato de Ciencias",
      year: "2019-2021",
      icon: <FaSchool />,
      details: [
        "Inglés B1",
        "Matemáticas avanzadas",
        "Física",
      ]
    }
  ];

  return (
    <section id="formacion" className="w-screen bg-gradient-to-b from-blue-300/50 to-gray-400 py-10 px-20 md:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800 flex items-center justify-center gap-3"
        >
          <FaGraduationCap className="text-blue-600" />
          Formación Académica
        </motion.h2>

        <div className="relative grid md:grid-cols-2 gap-8 gap-y-8 md:gap-x-16 lg:gap-x-24">
          {/* Línea de tiempo decorativa */}
          <div className="hidden md:block absolute left-1/2 w-1 bg-blue-200 h-full top-0 -translate-x-1/2" />

          {formations.map((formacion, index) => (
            <motion.div
              key={formacion.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className={`relative group ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}
            >
              <div className={`p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 h-full
                ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}
              >
                {/* Icono flotante */}
                <div className={`absolute -top-4 ${index % 2 === 0 ? '-right-4 md:-right-8' : '-left-4 md:-left-8'}`}>
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white text-xl mr-1 ml-1">
                    {formacion.icon}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">{formacion.title}</h3>
                <span className="block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm mb-4 text-center">
                  {formacion.year}
                </span>

                <div className="space-y-2">
                  {formacion.details.map((detail, i) => (
                    <div key={i} className="flex items-start gap-2">
                      {index % 2 !== 0 && <FaBook className="text-blue-400 mt-1 flex-shrink-0" />}
                      <p className="text-gray-600">{detail}</p>
                      {index % 2 === 0 && <FaBook className="text-blue-400 mt-1 flex-shrink-0" />}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Formation;