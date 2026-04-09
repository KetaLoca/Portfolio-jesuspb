import './App.css'
import About from './components/About.jsx'
import Experience from './components/Experience.jsx'
import Formation from './components/Formation.jsx'
import Header from "./components/Header.jsx"
import Projects from './components/Projects.jsx'
import Tecs from './components/Tecs.jsx'

function App() {

  return (
    <div className="relative mx-auto w-full max-w-[100vw] overflow-x-hidden bg-slate-950">
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
