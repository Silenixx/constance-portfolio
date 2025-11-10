import GalleryGrid from "../components/GalleryGrid.jsx";
import Projet from "./Projet.jsx";


export default function DesignObjets() {
  // 👉 Tu choisis les projets de graphisme que tu veux afficher ici
    const items = [
      "/public/test.jpg",
      "/public/test.jpg",
      "/public/test.jpg",
      "/public/test.jpg",
    ];
  
    return (
      <section className="page">
        <h2>Design d’espaces</h2>
        <p className="intro">
          blaef e fqef qe feqqefq
          fqefqefqefq
          efqefqefqe
        </p>
  
        <GalleryGrid items={items} />
      </section>
    );
  }