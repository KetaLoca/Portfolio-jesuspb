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
            description: "Frontend hecho en React para una APP de booking de casas rurales. La aplicación demuestra que sé usar las herramientas de React correctamente: React Router, useState(), useEffect(), useContext(), etc...",
            image: "/frontend-buscador.png",
            deployment: "https://crazyweekend570.jesuspb.dev",
            github: "https://github.com/KetaLoca/CrazyWeekEnd"
        },
        {
            id: 2,
            title: "CrazyWeekEnd - BACKEND",
            description: "API Rest hecha con ExpressJS y PostgreSQL siguiendo buenas prácticas como: patrón de diseño MVC, passwords hasheadas con bcrypt, Jwebtokens, cookies, integridad en la base de datos, etc...",
            image: "/frontend-buscador.png",
            deployment: "https://backend.jesuspb.dev/alojamientos",
            github: "https://github.com/KetaLoca/CrazyWeekEnd_API_Express"
        },
        {
            id: 3,
            title: "Mi propio portfolio",
            description: "Descripción breve del proyecto 3.",
            image: "/frontend-buscador.png",
            github: "https://github.com/KetaLoca/Portfolio-jesuspb",
        },
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
        className: "w-full h-full py-12"
    };

    return (
        <section id='proyectos' className="w-screen overflow-hidden bg-blue-300/50">
            <Swiper {...swiperProps}>
                {projects.map((project) => (
                    <SwiperSlide key={project.id}>
                        <div className="h-[500px] bg-gray-700 rounded-xl shadow-lg m-4 overflow-hidden flex flex-col">
                            {/* Imagen con overlay */}
                            <div className="relative h-64">
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