import Navbar from './assets/components/Navbar';
import Hero from './assets/components/Hero';
import About from './assets/components/About';
import Skills from './assets/components/Skills';
import Projects from './assets/components/Projects';
import Experience from './assets/components/Experience';
import Contact from './assets/components/Contact';
import Footer from './assets/components/Footer';
import ThemeSettings from './assets/components/ThemeSettings';
import './App.css'

function App() {
  return (
    <div className="app">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Contact />
      <Footer />
      <ThemeSettings />
    </div>
  );
}

export default App;

