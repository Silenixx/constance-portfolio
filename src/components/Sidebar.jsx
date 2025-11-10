import { NavLink } from "react-router-dom";

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
  return (
    <div className="sidebar">
      <div className="brand">
        {/* 👉 Ici on affiche la photo */}
        <img
          src="/public/constance2.jpg"
          alt="Constance TAHAY"
          className="brand__photo"
        />
        <div className="brand__name">Constance TAHAY</div>
      </div>

      <nav className="nav">
        <Item to="/">ACCUEIL</Item>
        <Item to="/presentation">PRÉSENTATION</Item>
        <Item to="/outils-pedagogiques">OUTILS PÉDAGOGIQUES</Item>
        <Item to="/design-d-espaces">DESIGN D’ESPACES</Item>
        <Item to="/graphisme">GRAPHISME</Item>
        <Item to="/design-d-objets">DESIGN D’OBJETS</Item>
        <Item to="/contact">CONTACT</Item>
        <a
          className="nav__link"
          href="https://www.instagram.com/constance.tahay/"
          target="_blank"
          rel="noreferrer"
        >
          INSTAGRAM
        </a>
        <a
          className="nav__link"
          href="https://www.linkedin.com/in/constance-tahay-1965aa205/"
          target="_blank"
          rel="noreferrer"
        >
          LINKEDIN
        </a>
      </nav>

      <div className="sidebar__foot">
        {/* <p className="muted">
          Design d’espaces (int./ext.) / Scénographie / Design d’objets
        </p> */}
        <p className="muted">© {new Date().getFullYear()} Constance TAHAY.</p>
      </div>
    </div>
  );
}
