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
  /** When true, the transition expands/collapses from the viewport center instead of the button center. */
  fromCenter?: boolean;
  /** Controlled theme value ('day' | 'night' | 'light' | 'dark'). */
  theme?: 'day' | 'night' | 'light' | 'dark';
  /** Called on toggle. Pair with `theme` for controlled usage. */
  onThemeChange?: (nextTheme: 'day' | 'night' | 'light' | 'dark') => void;
  children?: React.ReactNode;
}

function polygonCollapsed(point: string, vertexCount: number): string {
  const pairs = Array.from({ length: vertexCount }, () => point).join(', ');
  return `polygon(${pairs})`;
}

// All coordinates are percentages of the snapshot reference box:
// Resolving coordinates as percentages avoids scaling bugs on Windows fractional display scaling (125%, 150%).
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
  // circle() percentage radii resolve against hypot(w, h) / sqrt(2) of the reference box
  const toRadius = (r: number) =>
    `${(r / (Math.hypot(viewportWidth, viewportHeight) / Math.SQRT2)) * 100}%`;

  let startClip: string;
  let endClip: string;

  switch (variant) {
    case 'circle':
      startClip = `circle(0% at ${point(cx, cy)})`;
      endClip = `circle(${toRadius(maxRadius)} at ${point(cx, cy)})`;
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

  // When direction is 'in' (closing / turning to dark mode):
  // The animation starts at full screen (endClip) and collapses/zooms in to the button (startClip).
  if (direction === 'in') {
    return [endClip, startClip];
  }

  // When direction is 'out' (opening / turning to light mode):
  // The animation expands outward from the button (startClip) to full screen (endClip).
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
        // Use click event coordinates if available, fallback to button center
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

      // Determine animation direction:
      // If currently dark, switching to light -> "out" (open / expand outward from switch)
      // If currently light, switching to dark -> "in" (close / zoom in toward switch)
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

      // Fallback for browsers without View Transitions API or if user prefers reduced motion
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
            // When direction is 'in' (close / dark mode): animate ::view-transition-old(root) shrinking into the switch.
            // When direction is 'out' (open / light mode): animate ::view-transition-new(root) expanding outward from switch.
            const targetPseudo =
              direction === 'in'
                ? '::view-transition-old(root)'
                : '::view-transition-new(root)';

            const anim = document.documentElement.animate(
              {
                clipPath,
              },
              {
                duration,
                easing: variant === 'star' ? 'linear' : 'cubic-bezier(0.16, 1, 0.3, 1)',
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
