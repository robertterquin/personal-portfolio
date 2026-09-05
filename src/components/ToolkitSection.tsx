import React from 'react';
import { ArrowUpRight, Check } from 'lucide-react';
import { credentialsData } from '../data/portfolioData';

interface CapabilityGroup {
  code: string;
  category: string;
  focus: string;
  items: { name: string; detail: string }[];
}

const capabilityGroups: CapabilityGroup[] = [
  {
    code: '01',
    category: 'Mobile Systems & Architecture',
    focus: 'Cross-platform engineering, offline-first synchronization, and state management.',
    items: [
      { name: 'Flutter & Dart', detail: 'Core Framework & Native Channels' },
      { name: 'Offline Data Sync', detail: 'SQLite, Supabase, Local Caching' },
      { name: 'Android Studio & SDKs', detail: 'Gradle Pipelines, Emulation, APKs' },
      { name: 'Reactive State', detail: 'Provider, Riverpod, Event Streams' },
    ],
  },
  {
    code: '02',
    category: 'Web & Full-Stack Interfaces',
    focus: 'Component architecture, strict typing, and high-performance rendering.',
    items: [
      { name: 'React', detail: 'Custom Hooks, SPA Architecture, Vite' },
      { name: 'TypeScript', detail: 'Strict Type Systems & Interface Contracts' },
      { name: 'Tailwind CSS', detail: 'Design Tokens, Responsive Grid Systems' },
      { name: 'HTML5 & Modern CSS', detail: 'Certified Specialist Standards' },
    ],
  },
  {
    code: '03',
    category: 'Backend & Data Infrastructure',
    focus: 'Relational schema modeling, RESTful microservices, and secure authentication.',
    items: [
      { name: 'Node.js & Express', detail: 'REST APIs, Middleware, Service Routing' },
      { name: 'Supabase & Cloud DB', detail: 'PostgreSQL, Row Level Security, Realtime' },
      { name: 'MySQL (Certified)', detail: 'Relational Schema Design & Query Indexing' },
      { name: 'Authentication Layers', detail: 'JWT Tokens, OAuth, Session Guards' },
    ],
  },
  {
    code: '04',
    category: 'Core Engineering & Security',
    focus: 'Defensive cybersecurity standards, version control, and computer architecture.',
    items: [
      { name: 'Java (Oracle Certified)', detail: 'OOP Patterns & Enterprise Foundations' },
      { name: 'Python & C', detail: 'Algorithms, Data Automation, Memory Concepts' },
      { name: 'Cybersecurity Fundamentals', detail: 'Mitigation, Threat Modeling, Defensive Coding' },
      { name: 'Git & Deployment', detail: 'Branch Workflows, CI/CD, Edge Networks' },
    ],
  },
];

export const ToolkitSection: React.FC = () => {
  return (
    <section id="toolkit" className="minimal-toolkit-section">
      <div className="toolkit-two-col">
        {/* Left Column: Architectural Capability Spec Sheet */}
        <div className="toolkit-col toolkit-tools-col">
          <div className="section-title-wrap">
            <span className="section-label">Technical Specification</span>
            <h2 className="section-title">Capabilities &amp; Stack</h2>
          </div>

          <div className="capability-spec-ledger">
            {capabilityGroups.map((group) => (
              <div key={group.code} className="spec-group-row">
                <div className="spec-group-header">
                  <span className="spec-code">// {group.code}</span>
                  <h3 className="spec-cat-title">{group.category}</h3>
                </div>
                <p className="spec-focus-desc">{group.focus}</p>

                <div className="spec-items-table">
                  {group.items.map((item) => (
                    <div key={item.name} className="spec-item-line">
                      <span className="spec-item-name">
                        <Check size={12} className="spec-check-icon" />
                        <strong>{item.name}</strong>
                      </span>
                      <span className="spec-item-detail">{item.detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Verified Credentials & Doctrine */}
        <div className="toolkit-col toolkit-cred-col">
          <div className="section-title-wrap">
            <span className="section-label">Verified Record</span>
            <h2 className="section-title">Credentials &amp; Proof</h2>
          </div>

          <div className="chronological-ledger">
            {[
              {
                year: '2025',
                items: credentialsData.filter((c) => c.year === '2025'),
              },
              {
                year: '2024',
                items: credentialsData.filter((c) => c.year === '2024'),
              },
            ].map((group) => (
              <div key={group.year} className="ledger-year-section">
                <div className="ledger-year-header">
                  <span className="ledger-year-tag">// {group.year}</span>
                  <span className="ledger-year-rule" aria-hidden="true"></span>
                </div>

                <div className="ledger-year-list">
                  {group.items.map((item) => (
                    <a
                      key={item.title + item.year}
                      href={item.image}
                      target="_blank"
                      rel="noreferrer"
                      className="ledger-row"
                      aria-label={`Inspect ${item.title} certificate`}
                    >
                      <span className={`ledger-type-tag ${item.type === 'Award' ? 'type-award' : 'type-cert'}`}>
                        {item.type === 'Award' ? 'HONOR' : 'CERT'}
                      </span>

                      <div className="ledger-text-col">
                        <strong className="ledger-title">{item.title}</strong>
                        <span className="ledger-sub-dash">—</span>
                        <span className="ledger-issuer">{item.institution}</span>
                      </div>

                      <ArrowUpRight size={12} className="ledger-arrow" />
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Architectural Doctrine (No Card) */}
          <div className="architectural-doctrine">
            <span className="doctrine-tag">ENGINEERING DOCTRINE // 2026</span>
            <blockquote className="doctrine-quote">
              “Building resilient mobile ecosystems with offline-first synchronization, clean architecture, and defensive cybersecurity standards.”
            </blockquote>
            <span className="doctrine-signoff">— Robert Terquin Laqui</span>
          </div>
        </div>
      </div>
    </section>
  );
};
