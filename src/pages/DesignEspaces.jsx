import GalleryGrid from "../components/GalleryGrid.jsx";
import Projet from "./Projet.jsx";


export default function DesignEspaces() {
  const items = [
    "../public/test.jpg",
    "../public/test.jpg",
    "../public/test.jpg",
  ];
  return (
    <section className="page">
      <h2>Design d’espaces</h2>
      <GalleryGrid items={items} />
    </section>
  );
}
