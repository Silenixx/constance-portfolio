import styles from "./Presentation.module.css";
import { site } from "../../data/site.js";

const facts = [
  { label: "Lieu", value: site.place },
  { label: "Diplôme", value: "DNSEP, design des milieux" },
  { label: "Pratique", value: "Santé, objet, pédagogie" },
];

export function Presentation() {
  return (
    <section className={styles.section} id="presentation">
      <header className={styles.head}>
        <p>Présentation</p>
        <p>Designer en santé</p>
      </header>

      <div className={styles.stage}>
        <figure>
          <img
            src="/constance2.jpg"
            alt="Constance Tahay"
            width="150"
            height="150"
          />
          <figcaption>{site.place}</figcaption>
        </figure>
        <blockquote>
          Des pièces que l’on comprend en les prenant en main.
        </blockquote>
      </div>

      <div className={styles.columns}>
        <p>
          Je conçois des objets, des espaces et des outils que l’on manipule.
          Le travail croise design, santé et pédagogie&nbsp;: jeux, planches,
          prototypes, du croquis jusqu’à la fabrication.
        </p>
        <p>
          Au CHRU de Nancy, je dessine des outils pour l’éducation thérapeutique
          du patient, ainsi que des visuels et du graphisme. En stage, j’ai
          aussi travaillé le packaging de jeux, le mobilier et la scénographie
          d’objets.
        </p>
      </div>

      <ul className={styles.facts}>
        {facts.map((fact) => (
          <li key={fact.label}>
            <span>{fact.label}</span>
            <strong>{fact.value}</strong>
          </li>
        ))}
      </ul>

      <a className={styles.link} href="#contact">
        Me contacter
      </a>
    </section>
  );
}
