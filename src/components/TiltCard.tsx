import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'motion/react';

export interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  maxTilt?: number; 
  scale?: number;
  perspective?: number; 
  glare?: boolean; 
  style?: React.CSSProperties;
  innerStyle?: React.CSSProperties;
}

export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = '',
  innerClassName = '',
  maxTilt = 7,
  scale = 1.02,
  perspective = 1000,
  glare = true,
  style,
  innerStyle,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState<boolean>(false);

  // Normalized mouse coordinates from center: [-0.5, 0.5]
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Natural spring mechanics with damping for physical weight
  const springConfig = { damping: 22, stiffness: 260, mass: 0.5 };
  const rotateX = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [-maxTilt, maxTilt]),
    springConfig
  );
  const rotateY = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [maxTilt, -maxTilt]),
    springConfig
  );

  // If user prefers reduced motion, render clean static element
  if (shouldReduceMotion) {
    return (
      <div className={`tilt-card-root ${className}`} style={style}>
        <div className={`tilt-card-inner ${innerClassName}`} style={innerStyle}>
          {children}
        </div>
      </div>
    );
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const normX = (e.clientX - rect.left) / rect.width - 0.5;
    const normY = (e.clientY - rect.top) / rect.height - 0.5;

    mouseX.set(normX);
    mouseY.set(normY);

    if (glare) {
      const glarePercentX = Math.round((normX + 0.5) * 100);
      const glarePercentY = Math.round((normY + 0.5) * 100);
      cardRef.current.style.setProperty('--glare-x', `${glarePercentX}%`);
      cardRef.current.style.setProperty('--glare-y', `${glarePercentY}%`);
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      ref={cardRef}
      className={`tilt-card-root ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: `${perspective}px`,
        ...style,
      }}
    >
      <motion.div
        className={`tilt-card-inner ${innerClassName}`}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          ...innerStyle,
        }}
        animate={{
          scale: isHovered ? scale : 1,
        }}
        transition={{
          duration: 0.28,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {children}

        {glare && (
          <div className="tilt-glare-overlay" aria-hidden="true" />
        )}
      </motion.div>
    </div>
  );
};
