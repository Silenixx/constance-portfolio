import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./Projects.module.css";
import { projects } from "../../data/site.js";

export function Projects() {
  const [current, setCurrent] = useState(null);

  return (
    <section className={styles.section} id="projets">
      <header className={styles.head}>
        <p>Projets</p>
        <h2>Quatre objets</h2>
      </header>
      <div className={styles.list}>
        {projects.map((project, index) => (
          <article
            key={project.slug}
            className={index % 2 === 1 ? styles.flip : undefined}
          >
            <button type="button" onClick={() => setCurrent(project)}>
              <img
                src={project.cover}
                alt={project.coverAlt}
                width="2000"
                height="1333"
                loading={index === 0 ? "eager" : "lazy"}
              />
              <div>
                <p className={styles.index}>{project.index}</p>
                <h3>{project.title}</h3>
                <p>{project.subtitle}</p>
                <p className={styles.materials}>{project.materials}</p>
                <span>Voir le projet</span>
              </div>
            </button>
          </article>
        ))}
      </div>
      {current && (
        <ProjectDialog project={current} onClose={() => setCurrent(null)} />
      )}
    </section>
  );
}

function ProjectDialog({ project, onClose }) {
  useEffect(() => {
    const onKey = (event) => {
      if (event.key === "Escape") onClose();
    };
    document.body.classList.add("dialog-open");
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("dialog-open");
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return createPortal(
    <div
      className={styles.dialog}
      role="dialog"
      aria-modal="true"
      aria-labelledby="projet-titre"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className={styles.sheet} onClick={(event) => event.stopPropagation()}>
        <button type="button" className={styles.close} onClick={onClose}>
          Fermer
        </button>
        <p className={styles.index}>{project.index}</p>
        <h2 id="projet-titre">{project.title}</h2>
        <p className={styles.subtitle}>{project.subtitle}</p>
        <dl>
          <div>
            <dt>Discipline</dt>
            <dd>{project.discipline}</dd>
          </div>
          <div>
            <dt>Matières</dt>
            <dd>{project.materials}</dd>
          </div>
        </dl>
        <p className={styles.lead}>{project.lead}</p>
        <img src={project.cover} alt={project.coverAlt} width="2000" height="1333" />
        <div className={styles.notes}>
          {project.sections.map((section) => (
            <section key={section.title}>
              <h3>{section.title}</h3>
              <p>{section.body}</p>
            </section>
          ))}
        </div>
      </div>
    </div>,
    document.body
  );
}
