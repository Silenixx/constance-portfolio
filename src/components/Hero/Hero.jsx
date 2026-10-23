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
        </div>
      </div>
    </section>
  );
}
