import { useNavigate } from "react-router-dom";

export default function GalleryGrid({ items = [] }) {
  const navigate = useNavigate();

  const handleClick = (index) => {
    // redirection vers /projet/nom ou /projet/1
    navigate(`/projet/${index}`);
  };

  return (
    <div className="grid">
      {items.map((src, i) => (
        <article
          key={i}
          className="card"
          onClick={() => handleClick(i)}
          style={{ cursor: "pointer" }}
        >
          <img src={src} alt={`work-${i}`} loading="lazy" />
        </article>
      ))}
    </div>
  );
}
