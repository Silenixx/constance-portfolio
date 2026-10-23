import { parse } from "yaml";
import styles from "./Hero.module.css";
import frise from "../../data/frise.yml?raw";

const parsed = parse(frise);
const MATIERES = Array.isArray(parsed?.mots)
  ? parsed.mots.map((word) => String(word).trim()).filter(Boolean)
  : [];
const SEQUENCE = Array.from({ length: 4 }, () => MATIERES).flat();

export function Hero() {
  return (
    <section className={styles.hero} id="hero">
      <h1>
        <span>Constance</span>
        <span>Tahay</span>
      </h1>
      <div className={styles.bottom}>
        <p>
          Des objets que l’on prend en main&nbsp;: pour apprendre, pour dire,
          pour emporter un atelier.
        </p>
      </div>
      <div className={styles.marquee} aria-hidden="true">
        <div className={styles.track}>
          {[0, 1].map((copy) => (
            <div className={styles.group} key={copy}>
              {SEQUENCE.map((word, index) => (
                <span key={`${copy}-${word}-${index}`}>{word}</span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
