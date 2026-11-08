import './styles/app.css';
import { useTheme, useSmoothScroll } from './hooks';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ContactStrip } from './components/ContactStrip';
import { WorkSection } from './components/WorkSection';
import { ToolkitSection } from './components/ToolkitSection';
import { ExperienceSection } from './components/ExperienceSection';
import { GithubActivity } from './components/GithubActivity';
import { Footer } from './components/Footer';

function App() {
  const { theme, toggleTheme } = useTheme();
  useSmoothScroll();

  return (
    <div className="dossier-app">
      <a href="#main-content" className="skip-link">Skip to content</a>

      <div id="smooth-wrapper">
        <div id="smooth-content">
          <div className="dossier-container">
            <Header
              theme={theme}
              onToggleTheme={toggleTheme}
            />

            <main id="main-content" tabIndex={-1}>
              <div className="view-fade-in">
                <Hero />
                <ContactStrip />
                <WorkSection />
                <ToolkitSection />
                <ExperienceSection />
                <GithubActivity />
              </div>
            </main>

            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
