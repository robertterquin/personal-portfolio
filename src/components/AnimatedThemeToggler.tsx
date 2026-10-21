import React, { useCallback, useEffect, useRef } from 'react';
import { flushSync } from 'react-dom';
import type { Theme } from '../types';

interface AnimatedThemeTogglerProps extends React.ComponentPropsWithoutRef<'button'> {
  theme: Theme;
  onThemeChange: () => void;
  duration?: number;
  children: React.ReactNode;
}

// Circle reveal from the click point (or the button's center for keyboard activation).
function getCircleClipPaths(
  cx: number,
  cy: number,
  maxRadius: number,
  viewportWidth: number,
  viewportHeight: number,
  direction: 'out' | 'in'
): [string, string] {
  const at = `${(cx / viewportWidth) * 100}% ${(cy / viewportHeight) * 100}%`;
  const radius = `${(maxRadius * 1.05 / (Math.hypot(viewportWidth, viewportHeight) / Math.SQRT2)) * 100}%`;
  const collapsed = `circle(0% at ${at})`;
  const expanded = `circle(${radius} at ${at})`;
  return direction === 'in' ? [expanded, collapsed] : [collapsed, expanded];
}

export const AnimatedThemeToggler: React.FC<AnimatedThemeTogglerProps> = ({
  className = '',
  duration = 500,
  theme,
  onThemeChange,
  children,
  onClick,
  ...props
}) => {
  const isDark = theme === 'night';

  const buttonRef = useRef<HTMLButtonElement>(null);
  const isTransitioningRef = useRef(false);
  const activeAnimRef = useRef<Animation | null>(null);

  const cancelAnim = useCallback(() => {
    activeAnimRef.current?.cancel();
    activeAnimRef.current = null;
  }, []);

  useEffect(() => {
    return () => {
      cancelAnim();
      const root = document.documentElement;
      if (root.dataset.magicuiThemeVt !== 'active') return;
      delete root.dataset.magicuiThemeVt;
      delete root.dataset.magicuiThemeDirection;
      root.style.removeProperty('--magicui-theme-toggle-vt-duration');
      root.style.removeProperty('--magicui-theme-vt-clip-from');
    };
  }, [cancelAnim]);

  const toggleTheme = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(e);

      const button = buttonRef.current;
      if (
        !button ||
        isTransitioningRef.current ||
        document.documentElement.dataset.magicuiThemeVt === 'active'
      ) {
        return;
      }

      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      let x: number;
      let y: number;
      if (e.clientX && e.clientY) {
        x = e.clientX;
        y = e.clientY;
      } else {
        const { top, left, width, height } = button.getBoundingClientRect();
        x = left + width / 2;
        y = top + height / 2;
      }

      const maxRadius = Math.hypot(
        Math.max(x, viewportWidth - x),
        Math.max(y, viewportHeight - y)
      );

      const direction: 'out' | 'in' = isDark ? 'out' : 'in';

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (typeof document.startViewTransition !== 'function' || prefersReducedMotion) {
        onThemeChange();
        return;
      }

      const clipPath = getCircleClipPaths(x, y, maxRadius, viewportWidth, viewportHeight, direction);

      const root = document.documentElement;
      root.dataset.magicuiThemeVt = 'active';
      root.dataset.magicuiThemeDirection = direction;
      root.style.setProperty('--magicui-theme-toggle-vt-duration', `${duration}ms`);
      root.style.setProperty('--magicui-theme-vt-clip-from', clipPath[0]);

      const cleanup = () => {
        isTransitioningRef.current = false;
        delete root.dataset.magicuiThemeVt;
        delete root.dataset.magicuiThemeDirection;
        root.style.removeProperty('--magicui-theme-toggle-vt-duration');
        root.style.removeProperty('--magicui-theme-vt-clip-from');
        cancelAnim();
      };

      isTransitioningRef.current = true;
      const transition = document.startViewTransition(() => {
        flushSync(onThemeChange);
      });

      if (typeof transition?.finished?.finally === 'function') {
        transition.finished.finally(cleanup).catch(() => {});
      } else {
        cleanup();
      }

      transition?.ready
        ?.then(() => {
          const targetPseudo =
            direction === 'in' ? '::view-transition-old(root)' : '::view-transition-new(root)';

          activeAnimRef.current = document.documentElement.animate(
            { clipPath },
            {
              duration,
              easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
              fill: 'forwards',
              pseudoElement: targetPseudo,
            }
          );
        })
        .catch(() => {});
    },
    [duration, isDark, onThemeChange, cancelAnim, onClick]
  );

  return (
    <button type="button" ref={buttonRef} onClick={toggleTheme} className={className} {...props}>
      {children}
    </button>
  );
};
