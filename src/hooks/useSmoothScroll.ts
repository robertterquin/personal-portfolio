import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

/** GSAP ScrollSmoother on #smooth-wrapper / #smooth-content. Skipped for reduced motion. */
export function useSmoothScroll(): void {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const header = document.querySelector<HTMLElement>('.site-header');
    // position: sticky can't work inside the transformed content, so cancel the content's shift on the header.
    const smoother = ScrollSmoother.create({
      wrapper: '#smooth-wrapper',
      content: '#smooth-content',
      smooth: 1.1,
      effects: false,
      smoothTouch: false,
      onUpdate: (self) => {
        // On touch devices (smoothTouch: false) scrolling stays native and sticky keeps working.
        const smoothing = self.wrapper().style.position === 'fixed';
        if (header) gsap.set(header, { y: smoothing ? self.scrollTop() : 0 });
      },
    });

    // Native hash jumps measure the transformed layout, so route in-page links through the smoother.
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element).closest<HTMLAnchorElement>('a[href^="#"]');
      const id = link?.getAttribute('href')?.slice(1);
      const target = id ? document.getElementById(id) : null;
      if (!target) return;
      e.preventDefault();
      smoother.scrollTo(target, true, 'top 40px');
      history.replaceState(null, '', `#${id}`);
      if (target.tabIndex >= 0 || target.hasAttribute('tabindex')) target.focus({ preventScroll: true });
    };
    document.addEventListener('click', onClick);

    return () => {
      document.removeEventListener('click', onClick);
      smoother.kill();
      if (header) gsap.set(header, { clearProps: 'transform' });
    };
  }, []);
}
