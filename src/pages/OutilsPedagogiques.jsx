import GalleryGrid from "../components/GalleryGrid.jsx";

export default function OutilsPedagogique() {
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