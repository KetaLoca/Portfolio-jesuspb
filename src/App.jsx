import './App.css'
import About from './components/About.jsx'
import Atmosphere from './components/Atmosphere.jsx'
import Experience from './components/Experience.jsx'
import Formation from './components/Formation.jsx'
import Header from "./components/Header.jsx"
import Projects from './components/Projects.jsx'
import Tecs from './components/Tecs.jsx'

function App() {

  return (
    <div className="relative isolate min-h-screen w-full overflow-x-clip bg-slate-950 text-white">
      <Atmosphere />
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
