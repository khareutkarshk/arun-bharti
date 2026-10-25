"use client";

import { useEffect, useLayoutEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import type { Lang } from "@/content";

gsap.registerPlugin(ScrollTrigger);

const REVEAL = "[data-reveal], .lines-rise, .shutter, .circuit__map, .seats, [data-count]";

// figures count up once from zero; the real value is in the markup from the start
function count(el: HTMLElement) {
  const value = Number(el.dataset.count);
  if (!value || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const start = performance.now();
  const step = (now: number) => {
    const p = Math.min(1, (now - start) / 1400);
    el.textContent = String(Math.round(value * (1 - Math.pow(1 - p, 4))));
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

export function useMotion(root: RefObject<HTMLElement | null>, lang: Lang, setStage: (n: number) => void) {
  // reveals: once, as each part enters
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    // a clipped shutter never intersects, so its parent is watched in its place
    const watched = new Map<Element, Element[]>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries)
          if (e.isIntersecting) {
            io.unobserve(e.target);
            for (const target of watched.get(e.target) ?? []) {
              target.classList.add("is-in");
              if (target instanceof HTMLElement && target.dataset.count) count(target);
            }
          }
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.05 },
    );
    el.querySelectorAll(REVEAL).forEach((n) => {
      if (n.classList.contains("is-in")) return;
      const host = n.classList.contains("shutter") && n.parentElement ? n.parentElement : n;
      watched.set(host, [...(watched.get(host) ?? []), n]);
      io.observe(host);
    });
    return () => io.disconnect();
  }, [root, lang]);

  // smooth scroll, the hero opening, drift and the held parliament frame
  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

    let lenis: Lenis | undefined;
    const tick = (time: number) => lenis?.raf(time * 1000);
    if (!reduced) {
      lenis = new Lenis({ lerp: 0.12, anchors: true });
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
    }

    const ctx = gsap.context(() => {
      const stages = el.querySelector<HTMLElement>(".parl__track");
      if (stages)
        ScrollTrigger.create({
          trigger: stages,
          start: "top top",
          end: "bottom bottom",
          onUpdate: (s) => setStage(s.progress < 0.36 ? 0 : s.progress < 0.7 ? 1 : 2),
        });

      if (reduced) return;

      // the frame in the name opens into the red field of the next section
      const hero = el.querySelector<HTMLElement>(".hero")!;
      const slot = hero.querySelector<HTMLElement>(".hero__slot")!;
      const frame = hero.querySelector<HTMLElement>(".hero__frame")!;
      const img = frame.querySelector("img")!;
      const geo = () => {
        const h = hero.getBoundingClientRect();
        const r = slot.getBoundingClientRect();
        const w = frame.offsetWidth;
        const fh = frame.offsetHeight;
        const cx = r.left - h.left + r.width / 2;
        const cy = r.top - h.top + r.height - fh / 2;
        return { x: h.width / 2 - cx, y: h.height / 2 - cy, s: Math.max(h.width / w, h.height / fh) * 1.04 };
      };
      gsap
        .timeline({
          scrollTrigger: { trigger: hero, start: "top top", end: "+=90%", pin: true, scrub: 0.6, invalidateOnRefresh: true },
        })
        .to(frame, { x: () => geo().x, y: () => geo().y, scale: () => geo().s, ease: "power2.inOut", duration: 0.8 }, 0)
        .to(img, { scale: () => 2.4 / geo().s, yPercent: 4, ease: "power2.inOut", duration: 0.8 }, 0)
        .to("[data-word='first']", { xPercent: -140, autoAlpha: 0, ease: "power2.in", duration: 0.55 }, 0)
        .to("[data-word='last']", { xPercent: 140, autoAlpha: 0, ease: "power2.in", duration: 0.55 }, 0)
        .to([".hero__foot", ".nav"], { autoAlpha: 0, y: -16, ease: "none", duration: 0.15 }, 0)
        .to({}, { duration: 0.2 });

      // pictures drift a few percent inside their frames
      gsap.utils.toArray<HTMLElement>("[data-drift]").forEach((d) => {
        gsap.fromTo(
          d,
          { yPercent: -5 },
          { yPercent: 5, ease: "none", scrollTrigger: { trigger: d.parentElement ?? d, start: "top bottom", end: "bottom top", scrub: true } },
        );
      });
    }, el);

    return () => {
      ctx.revert();
      gsap.ticker.remove(tick);
      lenis?.destroy();
    };
  }, [root, setStage]);

  // language changes reflow the page
  useEffect(() => {
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [lang]);
}
