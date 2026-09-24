import React, { useCallback, useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { Icon } from '@iconify/react';

export type TransitionVariant =
  | 'circle'
  | 'square'
  | 'triangle'
  | 'diamond'
  | 'hexagon'
  | 'rectangle'
  | 'star';

export interface AnimatedThemeTogglerProps extends React.ComponentPropsWithoutRef<'button'> {
  duration?: number;
  variant?: TransitionVariant;
  fromCenter?: boolean;
  theme?: 'day' | 'night' | 'light' | 'dark';
  onThemeChange?: (nextTheme: 'day' | 'night' | 'light' | 'dark') => void;
  children?: React.ReactNode;
}

function polygonCollapsed(point: string, vertexCount: number): string {
  const pairs = Array.from({ length: vertexCount }, () => point).join(', ');
  return `polygon(${pairs})`;
}

function getThemeTransitionClipPaths(
  variant: TransitionVariant,
  cx: number,
  cy: number,
  maxRadius: number,
  viewportWidth: number,
  viewportHeight: number,
  direction: 'out' | 'in' = 'out'
): [string, string] {
  const toX = (x: number) => `${(x / viewportWidth) * 100}%`;
  const toY = (y: number) => `${(y / viewportHeight) * 100}%`;
  const point = (x: number, y: number) => `${toX(x)} ${toY(y)}`;
  const toRadius = (r: number) =>
    `${(r / (Math.hypot(viewportWidth, viewportHeight) / Math.SQRT2)) * 100}%`;

  let startClip: string;
  let endClip: string;

  switch (variant) {
    case 'circle':
      startClip = `circle(0% at ${point(cx, cy)})`;
      endClip = `circle(${toRadius(maxRadius * 1.05)} at ${point(cx, cy)})`;
      break;
    case 'square': {
      const halfW = Math.max(cx, viewportWidth - cx);
      const halfH = Math.max(cy, viewportHeight - cy);
      const halfSide = Math.max(halfW, halfH) * 1.05;
      const end = [
        point(cx - halfSide, cy - halfSide),
        point(cx + halfSide, cy - halfSide),
        point(cx + halfSide, cy + halfSide),
        point(cx - halfSide, cy + halfSide),
      ].join(', ');
      startClip = polygonCollapsed(point(cx, cy), 4);
      endClip = `polygon(${end})`;
      break;
    }
    case 'triangle': {
      const scale = maxRadius * 2.2;
      const dx = (Math.sqrt(3) / 2) * scale;
      const verts = [
        point(cx, cy - scale),
        point(cx + dx, cy + 0.5 * scale),
        point(cx - dx, cy + 0.5 * scale),
      ].join(', ');
      startClip = polygonCollapsed(point(cx, cy), 3);
      endClip = `polygon(${verts})`;
      break;
    }
    case 'diamond': {
      const R = maxRadius * Math.SQRT2;
      const end = [
        point(cx, cy - R),
        point(cx + R, cy),
        point(cx, cy + R),
        point(cx - R, cy),
      ].join(', ');
      startClip = polygonCollapsed(point(cx, cy), 4);
      endClip = `polygon(${end})`;
      break;
    }
    case 'hexagon': {
      const R = maxRadius * Math.SQRT2;
      const verts: string[] = [];
      for (let i = 0; i < 6; i++) {
        const a = -Math.PI / 2 + (i * Math.PI) / 3;
        verts.push(point(cx + R * Math.cos(a), cy + R * Math.sin(a)));
      }
      startClip = polygonCollapsed(point(cx, cy), 6);
      endClip = `polygon(${verts.join(', ')})`;
      break;
    }
    case 'rectangle': {
      const halfW = Math.max(cx, viewportWidth - cx);
      const halfH = Math.max(cy, viewportHeight - cy);
      const end = [
        point(cx - halfW, cy - halfH),
        point(cx + halfW, cy - halfH),
        point(cx + halfW, cy + halfH),
        point(cx - halfW, cy + halfH),
      ].join(', ');
      startClip = polygonCollapsed(point(cx, cy), 4);
      endClip = `polygon(${end})`;
      break;
    }
    case 'star': {
      const R = maxRadius * Math.SQRT2 * 1.03;
      const innerRatio = 0.42;
      const starPolygon = (radius: number) => {
        const verts: string[] = [];
        for (let i = 0; i < 5; i++) {
          const outerA = -Math.PI / 2 + (i * 2 * Math.PI) / 5;
          verts.push(point(cx + radius * Math.cos(outerA), cy + radius * Math.sin(outerA)));
          const innerA = outerA + Math.PI / 5;
          verts.push(
            point(
              cx + radius * innerRatio * Math.cos(innerA),
              cy + radius * innerRatio * Math.sin(innerA)
            )
          );
        }
        return `polygon(${verts.join(', ')})`;
      };
      const startR = Math.max(2, R * 0.025);
      startClip = starPolygon(startR);
      endClip = starPolygon(R);
      break;
    }
    default:
      startClip = `circle(0% at ${point(cx, cy)})`;
      endClip = `circle(${toRadius(maxRadius)} at ${point(cx, cy)})`;
      break;
  }

  if (direction === 'in') {
    return [endClip, startClip];
  }

  return [startClip, endClip];
}

export const AnimatedThemeToggler: React.FC<AnimatedThemeTogglerProps> = ({
  className = '',
  duration = 500,
  variant = 'circle',
  fromCenter = false,
  theme,
  onThemeChange,
  children,
  onClick,
  ...props
}) => {
  const isControlled = theme !== undefined;
  const isDarkControlled = theme === 'night' || theme === 'dark';

  const [internalIsDark, setInternalIsDark] = useState(false);
  const isDark = isControlled ? isDarkControlled : internalIsDark;

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

  useEffect(() => {
    if (isControlled) return;

    const updateTheme = () => {
      const hasDark =
        document.documentElement.classList.contains('dark') ||
        document.documentElement.classList.contains('theme-night');
      setInternalIsDark(hasDark);
    };

    updateTheme();

    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, [isControlled]);

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
      if (fromCenter) {
        x = viewportWidth / 2;
        y = viewportHeight / 2;
      } else {
        if (e.clientX && e.clientY) {
          x = e.clientX;
          y = e.clientY;
        } else {
          const { top, left, width, height } = button.getBoundingClientRect();
          x = left + width / 2;
          y = top + height / 2;
        }
      }

      const maxRadius = Math.hypot(
        Math.max(x, viewportWidth - x),
        Math.max(y, viewportHeight - y)
      );

      const nextIsDark = !isDark;
      const direction: 'out' | 'in' = nextIsDark ? 'in' : 'out';

      const applyTheme = () => {
        if (isControlled) {
          const nextVal = theme === 'night' ? 'day' : theme === 'dark' ? 'light' : theme === 'day' ? 'night' : 'dark';
          onThemeChange?.(nextVal);
        } else {
          document.documentElement.classList.toggle('dark');
          setInternalIsDark(nextIsDark);
          localStorage.setItem('theme', nextIsDark ? 'dark' : 'light');
        }
      };

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (typeof document.startViewTransition !== 'function' || prefersReducedMotion) {
        applyTheme();
        return;
      }

      const clipPath = getThemeTransitionClipPaths(
        variant,
        x,
        y,
        maxRadius,
        viewportWidth,
        viewportHeight,
        direction
      );

      const animDuration = duration;
      const animEasing =
        variant === 'star' ? 'linear' : 'cubic-bezier(0.4, 0, 0.2, 1)';

      const root = document.documentElement;
      root.dataset.magicuiThemeVt = 'active';
      root.dataset.magicuiThemeDirection = direction;
      root.style.setProperty('--magicui-theme-toggle-vt-duration', `${animDuration}ms`);
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
        flushSync(applyTheme);
      });

      if (typeof transition?.finished?.finally === 'function') {
        transition.finished.finally(cleanup).catch(() => {});
      } else {
        cleanup();
      }

      const ready = transition?.ready;
      if (ready && typeof ready.then === 'function') {
        ready
          .then(() => {
            const targetPseudo =
              direction === 'in'
                ? '::view-transition-old(root)'
                : '::view-transition-new(root)';

            const anim = document.documentElement.animate(
              {
                clipPath,
              },
              {
                duration: animDuration,
                easing: animEasing,
                fill: 'forwards',
                pseudoElement: targetPseudo,
              }
            );
            activeAnimRef.current = anim;
          })
          .catch(() => {});
      }
    },
    [variant, fromCenter, duration, isDark, isControlled, theme, onThemeChange, cancelAnim, onClick]
  );

  return (
    <button
      type="button"
      ref={buttonRef}
      onClick={toggleTheme}
      className={className}
      aria-label={`Switch to ${isDark ? 'Day' : 'Night'} theme`}
      title={`Switch to ${isDark ? 'Day' : 'Night'} theme`}
      {...props}
    >
      {children ? (
        children
      ) : (
        <>
          <Icon icon={isDark ? 'lucide:sun' : 'lucide:moon'} width={15} height={15} />
          <span className="sr-only">Toggle theme</span>
        </>
      )}
    </button>
  );
};
