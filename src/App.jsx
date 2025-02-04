import './App.css'
import About from './components/About.jsx'
import Formation from './components/Formation.jsx'
import Header from "./components/Header.jsx"
import Projects from './components/Projects.jsx'
import Tecs from './components/Tecs.jsx'

function App() {

  return (
    <div className="relative w-full overflow-x-hidden mx-auto max-w-[100vw]">
      <Header />
      <About />
      <Projects />
      <Tecs />
      <Formation />
      <section id="experiencia" className="min-h-screen pt-20">...</section>
    </div>
  )
}

export default App
