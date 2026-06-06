import './App.css'
import About from './components/About.jsx'
import Experience from './components/Experience.jsx'
import Formation from './components/Formation.jsx'
import Header from "./components/Header.jsx"
import Projects from './components/Projects.jsx'
import Tecs from './components/Tecs.jsx'

function App() {

  return (
    <div className="relative min-h-screen w-full overflow-x-clip bg-slate-950 text-white">
      {/* Atmósfera global: rejilla tenue + resplandores cyan/azul fijos. Da una
          textura continua a toda la página; las secciones van translúcidas
          encima y dejan ver este fondo (sustituye a la cadena de gradientes). */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
        <div className="app-grid absolute inset-0" />
        <div className="absolute -top-40 left-1/2 h-[42rem] w-[60rem] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[170px]" />
        <div className="absolute top-1/2 -right-48 h-[36rem] w-[36rem] rounded-full bg-blue-600/10 blur-[170px]" />
        <div className="absolute bottom-0 -left-48 h-[34rem] w-[34rem] rounded-full bg-cyan-500/[0.07] blur-[170px]" />
      </div>
      <Header />
      <About />
      <Experience />
      <Tecs />
      <Projects />
      <Formation />
    </div>
  )
}

export default App
