import styles from "./Formation.module.css";
import { education } from "../../data/site.js";

const studies = [...education].sort((a, b) => Number(b.year) - Number(a.year));

export function Formation() {
  return (
    <section className={styles.section} id="formation">
      <p className={styles.kicker}>Formation</p>
      <h2>Parcours scolaire</h2>
      <ol>
        {studies.map((item) => (
          <li key={`${item.year}-${item.title}`}>
            <span className={styles.year}>{item.year}</span>
            <span className={styles.rail} aria-hidden="true" />
            <div>
              <p className={styles.level}>{item.level}</p>
              <strong>{item.title}</strong>
              <p className={styles.school}>{item.school}</p>
              <p className={styles.city}>{item.city}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
