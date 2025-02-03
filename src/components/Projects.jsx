import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Projects = () => {
    const projects = [
        {
            id: 1,
            title: "CrazyWeekEnd - frontend",
            description: "Frontend hecho en React para una APP de booking de casas rurales. La aplicación demuestra que sé usar el conjunto de herramientas y hooks que aporta React.",
            image: "/public/frontend-buscador.png",
            deployment: "https://crazyweekend570.jesuspb.dev",
            github: "https://github.com/KetaLoca/CrazyWeekEnd"
        },
        {
            id: 2,
            title: "CrazyWeekEnd - backend",
            description: "Descripción breve del proyecto 2.",
            image: "/public/frontend-buscador.png",
            deployment: "https://backend.jesuspb.dev/alojamientos",
            github: "https://github.com/KetaLoca/CrazyWeekEnd_API_Express"
        },
        {
            id: 3,
            title: "Proyecto 3",
            description: "Descripción breve del proyecto 3.",
            image: "/public/frontend-buscador.png",
            deployment: "https://github.com/usuario/proyecto3",
        },
    ];

    return (
        <section id='proyectos' className="w-full max-w-[100vw] overflow-hidden py-5 bg-blue-300/50">
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={30}
                slidesPerView={1}
                centeredSlides={true}
                loop={true}
                autoplay={{ delay: 5000 }}
                navigation
                pagination={{ clickable: true }}
                breakpoints={{
                    640: {
                        slidesPerView: 1,
                    },
                    768: {
                        slidesPerView: 2,
                    },
                    1024: {
                        slidesPerView: 3,
                    },
                }}
                className="h-[500px]"
            >
                {projects.map((project) => (
                    <SwiperSlide key={project.id}>
                        <div 
                            className="relative h-full w-full rounded-xl bg-cover bg-center"
                            style={{ backgroundImage: `url(${project.image})` }}
                        >
                            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent">
                                <div className="text-white">
                                    <h3 className="text-xl font-bold mb-2 bg-black">{project.title}</h3>
                                    <p className="text-sm mb-4 line-clamp-3 bg-black">{project.description}</p>
                                    
                                    {(project.deployment || project.github) && (
                                        <div className="flex gap-2">
                                            {project.deployment && (
                                                <a
                                                    href={project.deployment}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors"
                                                >
                                                    Ver Proyecto
                                                </a>
                                            )}
                                            {project.github && (
                                                <a
                                                    href={project.github}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="px-4 py-2 bg-gray-800 hover:bg-gray-900 text-white rounded-lg text-sm transition-colors"
                                                >
                                                    Código GitHub
                                                </a>
                                            )}
                                        </div>
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