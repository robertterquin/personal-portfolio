import React from 'react';
import { motion, useReducedMotion, type Variants } from 'motion/react';
import { timelineData } from '../data/portfolioData';

const timelineListVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const timelineItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 260,
      damping: 28,
      mass: 0.7,
    },
  },
};

export const TimelineSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const isReducedMotion = Boolean(shouldReduceMotion);

  return (
    <section id="experience" className="minimal-experience-section">
      <motion.div
        className="experience-header"
        initial={isReducedMotion ? false : { opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{
          type: 'spring',
          stiffness: 240,
          damping: 28,
          mass: 0.7,
        }}
      >
        <span className="section-label">Experience</span>
        <h2 className="section-title">Career &amp; Education</h2>
      </motion.div>

      <motion.div
        className="experience-ledger"
        initial={isReducedMotion ? false : 'hidden'}
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={isReducedMotion ? undefined : timelineListVariants}
      >
        {timelineData.map((item) => (
          <motion.div
            key={item.role}
            className="experience-row"
            variants={isReducedMotion ? undefined : timelineItemVariants}
          >
            <div className="experience-info">
              <h3 className="experience-role">{item.role}</h3>
              <span className="experience-org">{item.organization}</span>
            </div>
            <span className="experience-period">{item.period}</span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};
