import './App.css'
import About from './components/About.jsx'
import Header from "./components/Header.jsx"
import Projects from './components/Projects.jsx'

function App() {
  return (
    <div className="relative">
      <Header />
      <About />
      <Projects />
      <section id="tecnologias" className="min-h-screen pt-20">...</section>
      <section id="formacion" className="min-h-screen pt-20">...</section>
      <section id="experiencia" className="min-h-screen pt-20">...</section>
    </div>
  )
}

export default App
