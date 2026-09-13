import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'motion/react';

export interface MagneticProps {
  children: React.ReactNode;
  strength?: number; // Attraction intensity multiplier (default: 0.32)
  maxDistance?: number; // Maximum translation in px (default: 12)
  className?: string;
  innerClassName?: string;
  style?: React.CSSProperties;
  innerStyle?: React.CSSProperties;
  /** When true, outer container acts as hit-target while only inner container translates */
  innerOnly?: boolean;
}

export const Magnetic: React.FC<MagneticProps> = ({
  children,
  strength = 0.32,
  maxDistance = 12,
  className = '',
  innerClassName = '',
  style,
  innerStyle,
  innerOnly = false,
}) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Calibrated spring physics: snappy attraction with subtle elastic bounce
  const springConfig = { damping: 20, stiffness: 320, mass: 0.25 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  // Accessibility: render static container for reduced motion preferences
  if (shouldReduceMotion) {
    return (
      <div className={`magnetic-root ${className}`} style={style}>
        {children}
      </div>
    );
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!rootRef.current) return;
    const rect = rootRef.current.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;

    // Clamp translation to maxDistance to preserve architectural layout
    const clampedX = Math.max(-maxDistance, Math.min(maxDistance, deltaX));
    const clampedY = Math.max(-maxDistance, Math.min(maxDistance, deltaY));

    x.set(clampedX);
    y.set(clampedY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  if (innerOnly) {
    return (
      <div
        ref={rootRef}
        className={`magnetic-hit-zone ${className}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          ...style,
        }}
      >
        <motion.div
          className={`magnetic-inner ${innerClassName}`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            x: springX,
            y: springY,
            ...innerStyle,
          }}
        >
          {children}
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      ref={rootRef}
      className={`magnetic-root ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        display: 'inline-flex',
        x: springX,
        y: springY,
        ...style,
      }}
    >
      {children}
    </motion.div>
  );
};
