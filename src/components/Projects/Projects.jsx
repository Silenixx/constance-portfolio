import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./Projects.module.css";
import { booklets, posters, projects } from "../../data/site.js";

const groups = [
  {
    id: "pedagogiques",
    title: "Outils pédagogiques",
    lead: "Des objets que l’on manipule pour nommer, montrer et apprendre.",
    items: projects,
  },
  {
    id: "communication",
    title: "Supports de communication",
    lead: "Livrets, affiches et roll-ups, à lire dans la page.",
    items: [...booklets, ...posters],
    band: true,
  },
  {
    id: "logos",
    title: "Logos",
    lead: "Signes et identités visuelles.",
    items: [],
  },
];

export function Projects() {
  const [current, setCurrent] = useState(null);

  return (
    <section className={styles.section} id="projets">
      <header className={styles.head}>
        <p>Projets</p>
        <h2>Trois familles</h2>
      </header>
      {groups.map((group) => (
        <div
          key={group.id}
          id={group.id}
          className={group.band ? styles.band : styles.group}
        >
          <header className={styles.groupHead}>
            <h3>{group.title}</h3>
            <p>{group.lead}</p>
          </header>
          {group.items.length > 0 ? (
            <ProjectList
              items={group.items}
              priority={group.id === "pedagogiques"}
              pages={group.id === "communication"}
              onOpen={setCurrent}
            />
          ) : (
            <p className={styles.soon}>
              Les identités visuelles seront montrées ici.
            </p>
          )}
        </div>
      ))}
      {current?.file ? (
        <BookDialog book={current} onClose={() => setCurrent(null)} />
      ) : current ? (
        <ProjectDialog project={current} onClose={() => setCurrent(null)} />
      ) : null}
    </section>
  );
}

function ProjectList({ items, priority, pages, onOpen }) {
  return (
    <div className={pages ? `${styles.list} ${styles.pages}` : styles.list}>
      {items.map((project, index) => (
        <article
          key={project.slug}
          className={index % 2 === 1 ? styles.flip : undefined}
        >
          <button
            type="button"
            className={styles.cover}
            aria-label={`Voir ${project.title}`}
            onClick={() => onOpen(project)}
          >
            <img
              src={project.cover}
              alt={project.coverAlt}
              width={project.coverWidth ?? 1800}
              height={project.coverHeight ?? 1200}
              loading={priority && index === 0 ? "eager" : "lazy"}
            />
          </button>
          <button
            type="button"
            className={styles.copy}
            onClick={() => onOpen(project)}
          >
            <h4>{project.title}</h4>
            <p>{project.subtitle}</p>
            <p className={styles.materials}>{project.materials}</p>
            <span>Voir le projet</span>
          </button>
        </article>
      ))}
    </div>
  );
}

function useDialogLock(onClose) {
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
}

function BookDialog({ book, onClose }) {
  useDialogLock(onClose);
  const href = encodeURI(`/${book.folder ?? "livret"}/${book.file}`);

  return createPortal(
    <div
      className={`${styles.dialog} ${styles.dialogBook}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="livret-titre"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        className={`${styles.sheet} ${styles.sheetBook}`}
        onClick={(event) => event.stopPropagation()}
      >
        <div className={styles.bookSide}>
          <h2 id="livret-titre">{book.title}</h2>
          <p className={styles.subtitle}>{book.subtitle}</p>
          <p className={styles.lead}>{book.lead}</p>
          <div className={styles.actions}>
            <a href={href} download={book.file}>
              Télécharger
            </a>
            <a href={href} target="_blank" rel="noreferrer noopener">
              Ouvrir
            </a>
            <button type="button" className={styles.close} onClick={onClose}>
              Fermer
            </button>
          </div>
        </div>
        <iframe
          className={styles.viewer}
          src={`${href}#view=Fit&zoom=page-fit&navpanes=0`}
          title={book.title}
        />
      </div>
    </div>,
    document.body
  );
}

function ProjectDialog({ project, onClose }) {
  useDialogLock(onClose);

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
