import styles from "./Formation.module.css";
import { education } from "../../data/site.js";

export function Formation() {
  return (
    <section className={styles.section} id="formation">
      <p className={styles.kicker}>Formation</p>
      <h2>Parcours scolaire</h2>
      <ol>
        {education.map((item) => (
          <li key={`${item.year}-${item.title}`}>
            <div className={styles.head}>
              <span>{item.year}</span>
              <p>{item.level}</p>
            </div>
            <strong>{item.title}</strong>
            <p className={styles.school}>{item.school}</p>
            <p className={styles.city}>{item.city}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
