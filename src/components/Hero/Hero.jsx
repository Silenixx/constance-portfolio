import styles from "./Hero.module.css";
import { intro, site } from "../../data/site.js";
import { Pieces } from "../Pieces/Pieces.jsx";

export function Hero() {
  const [first, ...rest] = site.name.split(" ");

  return (
    <section className={styles.hero} id="haut">
      <Pieces />
      <p className={styles.hint}>Les pièces se déplacent.</p>
      <div className={styles.copy}>
        <h1>
          <span>{first}</span> <span>{rest.join(" ")}</span>
        </h1>
        <div className={styles.foot}>
          <p className={styles.lead}>{intro.hero}</p>
          <p className={styles.meta}>
            <span>{site.role}</span>
            <span>{site.place}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
