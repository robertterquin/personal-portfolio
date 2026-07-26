import Landing from './pages/Landing/Landing';
import TechStack from './pages/TechStack/TechStack';
import Projects from './pages/Projects/Projects';
import Certification from './pages/Certification/Certification';
import Contact from './pages/Contact/Contact';

function App() {
  return (
    <div className="portfolio-canvas scroll-smooth">
      <Landing />
      <TechStack />
      <Projects />
      <Certification />
      <Contact />
    </div>
  );
}

export default App;
