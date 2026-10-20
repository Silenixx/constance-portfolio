import styles from "./Contact.module.css";
import { site } from "../../data/site.js";

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3.25" y="3.25" width="17.5" height="17.5" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3.25" y="3.25" width="17.5" height="17.5" rx="3" />
      <circle cx="8" cy="7.6" r="0.9" fill="currentColor" stroke="none" />
      <path d="M8 10.5V17M12 17v-4a2.1 2.1 0 0 1 4.2 0V17" />
    </svg>
  );
}

const socials = [
  {
    name: "Instagram",
    handle: site.instagramHandle,
    href: site.instagram,
    icon: <InstagramIcon />,
  },
  {
    name: "LinkedIn",
    handle: site.linkedinHandle,
    href: site.linkedin,
    icon: <LinkedInIcon />,
  },
];

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
      <div className={styles.reach}>
        <a href={`mailto:${site.email}`}>{site.email}</a>
        <a href={`tel:${site.phoneHref}`}>{site.phone}</a>
      </div>
      <ul className={styles.social}>
        {socials.map((item) => (
          <li key={item.name}>
            <a href={item.href} target="_blank" rel="noreferrer noopener">
              {item.icon}
              <span>
                <span className={styles.network}>{item.name}</span>
                <span className={styles.handle}>{item.handle}</span>
              </span>
              <span className={styles.arrow} aria-hidden="true">
                ↗
              </span>
            </a>
          </li>
        ))}
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
