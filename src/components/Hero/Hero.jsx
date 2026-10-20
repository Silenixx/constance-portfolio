import styles from "./Hero.module.css";

const MATIERES = ["Contreplaqué", "Résine", "Gravure", "Couleur", "Geste", "Médiation"];

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
        <div>
          {[...MATIERES, ...MATIERES].map((word, index) => (
            <span key={`${word}-${index}`}>{word}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
