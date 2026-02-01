import Landing from './pages/Landing/Landing';
import About from './pages/About/About';
import Projects from './pages/Projects/Projects';
import Certification from './pages/Certification/Certification';
import Contact from './pages/Contact/Contact';
import './App.css';

function App() {
  return (
    <div className="scroll-smooth">
      <Landing />
      <About />
      <Projects />
      <Certification />
      <Contact />
    </div>
  );
}

export default App;
