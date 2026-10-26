import styles from "./Experience.module.css";
import { experience } from "../../data/site.js";

export function Experience() {
  return (
    <section className={styles.section} id="parcours">
      <p className={styles.kicker}>Parcours</p>
      <h2>Expérience</h2>
      <ol>
        {experience.map((item) => (
          <li key={`${item.year}-${item.title}`}>
            <span className={styles.year}>{item.year}</span>
            <div>
              <strong>{item.title}</strong>
              <p className={styles.place}>{item.place}</p>
            </div>
            {item.detail ? <p className={styles.detail}>{item.detail}</p> : null}
          </li>
        ))}
      </ol>
    </section>
  );
}
