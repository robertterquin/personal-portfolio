import { useState, useEffect } from 'react';
import './App.css';
import { Header } from './components/Header';
import { Masthead } from './components/Masthead';
import { Snapshot } from './components/Snapshot';
import { WorkSection } from './components/WorkSection';
import { ToolkitSection } from './components/ToolkitSection';
import { GithubActivity } from './components/GithubActivity';
import { Footer } from './components/Footer';

function App() {
  const [theme, setTheme] = useState<'night' | 'day'>(() => {
    const saved = localStorage.getItem('rt_theme');
    if (saved === 'day') return 'day';
    return 'night';
  });

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

  return (
    <div className="dossier-app">
      <div className="dossier-container">
        <Header
          theme={theme}
          onToggleTheme={toggleTheme}
          manilaTime={manilaTime}
        />

        <main id="main-content">
          <div className="view-fade-in">
            <Masthead />
            <Snapshot />
            <WorkSection />
            <ToolkitSection />
            <GithubActivity />
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default App;
