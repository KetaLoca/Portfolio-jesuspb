import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Projects = () => {
    const projects = [
        {
            id: 1,
            title: "CrazyWeekEnd - FRONTEND",
            description: "Frontend de una plataforma para ofertar y alquilar casas rurales. Refleja mi capacidad para construir interfaces de producto con React, routing, estado y una experiencia responsive cuidada.",
            image: "/frontend-buscador.png",
            deployment: "https://crazyweekend570.jesuspb.dev",
            github: "https://github.com/KetaLoca/CrazyWeekEnd"
        },
        {
            id: 2,
            title: "CrazyWeekEnd - BACKEND",
            description: "API REST construida con ExpressJS y PostgreSQL, aplicando buenas prácticas de arquitectura, autenticación, integridad de datos y separación clara de responsabilidades.",
            image: "/backend.png",
            deployment: "https://backend.jesuspb.dev/alojamientos",
            github: "https://github.com/KetaLoca/CrazyWeekEnd_API_Express"
        },
        {
            id: 3,
            title: "Despliegue Docker + Kubernetes",
            description: "He levantado y opero un cluster bare metal de Kubernetes en Hetzner donde despliego servicios propios con dominios, subdominios, TLS y automatización del ciclo de despliegue.",
            image: "/kubernetes.png",
            github: "https://github.com/KetaLoca/k8s-CrazyWeekEnd"
        },
        {
            id: 4,
            title: "PORTFOLIO - Jesús Pérez Bañobre",
            description: 'Este portfolio también forma parte de mi stack real: frontend en React, contenedorización con Docker y despliegue en Kubernetes dentro de mi entorno personal.',
            image: "/portfolio.png",
            github: "https://github.com/KetaLoca/Portfolio-jesuspb",
        },

        {
            id: 5,
            title: "CrazyWeekEnd - Android APP",
            description: "Para mi tfg desarrollé una APP de booking de casas rurales pero para Android nativo usando Kotlin y Firebase para el backend. Es anterior a la APP web y tiene menos funcionalidades.",
            image: "/FutureMainActivity.png",
            github: "https://github.com/KetaLoca/CrazyWeekEnd570"
        }
    ];

    const handleOnClick = (link) => {
        window.open(link, "_blank")
    }

    const swiperProps = {
        modules: [Navigation, Pagination],
        spaceBetween: 30,
        navigation: true,
        pagination: { clickable: true },
        breakpoints: {
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
        },
        className: "w-full h-full py-10"
    };

    return (
        <section id='proyectos' className="w-full overflow-hidden bg-gradient-to-b from-blue-300/50 to-gray-500 py-16">
            <div className="mx-auto max-w-[1360px] px-4 sm:px-6 md:px-8">
                <div className="max-w-3xl">
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-700">
                        Proyectos
                    </p>
                    <h2 className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl">
                        Trabajo personal que aterriza mi perfil técnico
                    </h2>
                    <p className="mt-4 text-base leading-relaxed text-slate-800 md:text-lg">
                        Estos proyectos muestran la combinación de producto, backend e infraestructura
                        con la que trabajo hoy. No son solo demos visuales: varios han estado o siguen
                        estando desplegados en entornos reales.
                    </p>
                </div>

                <Swiper {...swiperProps}>
                    {projects.map((project) => (
                        <SwiperSlide key={project.id}>
                            <div className="mb-8 mt-6 flex h-[500px] flex-col overflow-hidden rounded-xl bg-gradient-to-b from-gray-700 to-gray-800 shadow-lg">
                                <div className="relative h-64 max-h-54">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                </div>

                                <div className="flex flex-1 flex-col p-6">
                                    <h3 className="mb-3 text-xl font-bold text-emerald-300">{project.title}</h3>
                                    <p className="mb-4 flex-1 text-white">{project.description}</p>

                                    <div className="mt-auto flex gap-3">
                                        {project.deployment && (
                                            <button
                                                onClick={() => { handleOnClick(project.deployment) }}
                                                className="flex-1 rounded-lg bg-blue-600 px-4 py-2 text-center text-white transition-colors hover:bg-blue-700"
                                            >
                                                Ver Demo
                                            </button>
                                        )}
                                        {project.github && (
                                            <button
                                                onClick={() => { handleOnClick(project.github) }}
                                                className="flex-1 rounded-lg bg-gray-800 px-4 py-2 text-center text-white transition-colors hover:bg-gray-900"
                                            >
                                                GitHub
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default Projects;
