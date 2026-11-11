import { useState } from "react";
import styles from "./Works.module.css";
import { filters, tones, works } from "../../data/site.js";
import { Picture } from "../Picture/Picture.jsx";
import { WorkDialog } from "./WorkDialog.jsx";

const countOf = (id) =>
  id === "tout" ? works.length : works.filter((work) => work.tags.includes(id)).length;

export function Works() {
  const [filter, setFilter] = useState("tout");
  const [open, setOpen] = useState(null);

  const shown = filter === "tout" ? works : works.filter((work) => work.tags.includes(filter));
  const index = shown.findIndex((work) => work.slug === open);
  const step = (delta) => setOpen(shown[(index + delta + shown.length) % shown.length].slug);

  return (
    <section className={styles.section} id="projets">
      <header className={styles.head}>
        <h2>Projets</h2>
        <ul className={styles.filters} aria-label="Filtrer les projets">
          {filters.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                className={styles.filter}
                aria-pressed={filter === item.id}
                onClick={() => setFilter(item.id)}
              >
                {item.label}
                <sup>{countOf(item.id)}</sup>
              </button>
            </li>
          ))}
        </ul>
      </header>

      <ul className={styles.grid}>
        {shown.map((work, position) => {
          const [src] = work.images[0];
          const wide = work.featured && filter === "tout";
          return (
            <li key={work.slug} className={wide ? styles.wide : undefined}>
              <button type="button" className={styles.card} onClick={() => setOpen(work.slug)}>
                <span
                  className={`${styles.plate} ${work.fit === "contain" ? styles.contain : ""}`}
                  style={{ "--tone": tones[work.tone] }}
                >
                  <Picture
                    src={src}
                    eager={position < 3}
                    sizes={
                      wide
                        ? "(max-width: 860px) 100vw, (max-width: 1200px) 66vw, 620px"
                        : "(max-width: 339px) 100vw, (max-width: 860px) 50vw, (max-width: 1200px) 33vw, 310px"
                    }
                  />
                  {work.images.length > 1 && (
                    <span className={styles.count}>{work.images.length} images</span>
                  )}
                  {work.pdf && <span className={styles.count}>PDF</span>}
                </span>
                <span className={styles.caption}>
                  <span className={styles.title}>{work.title}</span>
                  <span className={styles.kind}>{work.kind}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      {index >= 0 && (
        <WorkDialog
          key={open}
          work={shown[index]}
          position={`${index + 1} / ${shown.length}`}
          onClose={() => setOpen(null)}
          onPrev={() => step(-1)}
          onNext={() => step(1)}
        />
      )}
    </section>
  );
}
