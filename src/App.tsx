import { useState, useEffect } from 'react';
import './App.css';
import { Header } from './components/Header';
import { Masthead } from './components/Masthead';
import { Snapshot } from './components/Snapshot';
import { WorkSection } from './components/WorkSection';
import { ToolkitSection } from './components/ToolkitSection';
import { SystemTerminal } from './components/SystemTerminal';
import { ContactView } from './components/ContactView';
import { Footer } from './components/Footer';

function App() {
  const [theme, setTheme] = useState<'night' | 'day'>(() => {
    const saved = localStorage.getItem('rt_theme');
    if (saved === 'day') return 'day';
    return 'night';
  });

  const [viewMode, setViewMode] = useState<'home' | 'contact'>('home');
  const [manilaTime, setManilaTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Asia/Manila',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      });
      setManilaTime(`${formatter.format(now)} UTC+8`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (theme === 'day') {
      document.documentElement.classList.remove('theme-night');
      document.documentElement.classList.add('theme-day');
    } else {
      document.documentElement.classList.add('theme-night');
      document.documentElement.classList.remove('theme-day');
    }
    localStorage.setItem('rt_theme', theme);
  }, [theme]);

  // Handle hash changes (e.g. clicking #contact or back)
  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === '#contact') {
        setViewMode('contact');
      } else if (
        window.location.hash === '#work' ||
        window.location.hash === '#toolkit' ||
        window.location.hash === '#top'
      ) {
        setViewMode('home');
      }
    };

    window.addEventListener('hashchange', handleHash);
    handleHash();
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'night' ? 'day' : 'night';
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        setTheme(nextTheme);
      });
    } else {
      setTheme(nextTheme);
    }
  };

  const toggleContactView = () => {
    setViewMode((prev) => {
      const next = prev === 'home' ? 'contact' : 'home';
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return next;
    });
  };

  return (
    <div className="dossier-app">
      <div className="dossier-container">
        <Header
          theme={theme}
          onToggleTheme={toggleTheme}
          viewMode={viewMode}
          onToggleContact={toggleContactView}
          manilaTime={manilaTime}
        />

        <main id="main-content">
          {viewMode === 'home' ? (
            <div className="view-fade-in">
              <Masthead onOpenContact={toggleContactView} />
              <Snapshot />
              <WorkSection />
              <ToolkitSection />
              <SystemTerminal />
            </div>
          ) : (
            <div className="view-fade-in">
              <ContactView onBackToPortfolio={() => setViewMode('home')} />
            </div>
          )}
        </main>

        <Footer
          viewMode={viewMode}
          onToggleContact={toggleContactView}
        />
      </div>
    </div>
  );
}

export default App;
