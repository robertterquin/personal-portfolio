import React from 'react';
import { timelineData } from '../data/portfolioData';

export const TimelineSection: React.FC = () => {
  return (
    <section id="experience" className="minimal-experience-section">
      <div className="experience-header">
        <span className="section-label">Experience</span>
        <h2 className="section-title">Career &amp; Education</h2>
      </div>

      <div className="experience-ledger">
        {timelineData.map((item) => (
          <div key={item.role} className="experience-row">
            <div className="experience-info">
              <h3 className="experience-role">{item.role}</h3>
              <span className="experience-org">{item.organization}</span>
            </div>
            <span className="experience-period">{item.period}</span>
          </div>
        ))}
      </div>
    </section>
  );
};
