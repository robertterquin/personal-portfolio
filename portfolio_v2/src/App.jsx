import Landing from './pages/Landing/Landing';
import About from './pages/About/About';
import Projects from './pages/Projects/Projects';
import Certification from './pages/Certification/Certification';
import Contact from './pages/Contact/Contact';

function App() {
  return (
    <div className="scroll-smooth bg-gradient-to-br from-slate-950 via-gray-900 to-black">
      <Landing />
      <About />
      <Projects />
      <Certification />
      <Contact />
    </div>
  );
}

export default App;
