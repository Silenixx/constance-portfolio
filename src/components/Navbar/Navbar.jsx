import { useEffect, useState } from "react";
import styles from "./Navbar.module.css";
import { nav, site } from "../../data/site.js";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = nav
      .map((item) => document.querySelector(item.href))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0.01 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.classList.toggle("nav-open", open);
    if (!open) return undefined;
    const onKey = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("nav-open");
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className={`${styles.bar} ${scrolled ? styles.scrolled : ""}`}>
      <a className="skip" href="#contenu">
        Aller au contenu
      </a>
      <a className={styles.wordmark} href="#hero" onClick={close}>
        {site.name}
      </a>
      <nav className={styles.links} aria-label="Sections">
        {nav.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className={active === item.href.slice(1) ? styles.active : undefined}
            aria-current={active === item.href.slice(1) ? "true" : undefined}
          >
            {item.label}
          </a>
        ))}
      </nav>
      <button
        type="button"
        className={`${styles.burger} ${open ? styles.burgerOpen : ""}`}
        aria-expanded={open}
        aria-controls="menu-sections"
        onClick={() => setOpen((value) => !value)}
      >
        <span className="sr-only">{open ? "Fermer le menu" : "Ouvrir le menu"}</span>
        <span className={styles.barLine} />
        <span className={styles.barLine} />
      </button>
      {open && (
        <div className={styles.menu} id="menu-sections">
          <nav aria-label="Sections">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={active === item.href.slice(1) ? styles.menuActive : undefined}
                onClick={close}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
