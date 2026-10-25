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
      // the alliances scene lights its own seats when Bihar comes up
      if (n.classList.contains("is-in") || n.closest(".is-scene .seats, .is-scene .block__visual")) return;
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
      lenis = new Lenis({ lerp: 0.12, anchors: { offset: -64 } });
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
    }

    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      const stages = el.querySelector<HTMLElement>(".parl__track");
      if (stages)
        ScrollTrigger.create({
          trigger: stages,
          start: "top top",
          end: "bottom bottom",
          // measured after the pins above it have added their scroll
          refreshPriority: -1,
          onUpdate: (s) => setStage(Math.min(3, Math.floor(s.progress * 4))),
        });

      if (reduced) return;

      // one held scene: the frame in the name opens into the red field, and the same portrait
      // walks from the middle of the screen to its place beside the statement
      const opening = el.querySelector<HTMLElement>(".opening")!;
      const hero = opening.querySelector<HTMLElement>(".hero")!;
      const slot = hero.querySelector<HTMLElement>(".hero__slot")!;
      const frame = hero.querySelector<HTMLElement>(".hero__frame")!;
      const img = frame.querySelector("img")!;
      opening.classList.add("is-pinned");

      // positions are worked out in the frame's own (unscaled) space, since the portrait lives inside it
      const geo = () => {
        const h = hero.getBoundingClientRect();
        const r = slot.getBoundingClientRect();
        const vw = h.width;
        const vh = h.height;
        const w = frame.offsetWidth;
        const fh = frame.offsetHeight;
        const cx = r.left - h.left + r.width / 2;
        const cy = r.top - h.top + r.height - fh / 2;
        const S = Math.max(vw / w, vh / fh) * 1.04;
        const iw = img.offsetWidth;
        const ratio = img.naturalHeight / img.naturalWidth || 1992 / 1400;
        const place = (left: number, top: number, width: number) => ({
          x: (left - vw / 2) / S + w / 2 - img.offsetLeft,
          y: (top - vh / 2) / S + fh / 2 - img.offsetTop,
          scale: width / S / iw,
        });
        const phone = vw < 720;
        const aw = Math.min(iw * 2.4, vw * 0.9);
        const bh = phone ? vh * 0.48 : vh * 0.94;
        const bw = bh / ratio;
        return {
          frame: { x: vw / 2 - cx, y: vh / 2 - cy, scale: S },
          centre: place(vw / 2 - aw / 2, vh - aw * ratio * 0.97, aw),
          aside: place(phone ? vw / 2 - bw / 2 : vw - bw * 0.97, vh - bh * 0.96, bw),
        };
      };
      let g = geo();
      const lines = opening.querySelectorAll(".statement-s [data-line]");
      const words = opening.querySelectorAll(".statement-s blockquote > *");

      gsap
        .timeline({
          scrollTrigger: {
            trigger: opening,
            start: "top top",
            end: "+=170%",
            pin: true,
            scrub: 0.6,
            invalidateOnRefresh: true,
            onRefreshInit: () => {
              g = geo();
            },
          },
        })
        .to(frame, { x: () => g.frame.x, y: () => g.frame.y, scale: () => g.frame.scale, ease: "power2.inOut", duration: 0.5 }, 0)
        .to(img, { x: () => g.centre.x, y: () => g.centre.y, scale: () => g.centre.scale, ease: "power2.inOut", duration: 0.5 }, 0)
        .to("[data-word='first']", { xPercent: -140, autoAlpha: 0, ease: "power2.in", duration: 0.35 }, 0)
        .to("[data-word='last']", { xPercent: 140, autoAlpha: 0, ease: "power2.in", duration: 0.35 }, 0)
        .to(".hero__foot", { autoAlpha: 0, y: -16, ease: "none", duration: 0.1 }, 0)
        .to(img, { x: () => g.aside.x, y: () => g.aside.y, scale: () => g.aside.scale, ease: "power2.inOut", duration: 0.4 }, 0.58)
        .fromTo(".opening .statement-s", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.01, immediateRender: true }, 0.64)
        .fromTo(lines, { y: 0, yPercent: 105 }, { y: 0, yPercent: 0, ease: "expo.out", duration: 0.3, stagger: 0.06 }, 0.68)
        .fromTo(words, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, ease: "power3.out", duration: 0.25, stagger: 0.05 }, 0.76)
        .to({}, { duration: 0.15 });

      // alliances, held: each story's panel wipes up over the last while its words cross over
      mm.add("(min-width: 961px)", () => {
        const scene = el.querySelector<HTMLElement>(".alliances");
        const stage = scene?.querySelector<HTMLElement>(".alliances__stage");
        if (!scene || !stage) return;
        const blocks = gsap.utils.toArray<HTMLElement>(".block", scene);
        const seats = scene.querySelector(".seats");
        scene.classList.add("is-scene");
        scene.dataset.step = "0";

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: stage,
            start: "top top",
            end: () => `+=${(blocks.length - 1) * 110}%`,
            pin: true,
            scrub: 0.6,
            invalidateOnRefresh: true,
            onUpdate: (s) => {
              const n = String(Math.max(0, Math.min(blocks.length - 1, Math.floor(s.progress * tl.duration() + 0.6))));
              if (scene.dataset.step === n) return;
              scene.dataset.step = n;
              seats?.classList.toggle("is-in", n !== "0");
            },
          },
        });
        blocks.slice(1).forEach((b, i) => {
          tl.to(blocks[i].querySelector(".block__cluster"), { autoAlpha: 0, y: -40, ease: "power2.in", duration: 0.35 }, i + 0.1)
            .fromTo(b.querySelector(".block__visual"), { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", ease: "power2.inOut", duration: 0.7 }, i + 0.1)
            .fromTo(b.querySelector(".block__visual img"), { scale: 1.15 }, { scale: 1, ease: "power2.out", duration: 0.9 }, i + 0.1)
            .fromTo(b.querySelector(".block__cluster"), { autoAlpha: 0, y: 48 }, { autoAlpha: 1, y: 0, ease: "power3.out", duration: 0.45 }, i + 0.45);
        });
        tl.to({}, { duration: 0.3 });

        return () => {
          scene.classList.remove("is-scene");
          delete scene.dataset.step;
        };
      });

      // pictures drift a few percent inside their frames
      gsap.utils.toArray<HTMLElement>("[data-drift]").forEach((d) => {
        if (d.closest(".is-scene")) return;
        gsap.fromTo(
          d,
          { yPercent: -5 },
          { yPercent: 5, ease: "none", scrollTrigger: { trigger: d.parentElement ?? d, start: "top bottom", end: "bottom top", scrub: true } },
        );
      });
    }, el);

    return () => {
      mm.revert();
      ctx.revert();
      el.querySelector(".opening")?.classList.remove("is-pinned");
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
