import styles from "./Presentation.module.css";

export function Presentation() {
  return (
    <section className={styles.section} id="presentation">
      <div className={styles.layout}>
        <div className={styles.title}>
          <h1>
            <span>Constance</span>
            <span>Tahay</span>
          </h1>
          <p>Designer graphique et conceptrice d’outils pédagogiques.</p>
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
            <circle className={styles.ink} cx="50" cy="50" r="47.6" pathLength="1" />
            <g className={styles.orbit}>
              <circle className={styles.arc} cx="50" cy="50" r="47.6" pathLength="1" />
              <circle className={styles.mark} cx="50" cy="50" r="47.6" pathLength="1" />
            </g>
          </svg>
        </div>

        <div className={styles.copy}>
          <p>
            Mon travail associe graphisme, conception d’outils pédagogiques et
            fabrication. Je conçois des supports visuels et interactifs destinés
            à faciliter la compréhension des patients, notamment autour de leur
            pathologie, du fonctionnement du corps et de leurs traitements.
          </p>
          <p>
            Je travaille en collaboration avec les équipes soignantes pour
            imaginer des outils adaptés à leurs objectifs pédagogiques&nbsp;:
            jeux, supports illustrés, silhouettes anatomiques, magnets ou encore
            supports manipulables. De la réflexion graphique au prototypage et à
            la fabrication, je développe des solutions concrètes, pensées pour
            être accessibles, visuelles et faciles à utiliser lors des ateliers
            d’éducation thérapeutique.
          </p>
          <p>
            Mon travail mobilise également la création graphique, l’illustration
            et la fabrication numérique, notamment grâce aux machines des Fab
            Labs.
          </p>
          <p className={styles.actions}>
            <a href="#projets">Voir les projets</a>
            <a href="#contact">Me contacter</a>
          </p>
        </div>
      </div>
    </section>
  );
}
