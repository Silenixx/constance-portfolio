import GalleryGrid from "../components/GalleryGrid.jsx";

export default function Graphisme() {
  // 👉 Tu choisis les projets de graphisme que tu veux afficher ici
  const items = [
    "/public/test.jpg",
    "/public/test.jpg",
    "/public/test.jpg",
    "/public/test.jpg",
  ];

  return (
    <section className="page">
      <h2>Graphisme</h2>
      <p className="intro">
        Sélection de projets de graphisme : affiches, identités visuelles, illustrations
        éditoriales et créations sur mesure.  
        Chaque visuel traduit une intention, une ambiance et une cohérence avec le projet global.
      </p>

      <GalleryGrid items={items} />
    </section>
  );
}
