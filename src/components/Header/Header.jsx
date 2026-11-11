import styles from "./Header.module.css";
import { nav, site } from "../../data/site.js";
import { Shape } from "../Pieces/Pieces.jsx";

export function Header() {
  return (
    <header className={styles.header}>
      <a className={styles.brand} href="#haut">
        <Shape name="croix" className={styles.mark} />
        <span>{site.name}</span>
      </a>
      <nav aria-label="Navigation principale">
        <ul className={styles.links}>
          {nav.map((item) => (
            <li key={item.href}>
              <a href={item.href}>{item.label}</a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
