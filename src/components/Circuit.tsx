"use client";

import { useEffect, useRef, useState } from "react";
import bihar from "@/data/bihar.json";
import type { Copy, Lang } from "@/content";

const DISTRICT: Record<string, string> = {
  arrah: "Bhojpur",
  rajgir: "Nalanda",
  chhapra: "Saran",
  munger: "Munger",
  gaya: "Gaya",
  muzaffarpur: "Muzaffarpur",
  purnia: "Purnia",
};

const pos = bihar.cities as unknown as Record<string, [number, number]>;

export default function Circuit({ t, lang }: { t: Copy["circuit"]; lang: Lang }) {
  const [on, setOn] = useState(0);
  const [held, setHeld] = useState(false);
  const section = useRef<HTMLElement>(null);
  const city = t.cities[on];

  // the lit name walks the circuit while the section is on screen, until the visitor picks one
  useEffect(() => {
    if (held || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timer: number | undefined;
    const io = new IntersectionObserver(([e]) => {
      window.clearInterval(timer);
      if (e.isIntersecting) timer = window.setInterval(() => setOn((n) => (n + 1) % t.cities.length), 2200);
    });
    if (section.current) io.observe(section.current);
    return () => {
      io.disconnect();
      window.clearInterval(timer);
    };
  }, [held, t.cities.length]);

  const pick = (i: number) => {
    setHeld(true);
    setOn(i);
  };

  const [hx, hy] = pos.jamui;

  return (
    <section className="circuit wrap" id="bihar" ref={section}>
      <div className="grid">
        <div className="circuit__copy">
          <h2 className="title circuit__h lines lines-rise">
            {t.h.map((s, i) => (
              <span className="line" key={i}>
                <span data-line style={{ "--i": i } as React.CSSProperties}>
                  {s}
                </span>
              </span>
            ))}
          </h2>
          <p className="circuit__names" data-reveal>
            <span className="opener">{t.opener}</span>{" "}
            {t.cities.map((c, i) => (
              <span key={c.id}>
                <button
                  type="button"
                  className={`city${i === on ? " is-on" : ""}`}
                  aria-pressed={i === on}
                  onClick={() => pick(i)}
                  onMouseEnter={() => pick(i)}
                  onFocus={() => pick(i)}
                >
                  {c.name}
                </button>
                {i < t.cities.length - 1 ? ", " : "."}
              </span>
            ))}
          </p>
          <div className="circuit__detail" aria-live="polite">
            <p className="circuit__date">{city.date}</p>
            <p className="circuit__venue">
              {city.name}, {city.venue}
            </p>
          </div>
          <p className="circuit__outcome" data-reveal>
            {t.outcome}
          </p>
        </div>

        <figure className="circuit__map" data-reveal style={{ "--d": "120ms" } as React.CSSProperties}>
          <svg viewBox={`-20 -20 ${bihar.w + 40} ${bihar.h + 40}`} role="img" aria-label={t.mapLabel}>
            {bihar.districts.map((d) => (
              <path
                key={d.name}
                d={d.d}
                className={`district${d.name === "Jamui" ? " is-home" : ""}${d.name === DISTRICT[city.id] ? " is-on" : ""}`}
              />
            ))}
            {t.cities.slice(1).map((c, i) => {
              const [x1, y1] = pos[t.cities[i].id];
              const [x2, y2] = pos[c.id];
              return <path key={c.id} className={`leg${i < on ? " is-done" : ""}`} d={`M${x1},${y1}L${x2},${y2}`} pathLength={1} />;
            })}
            <circle className="home-dot" cx={hx} cy={hy} r={9} />
            <text className="home-label" x={hx + 18} y={hy + 30}>
              {t.home}
            </text>
            {t.cities.map((c, i) => {
              const [x, y] = pos[c.id];
              const flip = x > 760;
              return (
                <g key={c.id} className={`stop${i === on ? " is-on" : ""}`} onClick={() => pick(i)}>
                  <circle className="dot-ring" cx={x} cy={y} r={30} />
                  <circle className="dot" cx={x} cy={y} r={10} />
                  <text className="label" x={flip ? x - 22 : x + 22} y={y - 16} textAnchor={flip ? "end" : "start"} lang={lang}>
                    {c.name}
                  </text>
                </g>
              );
            })}
          </svg>
        </figure>
      </div>
    </section>
  );
}
