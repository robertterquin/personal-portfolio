import React, { useState, useRef, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { personalData, projectsData, skillsData } from '../data/portfolioData';

interface HistoryEntry {
  command: string;
  output: React.ReactNode;
  type?: 'input' | 'output' | 'error' | 'success';
}

export const SystemTerminal: React.FC = () => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<HistoryEntry[]>([
    {
      command: 'init',
      output: (
        <div>
          <p className="term-welcome-line">
            <span className="term-highlight">Robert Terquin</span> — Interactive Terminal
          </p>
          <p className="term-hint-line">
            Type <span className="term-code">help</span> or click a command below to explore.
          </p>
        </div>
      ),
      type: 'output',
    },
  ]);

  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const executeCommand = (cmdText: string) => {
    const raw = cmdText.trim().toLowerCase();
    if (!raw) return;

    let responseNode: React.ReactNode = null;
    let entryType: 'output' | 'error' | 'success' = 'output';

    switch (raw) {
      case 'help':
        responseNode = (
          <div className="term-command-table">
            <p className="term-cmd-header">Available Commands:</p>
            <div className="term-grid">
              <span><b>skills</b></span><span>List core technical skills</span>
              <span><b>projects</b></span><span>Inspect active projects</span>
              <span><b>stats</b></span><span>View academic and system background</span>
              <span><b>ping</b></span><span>Test server latency</span>
              <span><b>contact</b></span><span>Display direct email and links</span>
              <span><b>clear</b></span><span>Clear terminal output</span>
            </div>
          </div>
        );
        break;

      case 'skills':
        responseNode = (
          <div className="term-output-block">
            <p className="term-cmd-header">Technical Competencies:</p>
            <p className="term-text">
              {skillsData.map((s) => s.name).join(' · ')}
            </p>
          </div>
        );
        entryType = 'success';
        break;

      case 'projects':
        responseNode = (
          <div className="term-output-block">
            <p className="term-cmd-header">Featured Projects:</p>
            {projectsData.map((p) => (
              <div key={p.id} className="term-item-row">
                <span className="term-num">[{p.number}]</span>
                <span className="term-name">{p.title}</span>
                <span className="term-sub">— {p.stack}</span>
              </div>
            ))}
          </div>
        );
        entryType = 'success';
        break;

      case 'stats':
        responseNode = (
          <div className="term-output-block">
            <p className="term-cmd-header">Background &amp; Education:</p>
            <div className="term-grid">
              <span>Status:</span><span>{personalData.status}</span>
              <span>Location:</span><span>{personalData.location}</span>
              <span>Degree:</span><span>BS Information Technology (2023-2027)</span>
              <span>Core Stack:</span><span>Flutter, React, Node.js, Cloud DB</span>
            </div>
          </div>
        );
        break;

      case 'ping': {
        const fakeLatency = Math.floor(Math.random() * 14) + 12;
        responseNode = (
          <div className="term-output-block">
            <p className="term-success-text">
              Pinging gateway... Response received in <b>{fakeLatency}ms</b>.
            </p>
          </div>
        );
        entryType = 'success';
        break;
      }

      case 'contact':
        responseNode = (
          <div className="term-output-block">
            <p className="term-cmd-header">Direct Communication:</p>
            <p className="term-text">
              Email: <b>{personalData.email}</b><br />
              Location: <b>{personalData.location}</b><br />
              GitHub: <b>github.com/robertterquin</b>
            </p>
          </div>
        );
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      default:
        responseNode = (
          <p className="term-error-text">
            Command not recognized: <i>{raw}</i>. Type <span className="term-code">help</span> for available commands.
          </p>
        );
        entryType = 'error';
        break;
    }

    setHistory((prev) => [
      ...prev,
      { command: cmdText, output: null, type: 'input' },
      { command: '', output: responseNode, type: entryType },
    ]);
    setInputVal('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeCommand(inputVal);
  };

  return (
    <section id="terminal" className="terminal-section">
      <div className="section-title-wrap terminal-banner">
        <span className="section-label">Developer Console</span>
        <h2 className="section-title">Interactive Workbench</h2>
        <p className="section-subtext">
          Direct terminal interface to inspect system telemetry, architecture specs, and project metadata.
        </p>
      </div>

      <div className="terminal-container">
        <div className="terminal-header-bar">
          <div className="terminal-header-left">
            <Icon icon="lucide:terminal" width={13} height={13} className="term-icon" />
            <span className="term-header-title">SYSTEM WORKBENCH // v3.0</span>
            <span className="term-status-badge">ONLINE</span>
          </div>
          <div className="terminal-header-actions">
            <button
              type="button"
              className="term-mini-btn"
              onClick={() => executeCommand('clear')}
              title="Reset terminal"
            >
              <Icon icon="lucide:rotate-ccw" width={12} height={12} />
              <span>Clear</span>
            </button>
          </div>
        </div>

        <div className="terminal-screen" onClick={() => document.getElementById('term-input')?.focus()}>
          {history.map((item, idx) => (
            <div key={idx} className={`term-line term-line-${item.type || 'output'}`}>
              {item.type === 'input' ? (
                <div className="term-input-echo">
                  <span className="term-prompt">user@portfolio:~$</span>
                  <span className="term-echo-cmd">{item.command}</span>
                </div>
              ) : (
                <div className="term-response">{item.output}</div>
              )}
            </div>
          ))}
          <div ref={terminalEndRef} />
        </div>

        <div className="terminal-input-bar">
          <form onSubmit={handleSubmit} className="term-form">
            <span className="term-prompt">user@portfolio:~$</span>
            <input
              id="term-input"
              type="text"
              className="term-text-input"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="type 'help', 'skills', 'projects'..."
              autoComplete="off"
              spellCheck="false"
            />
            <button type="submit" className="term-submit-btn" aria-label="Execute command">
              <Icon icon="lucide:send" width={13} height={13} />
            </button>
          </form>
        </div>

        <div className="terminal-shortcuts">
          <span className="shortcut-label">COMMANDS:</span>
          {['help', 'skills', 'projects', 'stats', 'ping', 'contact'].map((cmd) => (
            <button
              key={cmd}
              type="button"
              className="shortcut-chip"
              onClick={() => executeCommand(cmd)}
            >
              <Icon icon="lucide:sparkles" width={10} height={10} className="chip-sparkle" />
              <span>{cmd}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
