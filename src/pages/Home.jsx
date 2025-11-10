import GalleryGrid from "../components/GalleryGrid.jsx";

export default function Home() {
  // Tu choisis ici les images à mettre en avant
  const featuredItems = [
    "/public/test.jpg",
    "/public/test.jpg",
    "/public/test.jpg",
  ];

  return (
    <section className="page">
      <h2>À la une</h2>
      <GalleryGrid items={featuredItems} />
    </section>
  );
}
