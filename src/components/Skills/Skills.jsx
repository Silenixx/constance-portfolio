import styles from "./Skills.module.css";
import { skillGroups } from "../../data/site.js";

export function Skills() {
  return (
    <section className={styles.section} id="competences">
      <p className={styles.kicker}>Compétences</p>
      <h2>Ce que je mets en œuvre</h2>
      <div className={styles.groups}>
        {skillGroups.map((group) => (
          <div key={group.label}>
            <h3>{group.label}</h3>
            <ul>
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
