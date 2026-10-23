import styles from "./Contact.module.css";
import { site } from "../../data/site.js";

const ways = [
  { label: "Appeler", value: site.phone, href: `tel:${site.phoneHref}` },
  {
    label: "Instagram",
    value: site.instagramHandle,
    href: site.instagram,
    external: true,
  },
  {
    label: "LinkedIn",
    value: site.linkedinHandle,
    href: site.linkedin,
    external: true,
  },
];

export function Contact() {
  return (
    <footer className={styles.footer} id="contact">
      <p className={styles.kicker}>Contact</p>
      <h2>Pour un objet, un atelier, une collaboration.</h2>
      <a className={styles.mail} href={`mailto:${site.email}`}>
        {site.email}
      </a>
      <ul className={styles.ways}>
        {ways.map((item) => (
          <li key={item.label}>
            <a
              href={item.href}
              {...(item.external
                ? { target: "_blank", rel: "noreferrer noopener" }
                : {})}
            >
              <span>{item.label}</span>
              {item.value}
            </a>
          </li>
        ))}
        <li>
          <p>
            <span>Lieu</span>
            {site.place}
          </p>
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
