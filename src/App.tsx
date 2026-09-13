import './App.css';
import { useTheme } from './hooks';
import { Header } from './components/Header';
import { Masthead } from './components/Masthead';
import { Snapshot } from './components/Snapshot';
import { WorkSection } from './components/WorkSection';
import { ToolkitSection } from './components/ToolkitSection';
import { TimelineSection } from './components/TimelineSection';
import { GithubActivity } from './components/GithubActivity';
import { Footer } from './components/Footer';

function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="dossier-app">
      <div className="dossier-container">
        <Header
          theme={theme}
          onToggleTheme={toggleTheme}
        />

        <main id="main-content">
          <div className="view-fade-in">
            <Masthead />
            <Snapshot />
            <WorkSection />
            <ToolkitSection />
            <TimelineSection />
            <GithubActivity />
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default App;
