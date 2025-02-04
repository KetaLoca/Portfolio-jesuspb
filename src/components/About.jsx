import React from "react";

const About = () => {
  return (
    <section
      id="sobre-mi"
      className="w-full bg-gray-700 py-12 md:py-16 lg:py-20 relative left-1/2 right-1/2 -translate-x-1/2"
    >
      <div className="max-w-5xl mx-auto w-full px-4 sm:px-6 flex flex-col lg:flex-row items-center lg:items-start">
        {/* Imagen en el lado izquierdo */}
        <div className="hidden lg:block lg:w-1/3 mr-10">
          <h3 className="font-bold text-white text-center mb-1 bg-blue-700/70">Jesús Pérez Bañobre</h3>
          <img
            src="/Foto.jpg"
            alt="Jesús Pérez Bañobre"
            className="rounded-lg shadow-lg"
          />
        </div>

        {/* Contenido textual */}
        <div className="lg:w-2/3 flex flex-col items-center lg:items-center justify-center">
          {/* Texto descriptivo */}
          <div className="mb-8 md:mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4 mt-5">
              Sobre mí
            </h2>
            <p className="text-white text-base md:text-lg leading-relaxed">
              Soy un joven de 25 años con muchas ganas de trabajar. El
              desarrollo de software me apasiona y estoy deseando seguir
              creciendo como programador. He estado aprendiendo y
              empleando distintas tecnologías y tengo la capacidad de
              adaptarme a cualquier framework o lenguaje que pudiese
              necesitar en el futuro.
            </p>
          </div>

          {/* Información de contacto */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 mb-8 md:mb-12">
            <a
              href="mailto:xesuspb@gmail.com"
              className="flex items-center text-gray-700 hover:text-indigo-600 transition-colors text-sm sm:text-base"
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
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              xesuspb@gmail.com
            </a>

            <div className="hidden sm:block w-px h-6 bg-gray-300" />

            <a
              href="tel:+34647736793"
              className="flex items-center text-gray-700 hover:text-indigo-600 transition-colors text-sm sm:text-base"
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
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              +34 647 736 793
            </a>
          </div>

          {/* Botón CV */}
          <div className="text-center">
            <a
              href="/curriculum.pdf"
              download="JesusPerezBanobre_CV.pdf"
              className="inline-flex items-center px-6 py-3 bg-green-800/80 hover:bg-green-900/70 text-white rounded-lg font-medium transition-colors duration-200 text-sm sm:text-base"
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
      </div>
    </section>
  );
};

export default About;
