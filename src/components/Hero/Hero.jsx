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
        <div className={styles.medallion}>
          <div className={styles.portrait}>
            <img
              src="/constance.jpeg"
              alt="Portrait de Constance Tahay"
              width="1200"
              height="1439"
            />
          </div>
          <svg className={styles.ring} viewBox="0 0 100 100" aria-hidden="true">
            <circle className={styles.ink} cx="50" cy="50" r="47.2" pathLength="1" />
            <ellipse className={styles.clay} cx="50" cy="50" rx="50.6" ry="49.3" pathLength="1" />
            <ellipse className={styles.pass} cx="50" cy="50" rx="49.6" ry="51.4" pathLength="1" />
          </svg>
        </div>
      </div>
    </section>
  );
}
