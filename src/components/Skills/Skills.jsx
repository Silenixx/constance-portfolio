import styles from "./Skills.module.css";
import { skillGroups } from "../../data/site.js";

export function Skills() {
  return (
    <section className={styles.section} id="competences">
      <p className={styles.kicker}>Compétences</p>
      <h2>Ce que je mets en œuvre</h2>
      <div className={styles.groups}>
        {skillGroups.map((group) => (
          <section key={group.label} className={styles.group}>
            <h3>{group.label}</h3>
            <ul>
              {group.items.map((item) => (
                <li key={item.title}>
                  <figure>
                    <img src={item.image} alt="" />
                  </figure>
                  <div>
                    <h4>{item.title}</h4>
                    <p>{item.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </section>
  );
}
