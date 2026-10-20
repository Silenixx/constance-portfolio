import styles from "./Skills.module.css";
import { skills } from "../../data/site.js";

export function Skills() {
  return (
    <section className={styles.section} id="competences">
      <p className={styles.kicker}>Compétences</p>
      <h2>Ce que je mets en œuvre</h2>
      <ul>
        {skills.map((skill) => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>
    </section>
  );
}
