import GalleryGrid from "../components/GalleryGrid.jsx";

export default function OutilsPedagogique() {
  const items = [
    "/public/outils-pedagogiques/peda1.jpg",
    "/public/outils-pedagogiques/peda2.jpg",
    "/public/outils-pedagogiques/peda3.jpg",
    "/public/outils-pedagogiques/peda4.jpg",
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