import { FaBook, FaLaptopCode, FaSchool } from "react-icons/fa";
import Reveal from "./Reveal";

const Formation = () => {
  const formations = [
      {
        title: "Técnico Superior en Desarrollo de Aplicaciones Multiplataforma",
        year: "2022-2024",
        icon: <FaLaptopCode />,
        details: [
          "Desarrollo de aplicaciones multiplataforma y web",
          "Programación orientada a objetos y diseño de software",
          "Diseño de interfaces multiplataforma",
          "Gestión de bases de datos relacionales",
          "Integración de APIs REST",
        ]
      },
      {
        title: "Bachillerato de Ciencias",
        year: "2019-2021",
        icon: <FaSchool />,
        details: [
          "Inglés B1 para documentación y comunicación técnica",
          "Matemáticas avanzadas",
          "Física",
        ]
      }
  ];

  return (
    <section id="formacion" className="w-full py-20 md:py-28">
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 md:px-8">
        <Reveal className="mb-12 max-w-3xl">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.25em] text-cyan-300">
            Base
          </p>
          <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">
            Formación Académica
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-300 md:text-lg">
            Mi base académica antes de orientarme a backend e infraestructura.
          </p>
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-2">

          {formations.map((formacion, index) => (
            <Reveal
              as="article"
              key={formacion.title}
              delay={index * 80}
              rootMargin="0px 0px -100px 0px"
              className="h-full"
            >
              <div className="flex h-full flex-col rounded-[1.75rem] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/15 backdrop-blur md:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-400/30 bg-cyan-500/10 text-xl text-cyan-200">
                    {formacion.icon}
                  </div>
                  <span className="rounded-full border border-white/10 bg-slate-950/60 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-200">
                    {formacion.year}
                  </span>
                </div>

                <h3 className="mt-6 text-2xl font-bold text-white">{formacion.title}</h3>

                <div className="mt-6 space-y-3">
                  {formacion.details.map((detail, i) => (
                    <div key={i} className="flex items-start gap-3 rounded-2xl border border-white/8 bg-slate-950/35 px-4 py-3">
                      <FaBook className="mt-1 flex-shrink-0 text-cyan-300" />
                      <p className="text-sm leading-relaxed text-slate-300 md:text-base">{detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Formation;
