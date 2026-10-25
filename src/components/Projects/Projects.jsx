import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./Projects.module.css";
import { booklets, logos, posters, projects } from "../../data/site.js";

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
    shelves: [
      { id: "livrets", label: "Livrets", items: booklets },
      { id: "affiches", label: "Affiches et roll-ups", items: posters },
    ],
    band: true,
  },
  {
    id: "logos",
    title: "Logos",
    lead: "Signes et identités visuelles.",
    items: logos,
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
          {group.shelves ? (
            <PageShelves shelves={group.shelves} onOpen={setCurrent} />
          ) : group.items.length > 0 ? (
            <ProjectList
              items={group.items}
              priority={group.id === "pedagogiques"}
              logos={group.id === "logos"}
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

function framesOf(project) {
  if (project.images?.length) return project.images;
  if (!project.cover) return [];
  return [{ src: project.cover, alt: project.coverAlt }];
}

function Gallery({ frames, className, label, priority, width, height, onOpen, keys, start = 0 }) {
  const count = frames.length;
  const [offset, setOffset] = useState(start);
  const [drag, setDrag] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [snapping, setSnapping] = useState(false);
  const [ready, setReady] = useState(false);
  const pointer = useRef(null);
  const swiped = useRef(false);
  const trackRef = useRef(null);
  const shown = ((offset % count) + count) % count;
  const strip = [frames[count - 1], ...frames, frames[0]];

  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    if (!snapping) return undefined;
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => setSnapping(false));
    });
    return () => cancelAnimationFrame(id);
  }, [snapping]);

  useEffect(() => {
    if (!keys || count < 2) return undefined;
    const onKey = (event) => {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      event.preventDefault();
      const delta = event.key === "ArrowRight" ? 1 : -1;
      setDrag(0);
      setOffset((current) => (current < 0 || current >= count ? current : current + delta));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [keys, count]);

  const go = (delta, event) => {
    event.preventDefault();
    event.stopPropagation();
    setDrag(0);
    setDragging(false);
    setOffset((current) => (current < 0 || current >= count ? current : current + delta));
  };

  const release = (distance, width) => {
    const threshold = Math.max(48, width * 0.16);
    setDragging(false);
    if (distance <= -threshold) {
      swiped.current = true;
      setDrag(0);
      setOffset((current) => current + 1);
      return;
    }
    if (distance >= threshold) {
      swiped.current = true;
      setDrag(0);
      setOffset((current) => current - 1);
      return;
    }
    setDrag(0);
  };

  const slides = (
    <div
      ref={trackRef}
      className={[
        styles.track,
        ready && !dragging && !snapping ? styles.smooth : "",
      ].filter(Boolean).join(" ")}
      style={{ transform: `translateX(calc(${offset + 1} * -100% + ${drag}px))` }}
      onTransitionEnd={(event) => {
        if (event.target !== trackRef.current || event.propertyName !== "transform") return;
        if (offset >= count) {
          setSnapping(true);
          setOffset(0);
        } else if (offset < 0) {
          setSnapping(true);
          setOffset(count - 1);
        }
      }}
    >
      {strip.map((frame, position) => (
        <img
          key={`${frame.src}-${position}`}
          src={frame.src}
          alt={position === offset + 1 ? frame.alt : ""}
          width={width}
          height={height}
          loading={priority && position === start + 1 ? "eager" : "lazy"}
          draggable="false"
          aria-hidden={position === offset + 1 ? undefined : true}
        />
      ))}
    </div>
  );

  return (
    <div
      className={[styles.gallery, className].filter(Boolean).join(" ")}
      onPointerDown={(event) => {
        if (count < 2 || event.target.closest(`.${styles.step}`)) return;
        pointer.current = { x: event.clientX, y: event.clientY, id: event.pointerId };
        swiped.current = false;
      }}
      onPointerMove={(event) => {
        const origin = pointer.current;
        if (!origin || event.pointerId !== origin.id) return;
        const distance = event.clientX - origin.x;
        const vertical = event.clientY - origin.y;
        if (!dragging && Math.abs(distance) < 8) return;
        if (!dragging && Math.abs(vertical) > Math.abs(distance)) {
          pointer.current = null;
          return;
        }
        event.currentTarget.setPointerCapture(origin.id);
        setDragging(true);
        setDrag(distance);
      }}
      onPointerUp={(event) => {
        const origin = pointer.current;
        pointer.current = null;
        if (!origin || event.pointerId !== origin.id) return;
        release(event.clientX - origin.x, event.currentTarget.offsetWidth);
      }}
      onPointerCancel={() => {
        pointer.current = null;
        setDragging(false);
        setDrag(0);
      }}
    >
      {onOpen ? (
        <button
          type="button"
          className={styles.coverOpen}
          aria-label={label}
          onClick={() => {
            if (swiped.current) {
              swiped.current = false;
              return;
            }
            onOpen(shown);
          }}
        >
          {slides}
        </button>
      ) : (
        slides
      )}
      {count > 1 && (
        <>
          <button
            type="button"
            className={`${styles.step} ${styles.prev}`}
            aria-label="Image précédente"
            onClick={(event) => go(-1, event)}
          >
            <span aria-hidden="true">←</span>
          </button>
          <button
            type="button"
            className={`${styles.step} ${styles.next}`}
            aria-label="Image suivante"
            onClick={(event) => go(1, event)}
          >
            <span aria-hidden="true">→</span>
          </button>
        </>
      )}
    </div>
  );
}

function PageShelves({ shelves, onOpen }) {
  return (
    <div className={styles.shelves}>
      {shelves.map((shelf) => (
        <div key={shelf.id}>
          <p className={styles.shelfLabel}>{shelf.label}</p>
          <div className={styles.shelf}>
            {shelf.items.map((item) => (
              <button
                key={item.slug}
                type="button"
                className={styles.page}
                onClick={() => onOpen(item)}
              >
                <span className={styles.pageFrame}>
                  <img
                    src={item.cover}
                    alt=""
                    width={item.coverWidth}
                    height={item.coverHeight}
                    loading="lazy"
                  />
                </span>
                <span className={styles.pageCopy}>
                  <span className={styles.pageTitle}>{item.title}</span>
                  <span className={styles.pageKind}>{item.materials}</span>
                </span>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function ProjectList({ items, priority, logos, onOpen }) {
  const className = [styles.list, logos && styles.logos]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={className}>
      {items.map((project, index) => {
        const frames = framesOf(project);
        return (
        <article
          key={project.slug}
          className={
            [
              !logos && index % 2 === 1 ? styles.flip : "",
              project.frame === "portrait" ? styles.portrait : "",
            ]
              .filter(Boolean)
              .join(" ") || undefined
          }
        >
          {frames.length > 1 ? (
            <Gallery
              className={styles.cover}
              frames={frames}
              label={`Voir ${project.title}`}
              priority={priority && index === 0}
              width={project.coverWidth ?? 1800}
              height={project.coverHeight ?? 1200}
              onOpen={(imageIndex) => onOpen({ ...project, imageIndex })}
            />
          ) : (
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
          )}
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
        );
      })}
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
      className={`${styles.dialog} ${styles.dialogProject}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="projet-titre"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className={`${styles.sheet} ${styles.sheetProject}`} onClick={(event) => event.stopPropagation()}>
        <div className={styles.sheetCopy}>
          <button type="button" className={styles.close} onClick={onClose}>
            Fermer
          </button>
          <h2 id="projet-titre">{project.title}</h2>
          <p className={styles.subtitle}>{project.subtitle}</p>
          {(project.discipline || project.materials) && (
            <dl>
              {project.discipline && (
                <div>
                  <dt>Discipline</dt>
                  <dd>{project.discipline}</dd>
                </div>
              )}
              {project.materials && (
                <div>
                  <dt>Matières</dt>
                  <dd>{project.materials}</dd>
                </div>
              )}
            </dl>
          )}
          <p className={styles.lead}>{project.lead}</p>
          {project.sections?.length > 0 && (
          <div className={styles.notes}>
            {project.sections.map((section) => (
              <section key={section.title}>
                <h3>{section.title}</h3>
                <p>{section.body}</p>
              </section>
            ))}
          </div>
          )}
        </div>
        <div className={styles.sheetVisual}>
          {framesOf(project).length > 1 ? (
            <Gallery
              frames={framesOf(project)}
              width={2000}
              height={1333}
              keys
              start={project.imageIndex ?? 0}
            />
          ) : (
            <img src={project.cover} alt={project.coverAlt} width="2000" height="1333" />
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
