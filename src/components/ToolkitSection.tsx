import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ArrowUpRight, Award, GraduationCap } from 'lucide-react';
import { skillsData, credentialsData, type SkillItem } from '../data/portfolioData';

export const ToolkitSection: React.FC = () => {
  const [activeSkillIndex, setActiveSkillIndex] = useState<number>(0);

  const activeSkill: SkillItem = skillsData[activeSkillIndex];

  const handlePrevSkill = () => {
    setActiveSkillIndex((prev) => (prev === 0 ? skillsData.length - 1 : prev - 1));
  };

  const handleNextSkill = () => {
    setActiveSkillIndex((prev) => (prev === skillsData.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="toolkit" className="minimal-toolkit-section">
      <div className="toolkit-two-col">
        {/* Left Column: Interactive Tool Inspector & Cloud */}
        <div className="toolkit-col toolkit-tools-col">
          <span className="section-label">Technical Stack</span>
          <h2 className="section-title">Tools &amp; Capabilities</h2>

          {/* Minimal Tool Inspector Card */}
          <div className="minimal-tool-card" aria-live="polite">
            <div className="tool-card-top">
              <span className="tool-index">
                Skill {String(activeSkillIndex + 1).padStart(2, '0')} /{' '}
                {String(skillsData.length).padStart(2, '0')}
              </span>
              <span className="tool-category">{activeSkill.category}</span>
            </div>

            <div className="tool-card-main">
              <div className="tool-name-row">
                <h3 className="tool-name">{activeSkill.name}</h3>
                <span className="tool-level">{activeSkill.proficiency}</span>
              </div>
              <p className="tool-desc">{activeSkill.description}</p>
            </div>

            <div className="tool-card-footer">
              <span className="tool-hint">Select a skill to inspect</span>
              <div className="tool-nav-arrows">
                <button
                  type="button"
                  className="tool-arrow-btn"
                  onClick={handlePrevSkill}
                  aria-label="Previous skill"
                >
                  <ChevronLeft size={15} />
                </button>
                <button
                  type="button"
                  className="tool-arrow-btn"
                  onClick={handleNextSkill}
                  aria-label="Next skill"
                >
                  <ChevronRight size={15} />
                </button>
              </div>
            </div>
          </div>

          {/* Minimal Skill Chips Cloud */}
          <div className="minimal-skill-cloud" aria-label="Available technologies">
            {skillsData.map((skill, index) => {
              const isActive = index === activeSkillIndex;
              return (
                <button
                  type="button"
                  key={skill.name}
                  className={`skill-pill ${isActive ? 'active' : ''}`}
                  onClick={() => setActiveSkillIndex(index)}
                  aria-pressed={isActive}
                >
                  {skill.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Credentials & Achievements */}
        <div className="toolkit-col toolkit-cred-col">
          <span className="section-label">Credentials</span>
          <h2 className="section-title">Verified Proof</h2>

          <div className="minimal-credentials-list">
            {credentialsData.map((item) => (
              <a
                key={item.index}
                href={item.image}
                target="_blank"
                rel="noreferrer"
                className="minimal-cred-row"
                aria-label={`Inspect ${item.title} certificate`}
              >
                <span className="cred-num">{item.index}</span>
                <div className="cred-details">
                  <strong className="cred-name">{item.title}</strong>
                  <span className="cred-meta">
                    {item.type === 'Degree' ? (
                      <GraduationCap size={11} className="cred-icon" />
                    ) : (
                      <Award size={11} className="cred-icon" />
                    )}
                    <span>{item.institution}</span>
                    <span className="meta-dot">•</span>
                    <span>{item.year}</span>
                  </span>
                </div>
                <ArrowUpRight size={13} className="cred-link-icon" />
              </a>
            ))}
          </div>

          <div className="minimal-philosophy-card">
            <span className="philosophy-title">Engineering Focus</span>
            <p className="philosophy-quote">
              “Building resilient mobile ecosystems with offline-first synchronization, clean architecture, and defensive cybersecurity standards.”
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
