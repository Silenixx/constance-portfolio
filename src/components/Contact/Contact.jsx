import styles from "./Contact.module.css";
import { site } from "../../data/site.js";
import { Shape } from "../Pieces/Pieces.jsx";

const outside = { target: "_blank", rel: "noreferrer noopener" };

export function Contact() {
  return (
    <footer className={styles.footer} id="contact">
      <Shape name="etoile" className={styles.shape} />
      <h2>Contact</h2>
      <a className={styles.mail} href={`mailto:${site.email}`}>
        {/* Si la ligne doit casser, elle casse avant l'arobase, pas au milieu d'un mot. */}
        {site.email.split("@")[0]}
        <wbr />@{site.email.split("@")[1]}
      </a>
      <ul className={styles.ways}>
        <li>
          <a href={`tel:${site.phoneHref}`}>{site.phone}</a>
        </li>
        <li>
          <a href={site.instagram} {...outside}>
            Instagram
          </a>
        </li>
        <li>
          <a href={site.linkedin} {...outside}>
            LinkedIn
          </a>
        </li>
        <li>
          <a href={encodeURI(site.cv)} {...outside}>
            CV (PDF)
          </a>
        </li>
      </ul>
      <p className={styles.meta}>
        <span>
          {site.name} · {site.role} · {site.place}
        </span>
        <span>© {new Date().getFullYear()}</span>
      </p>
    </footer>
  );
}
