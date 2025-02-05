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
            description: "Página web que permite ofertar y alquilar casas rurales. La aplicación demuestra que entiendo las herramientas que ofrece React: React Router, useState(), useEffect(), useContext(), etc...",
            image: "/frontend-buscador.png",
            deployment: "https://crazyweekend570.jesuspb.dev",
            github: "https://github.com/KetaLoca/CrazyWeekEnd"
        },
        {
            id: 2,
            title: "CrazyWeekEnd - BACKEND",
            description: "API Rest hecha con ExpressJS y PostgreSQL siguiendo buenas prácticas: patrón de diseño MVC, passwords hasheadas con bcrypt, Jwebtokens, cookies, integridad en la base de datos, etc...",
            image: "/backend.png",
            deployment: "https://backend.jesuspb.dev/alojamientos",
            github: "https://github.com/KetaLoca/CrazyWeekEnd_API_Express"
        },
        {
            id: 3,
            title: "Despliegue Docker + Kubernetes",
            description: "Tengo un clúster de kubernetes alojado en DigitalOcean, y en ese clúster he desplegado el frontend de mi APP, el backend y mi portfolio. Está desplegado con mis propios dominios, subdominios y cifrado SSL.",
            image: "/kubernetes.png",
            github: "https://github.com/KetaLoca/k8s-CrazyWeekEnd"
        },
        {
            id: 4,
            title: "PORTFOLIO - Jesús Pérez Bañobre",
            description: 'Aunque estoy más enfocado al backend, creo que este portfolio demuestra mi capacidad para trabajar también en el frontend usando React y Tailwindcss para crear una buena web con "responsive design" y un diseño amigable',
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
        className: "w-full h-full py-12 px-4"
    };

    return (
        <section id='proyectos' className="w-screen overflow-hidden bg-blue-300/50">
            <Swiper {...swiperProps}>
                {projects.map((project) => (
                    <SwiperSlide key={project.id}>
                        <div className="h-[500px] bg-gray-700 rounded-xl shadow-lg m-4 overflow-hidden flex flex-col mb-8 mt-6">
                            {/* Imagen con overlay */}
                            <div className="relative h-64 max-h-54">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            </div>

                            {/* Contenido */}
                            <div className="p-6 flex-1 flex flex-col">
                                <h3 className="text-xl text-green-700/80 font-bold mb-3">{project.title}</h3>
                                <p className="text-white mb-4 flex-1">{project.description}</p>

                                {/* Botones */}
                                <div className="flex gap-3 mt-auto">
                                    {project.deployment && (
                                        <button
                                            onClick={() => { handleOnClick(project.deployment) }}
                                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex-1 text-center"
                                        >
                                            Ver Demo
                                        </button>
                                    )}
                                    {project.github && (
                                        <button
                                            onClick={() => { handleOnClick(project.github) }}
                                            className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors flex-1 text-center"
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
        </section>
    );
};

export default Projects;