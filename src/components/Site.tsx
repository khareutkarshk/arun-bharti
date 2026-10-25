"use client";

import { useEffect, useRef, useState } from "react";
import { copy, type Lang } from "@/content";
import { useMotion } from "./useMotion";
import Circuit from "./Circuit";

const MAIL = (subject: string) => `mailto:office@arunbharti.in?subject=${encodeURIComponent(subject)}`;

function Lines({ text, className, as: Tag = "h2" }: { text: [string, string]; className?: string; as?: "h2" | "h3" }) {
  return (
    <Tag className={`lines lines-rise ${className ?? ""}`}>
      {text.map((t, i) => (
        <span className="line" key={i}>
          <span data-line style={{ "--i": i } as React.CSSProperties}>
            {t}
          </span>
        </span>
      ))}
    </Tag>
  );
}

function Count({ value }: { value: string }) {
  return <span data-count={value}>{value}</span>;
}

export default function Site() {
  const [lang, setLang] = useState<Lang>("en");
  const [stage, setStage] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const t = copy[lang];

  useEffect(() => {
    try {
      const saved = localStorage.getItem("lang");
      if (saved === "hi" || saved === "en") setLang(saved);
    } catch {}
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      localStorage.setItem("lang", lang);
    } catch {}
  }, [lang]);

  useMotion(root, lang, setStage);

  // the bar settles once the page moves, steps aside while reading down and returns on the way up;
  // the link for the part on screen is marked
  const [stuck, setStuck] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [active, setActive] = useState("");
  const [menu, setMenu] = useState(false);
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setStuck(y > 24);
      if (y < 120) setHidden(false);
      else if (y - last > 6) setHidden(true);
      else if (last - y > 6) setHidden(false);
      else return;
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(`#${e.target.id}`);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    copy.en.nav.links.forEach((l) => {
      const s = document.querySelector(l.href);
      if (s) io.observe(s);
    });
    const top = document.querySelector("#top");
    const clear = new IntersectionObserver(([e]) => e.isIntersecting && setActive(""), { rootMargin: "-45% 0px -50% 0px" });
    if (top) clear.observe(top);
    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
      clear.disconnect();
    };
  }, []);
  useEffect(() => {
    if (!menu) return;
    const close = (e: KeyboardEvent) => e.key === "Escape" && setMenu(false);
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [menu]);

  return (
    <div ref={root}>
      <nav className={`nav${stuck ? " is-stuck" : ""}${hidden && !menu ? " is-hidden" : ""}${menu ? " is-open" : ""}`} aria-label="Main">
        <a className="nav__mark" href="#top" onClick={() => setMenu(false)}>
          {lang === "en" ? "Arun Bharti" : "अरुण भारती"}
          <span className="nav__role">{t.nav.role}</span>
        </a>
        <ul className="nav__links">
          {t.nav.links.map((l) => (
            <li key={l.href}>
              <a href={l.href} aria-current={active === l.href ? "location" : undefined}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="nav__end">
          <button
            className="lang"
            type="button"
            lang={lang === "en" ? "hi" : "en"}
            aria-label={t.nav.toggleLabel}
            onClick={() => setLang(lang === "en" ? "hi" : "en")}
          >
            {t.nav.toggle}
          </button>
          <a className="button nav__cta" href="#contact">
            {t.nav.cta}
          </a>
          <button className="nav__menu" type="button" aria-expanded={menu} aria-controls="menu" onClick={() => setMenu(!menu)}>
            {menu ? t.nav.close : t.nav.menu}
          </button>
        </div>
      </nav>
      <div className="menu" id="menu" hidden={!menu} data-lenis-prevent>
        <ul>
          {t.nav.links.map((l, i) => (
            <li key={l.href} style={{ "--i": i } as React.CSSProperties}>
              <a href={l.href} onClick={() => setMenu(false)} aria-current={active === l.href ? "location" : undefined}>
                <span>0{i + 1}</span>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a className="button menu__cta" href="#contact" onClick={() => setMenu(false)}>
          {t.nav.cta} <span className="arrow" aria-hidden="true">→</span>
        </a>
      </div>
      <main>
      <div className="opening">
      <header className="hero" id="top">
        <div className="hero__stage">
          <h1 className="hero__name display">
            <span className="word" data-word="first">
              <span style={{ "--i": 0 } as React.CSSProperties}>{t.hero.first}</span>
            </span>
            <span className="hero__slot">
              <span className="hero__frame">
                <img src="/img/ab-3107.webp" alt={t.hero.portraitAlt} width={1400} height={1992} fetchPriority="high" />
              </span>
            </span>
            <span className="word" data-word="last">
              <span style={{ "--i": 1 } as React.CSSProperties}>{t.hero.last}</span>
            </span>
          </h1>
          <div className="hero__foot">
            <p className="hero__sub" data-load style={{ "--d": "520ms" } as React.CSSProperties}>
              {t.hero.sub}
            </p>
            <a className="button hero__cta" href="#record" data-load style={{ "--d": "620ms" } as React.CSSProperties}>
              {t.hero.cta} <span className="arrow" aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </header>

        <section className="statement-s">
          <div className="grid wrap statement-s__inner">
            <Lines text={t.statement.h} className="title statement-s__h" />
            <blockquote className="statement-s__quote">
              <p className="statement" data-reveal style={{ "--d": "120ms" } as React.CSSProperties}>
                “{t.statement.quote}
              </p>
              <p className="statement-s__rest" data-reveal style={{ "--d": "180ms" } as React.CSSProperties}>
                {t.statement.quoteRest}”
              </p>
              <footer data-reveal style={{ "--d": "220ms" } as React.CSSProperties}>
                {t.statement.cite}
              </footer>
            </blockquote>
          </div>
          <figure className="statement-s__fig" data-drift>
            <img src="/img/ab-3105.webp" alt={t.statement.portraitAlt} width={1400} height={1991} loading="lazy" />
          </figure>
        </section>
      </div>

        <section className="record wrap" id="record">
          <div className="grid">
            <Lines text={t.record.h} className="title record__h" />
            <ul className="record__rows">
              {t.record.rows.map((r, i) => (
                <li className="record__row" key={i} data-reveal style={{ "--d": `${i * 70}ms` } as React.CSSProperties}>
                  <span className="record__num">
                    <Count value={r.whole} />
                    <span className="record__part">{r.part}</span>
                  </span>
                  <span className="record__cap">{r.caption}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="before" id="before">
          <div className="grid wrap">
            <Lines text={t.before.h} className="title before__h" />
            <ul className="before__facts" data-reveal>
              {t.before.facts.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <div className="before__text">
              <p data-reveal style={{ "--d": "80ms" } as React.CSSProperties}>
                <span className="before__cap shutter">
                  <img src="/img/ab-2865.webp" alt={t.before.portraitAlt} width={1400} height={1811} loading="lazy" />
                </span>
                <strong>{t.before.lead}</strong>
                {t.before.body}
              </p>
              <p data-reveal style={{ "--d": "160ms" } as React.CSSProperties}>
                {t.before.rest}
              </p>
            </div>
          </div>
        </section>

        <Circuit t={t.circuit} lang={lang} />

        <section className="alliances wrap" id="alliances">
          <div className="alliances__stage">
          <div className="alliances__head">
            <Lines text={t.alliances.h} className="title alliances__h" />
            <ol className="alliances__steps" aria-hidden="true">
              {t.alliances.blocks.map((b, i) => (
                <li key={i}>
                  <span>0{i + 1}</span> {b.tag}
                </li>
              ))}
            </ol>
          </div>
          {t.alliances.blocks.map((b, i) => (
            <article className="block grid" key={i}>
              <figure className="block__visual">
                <img
                  src={["/img/ab-3012.webp", "/img/ab-2906.webp", "/img/ab-2982.webp"][i]}
                  alt={b.alt}
                  width={[584, 615, 1348][i]}
                  height={2000}
                  decoding="async"
                  className="shutter"
                  data-drift
                />
              </figure>
              <div className="block__cluster">
                <h3 className="block__title" data-reveal>
                  {b.title[0]}
                  <br />
                  {b.title[1]}
                </h3>
                {b.figure && (
                  <p className="block__figure" data-reveal>
                    <strong>{b.figure.value}</strong>
                    <span>{b.figure.caption}</span>
                  </p>
                )}
                {b.seats && (
                  <figure className="seats" data-reveal>
                    <div className="seats__grid" aria-hidden="true">
                      {Array.from({ length: 29 }, (_, n) => (
                        <i key={n} className={n < 19 ? "won" : ""} style={{ "--i": n } as React.CSSProperties} />
                      ))}
                    </div>
                    <figcaption>{b.seats.caption}</figcaption>
                  </figure>
                )}
                {b.picture && (
                  <figure className="block__pic" data-reveal>
                    <img src={b.picture.src} alt={b.picture.alt} width={1600} height={1200} loading="lazy" />
                    <figcaption>{b.picture.caption}</figcaption>
                  </figure>
                )}
                <p className="block__body" data-reveal style={{ "--d": "160ms" } as React.CSSProperties}>
                  {b.body}
                </p>
              </div>
            </article>
          ))}
          </div>
        </section>

        <section className="parl" id="parliament" data-stage={stage}>
          <div className="parl__track">
            <div className="parl__stage grid wrap">
              <div className="parl__copy">
                <h2 className="parl__h">
                  <span className="parl__first">{t.parliament.first}</span>
                  <span className="parl__last">{t.parliament.last}</span>
                </h2>
                <ol className="parl__list">
                  {t.parliament.items.map((it, i) => (
                    <li key={i} className={i === stage ? "is-on" : i < stage ? "is-done" : ""}>
                      <span className="parl__num">0{i + 1}</span>
                      <span>
                        <strong>{it.name}</strong>
                        <span className="parl__note">{it.note}</span>
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
              <figure className="parl__fig">
                <span className="parl__frame">
                  <img src="/img/sansad-bhavan-delhi-bnk.webp" alt={t.parliament.alt} width={1920} height={1264} loading="lazy" />
                </span>
                <figcaption>
                  <span>{t.parliament.caption}</span>
                  <span className="parl__count">
                    0{stage + 1} / 0{t.parliament.items.length}
                  </span>
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        <section className="contact" id="contact" aria-labelledby="contact-h">
          <h2 className="contact__h" id="contact-h">
            {t.contact.h}
          </h2>
          <a className="contact__mail" href={MAIL("Message for Arun Bharti")}>
            {t.contact.email}
          </a>
          <div className="contact__foot">
            <span>{t.contact.places}</span>
            <ul aria-label={t.contact.social}>
              <li><a className="link" href="https://x.com/">X</a></li>
              <li><a className="link" href="https://www.instagram.com/">Instagram</a></li>
              <li><a className="link" href="https://www.facebook.com/">Facebook</a></li>
              <li><a className="link" href="https://www.youtube.com/">YouTube</a></li>
            </ul>
          </div>
        </section>
      </main>

      <footer className="close">
        <div className="flag" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
        <div className="grid wrap close__top">
          <div className="close__invite">
            <Lines text={t.close.h} className="title" />
            <a className="button button--ink" href={MAIL("Grievance from Jamui")} data-reveal style={{ "--d": "200ms" } as React.CSSProperties}>
              {t.close.cta} <span className="arrow" aria-hidden="true">→</span>
            </a>
          </div>
          <ul className="close__links">
            {t.nav.links.map((l) => (
              <li key={l.href}>
                <a className="link" href={l.href}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="close__legal">
          <span>{t.close.rights}</span>
        </div>
        <p className="close__mark" aria-hidden="true">
          {lang === "en" ? "Arun Bharti" : "अरुण भारती"}
        </p>
      </footer>
    </div>
  );
}
