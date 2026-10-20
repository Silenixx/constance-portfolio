import styles from "./Contact.module.css";
import { site } from "../../data/site.js";

export function Contact() {
  return (
    <footer className={styles.footer} id="contact">
      <p className={styles.kicker}>Contact</p>
      <h2>
        Pour un objet,
        <br />
        <em>un atelier,</em>
        <br />
        une collaboration.
      </h2>
      <ul>
        <li>
          <a href={site.instagram} target="_blank" rel="noreferrer noopener">
            Instagram <span aria-hidden="true">↗</span>
          </a>
        </li>
        <li>
          <a href={site.linkedin} target="_blank" rel="noreferrer noopener">
            LinkedIn <span aria-hidden="true">↗</span>
          </a>
        </li>
      </ul>
      <div className={styles.meta}>
        <p>
          {site.name}
          <span> · {site.role}</span>
        </p>
        <p>© {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
}
