import { NavLink, Link } from "react-router-dom";
import { useState } from "react";

const Item = ({ to, children }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      "nav__link" + (isActive ? " nav__link--active" : "")
    }
    end
  >
    {children}
  </NavLink>
);

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <div className={"sidebar" + (open ? " is-open" : "")}>
      {/* Bouton mobile */}
      <button
        className="sidebar__toggle"
        aria-expanded={open}
        aria-controls="main-nav"
        onClick={() => setOpen((v) => !v)}
        title={open ? "Fermer le menu" : "Ouvrir le menu"}
      >
        <span className="sr-only">{open ? "Fermer le menu" : "Ouvrir le menu"}</span>
        {/* icône burger simple en SVG */}
        <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </button>

      <div className="brand">
        {/* photo cliquable vers l’accueil */}
        <Link to="/" className="brand__photoLink" onClick={() => setOpen(false)}>
          <img
            src="/public/constance2.jpg"
            alt="Constance TAHAY"
            className="brand__photo"
          />
        </Link>
        <div className="brand__name">Constance TAHAY</div>
        {/* tu peux remettre un petit tagline si tu veux */}
        {/* <div className="brand__tagline muted">Design d’espaces / Scénographie / Objets</div> */}
      </div>

      <nav className="nav" id="main-nav" aria-label="Navigation principale">
        <Item to="/" onClick={() => setOpen(false)}>ACCUEIL</Item>
        <Item to="/presentation" onClick={() => setOpen(false)}>PRÉSENTATION</Item>
        <Item to="/outils-pedagogiques" onClick={() => setOpen(false)}>OUTILS PÉDAGOGIQUES</Item>
        <Item to="/design-d-espaces" onClick={() => setOpen(false)}>DESIGN D’ESPACES</Item>
        <Item to="/graphisme" onClick={() => setOpen(false)}>GRAPHISME</Item>
        <Item to="/design-d-objets" onClick={() => setOpen(false)}>DESIGN D’OBJETS</Item>
        <Item to="/contact" onClick={() => setOpen(false)}>CONTACT</Item>

        <a
          className="nav__link nav__link--external"
          href="https://www.instagram.com/constance.tahay/"
          target="_blank"
          rel="noreferrer"
        >
          INSTAGRAM
        </a>
        <a
          className="nav__link nav__link--external"
          href="https://www.linkedin.com/in/constance-tahay-1965aa205/"
          target="_blank"
          rel="noreferrer"
        >
          LINKEDIN
        </a>
      </nav>

      <div className="sidebar__foot">
        <p className="muted">© {new Date().getFullYear()} Constance TAHAY.</p>
      </div>
    </div>
  );
}
