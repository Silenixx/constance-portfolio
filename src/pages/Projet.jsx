import { useParams } from "react-router-dom";

export default function Projet() {
  const { id } = useParams();

  return (
    <section className="page">
      <h2>Projet : {id}</h2>
      <p>Ici tu affiches le contenu détaillé du projet (texte, images, etc.).</p>
    </section>
  );
}
