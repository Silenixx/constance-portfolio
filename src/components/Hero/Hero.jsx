import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section className={styles.hero} id="hero">
      <div className={styles.identity}>
        <div className={styles.copy}>
          <h1>
            <span>Constance</span>
            <span>Tahay</span>
          </h1>
          <p>
            Des objets que l’on prend en main&nbsp;: pour apprendre, pour dire,
            pour emporter un atelier.
          </p>
        </div>
        <div className={styles.portrait}>
          <img
            src="/constance.jpeg"
            alt="Portrait de Constance Tahay"
            width="1200"
            height="1439"
          />
          <svg className={styles.ring} viewBox="0 0 100 100" aria-hidden="true">
            <circle cx="50" cy="50" r="48.6" pathLength="1" />
          </svg>
        </div>
      </div>
    </section>
  );
}
