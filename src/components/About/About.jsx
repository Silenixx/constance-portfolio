import styles from "./About.module.css";
import { education, experience, intro, site, skills } from "../../data/site.js";
import { Picture } from "../Picture/Picture.jsx";
import { Shape } from "../Pieces/Pieces.jsx";

export function About() {
  const [opening, ...paragraphs] = intro.about;

  return (
    <section className={styles.section} id="a-propos">
      <h2>À propos</h2>

      <div className={styles.intro}>
        <div className={styles.portrait}>
          <Picture
            src={site.portrait}
            alt={`Portrait de ${site.name}`}
            sizes="(max-width: 800px) 70vw, 30vw"
          />
          <Shape name="lune" className={styles.sticker} />
        </div>
        <div className={styles.text}>
          <p className={styles.opening}>{opening}</p>
          {paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <p className={styles.actions}>
            <a href={encodeURI(site.cv)} target="_blank" rel="noreferrer noopener">
              Voir le CV
            </a>
            <a href="#contact">Me contacter</a>
          </p>
        </div>
      </div>

      <div className={styles.path}>
        <div>
          <h3>Expérience</h3>
          <ol className={styles.rows}>
            {experience.map((item) => (
              <li key={`${item.year}-${item.title}`}>
                <span className={styles.year}>{item.year}</span>
                <div>
                  <strong>{item.title}</strong>
                  <span className={styles.where}>{item.place}</span>
                  <p>{item.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className={styles.side}>
          <div>
            <h3>Formation</h3>
            <ol className={styles.rows}>
              {education.map((item) => (
                <li key={item.year}>
                  <span className={styles.year}>{item.year}</span>
                  <div>
                    <strong>{item.title}</strong>
                    <span className={styles.where}>{item.school}</span>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {skills.map((group) => (
            <div key={group.label}>
              <h3>{group.label}</h3>
              <ul className={styles.chips}>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
