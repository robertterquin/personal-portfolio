import Landing from './pages/Landing/Landing';
import TechStack from './pages/TechStack/TechStack';
import Projects from './pages/Projects/Projects';
import Certification from './pages/Certification/Certification';
import Contact from './pages/Contact/Contact';

function App() {
  return (
    <div className="scroll-smooth bg-gradient-to-br from-mono-50 via-mono-100 to-mono-0">
      <Landing />
      <TechStack />
      <Projects />
      <Certification />
      <Contact />
    </div>
  );
}

export default App;
