import styles from "./Presentation.module.css";
import { site } from "../../data/site.js";

const facts = [
  { label: "Lieu", value: site.place },
  { label: "Diplôme", value: "DNSEP, Design des milieux" },
  { label: "Pratique", value: "Objet, espace, pédagogie" },
];

export function Presentation() {
  return (
    <section className={styles.section} id="presentation">
      <header className={styles.head}>
        <p>Présentation</p>
        <p>Designer conceptrice d’outils</p>
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
          Je conçois des objets, des espaces et des scénographies en mettant
          l’usage au centre. Le travail croise pédagogie, matérialité et
          narration&nbsp;: chaque pièce doit être lisible, fonctionnelle et
          durable.
        </p>
        <p>
          J’accompagne particuliers, collectivités et structures culturelles,
          de l’idée à la mise en œuvre&nbsp;: recherche, esquisses, maquettes,
          choix des matières, plans et suivi. Côté pédagogie, je développe des
          supports que l’on manipule pour transmettre un savoir-faire.
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
