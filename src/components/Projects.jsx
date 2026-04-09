import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { FaArrowRight, FaCodeBranch, FaGlobe } from 'react-icons/fa';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Projects = () => {
    const projects = [
        {
            id: 1,
            title: "CrazyWeekEnd - FRONTEND",
            tag: "Frontend",
            description: "Frontend de una plataforma para ofertar y alquilar casas rurales. Refleja mi capacidad para construir interfaces de producto con React, routing, estado y una experiencia responsive cuidada.",
            image: "/frontend-buscador.png",
            deployment: "https://crazyweekend570.jesuspb.dev",
            github: "https://github.com/KetaLoca/CrazyWeekEnd"
        },
        {
            id: 2,
            title: "CrazyWeekEnd - BACKEND",
            tag: "Backend",
            description: "API REST construida con ExpressJS y PostgreSQL, aplicando buenas prácticas de arquitectura, autenticación, integridad de datos y separación clara de responsabilidades.",
            image: "/backend.png",
            deployment: "https://backend.jesuspb.dev/alojamientos",
            github: "https://github.com/KetaLoca/CrazyWeekEnd_API_Express"
        },
        {
            id: 3,
            title: "Despliegue Docker + Kubernetes",
            tag: "Platform",
            description: "He levantado y opero un cluster bare metal de Kubernetes en Hetzner donde despliego servicios propios con dominios, subdominios, TLS y automatización del ciclo de despliegue.",
            image: "/kubernetes.png",
            github: "https://github.com/KetaLoca/k8s-CrazyWeekEnd"
        },
        {
            id: 4,
            title: "PORTFOLIO - Jesús Pérez Bañobre",
            tag: "Portfolio",
            description: 'Este portfolio también forma parte de mi stack real: frontend en React, contenedorización con Docker y despliegue en Kubernetes dentro de mi entorno personal.',
            image: "/portfolio.png",
            github: "https://github.com/KetaLoca/Portfolio-jesuspb",
        },

        {
            id: 5,
            title: "CrazyWeekEnd - Android APP",
            tag: "Mobile",
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
        <section id='proyectos' className="w-full overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 py-16 md:py-20">
            <div className="mx-auto max-w-[1360px] px-4 sm:px-6 md:px-8">
                <div className="mb-10 max-w-3xl md:mb-12">
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
                        Proyectos
                    </p>
                    <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">
                        Trabajo personal que aterriza mi perfil técnico
                    </h2>
                    <p className="mt-4 text-base leading-relaxed text-slate-300 md:text-lg">
                        Estos proyectos muestran la combinación de producto, backend e infraestructura
                        con la que trabajo hoy. No son solo demos visuales: varios han estado o siguen
                        estando desplegados en entornos reales.
                    </p>
                </div>

                <Swiper {...swiperProps}>
                    {projects.map((project) => (
                        <SwiperSlide key={project.id}>
                            <div className="mb-8 mt-2 flex h-[540px] flex-col overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/5 shadow-2xl shadow-black/20 backdrop-blur">
                                <div className="relative h-60">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                                    <span className="absolute left-5 top-5 rounded-full border border-white/15 bg-slate-950/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200 backdrop-blur">
                                        {project.tag}
                                    </span>
                                </div>

                                <div className="flex flex-1 flex-col p-6">
                                    <h3 className="mb-3 text-xl font-bold text-white">{project.title}</h3>
                                    <p className="mb-6 flex-1 text-sm leading-relaxed text-slate-300 md:text-base">{project.description}</p>

                                    <div className="mt-auto flex gap-3">
                                        {project.deployment && (
                                            <button
                                                onClick={() => { handleOnClick(project.deployment) }}
                                                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-cyan-500 px-4 py-3 text-center text-sm font-medium text-slate-950 transition-colors hover:bg-cyan-400"
                                            >
                                                <FaGlobe />
                                                Ver demo
                                            </button>
                                        )}
                                        {project.github && (
                                            <button
                                                onClick={() => { handleOnClick(project.github) }}
                                                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-center text-sm font-medium text-white transition-colors hover:bg-slate-950"
                                            >
                                                <FaCodeBranch />
                                                GitHub
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                <div className="mt-4 flex items-center gap-2 text-sm text-slate-400">
                    <FaArrowRight className="text-cyan-300" />
                    Desliza para ver más proyectos.
                </div>
            </div>
        </section>
    );
};

export default Projects;
