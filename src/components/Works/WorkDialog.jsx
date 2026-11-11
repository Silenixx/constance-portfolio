import { useEffect, useRef, useState } from "react";
import styles from "./Works.module.css";
import { tones } from "../../data/site.js";
import { Picture } from "../Picture/Picture.jsx";

export function WorkDialog({ work, position, onClose, onPrev, onNext }) {
  const ref = useRef(null);
  const swipe = useRef(null);
  const [shown, setShown] = useState(0);
  const count = work.images.length;
  const [src, alt] = work.images[shown];
  const turn = (delta) => setShown((current) => (current + delta + count) % count);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog.open) dialog.showModal();
    return () => {
      if (dialog.open) dialog.close();
    };
  }, []);

  return (
    <dialog
      ref={ref}
      className={styles.dialog}
      aria-labelledby="fiche-titre"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === ref.current) onClose();
      }}
      onKeyDown={(event) => {
        if (count < 2) return;
        if (event.key === "ArrowRight") turn(1);
        if (event.key === "ArrowLeft") turn(-1);
      }}
    >
      <div className={styles.sheet}>
        <div className={styles.bar}>
          <span>{position}</span>
          <button type="button" className={styles.close} onClick={onClose}>
            Fermer
          </button>
        </div>

        <div className={styles.stage} style={{ "--tone": tones[work.tone] }}>
          <div
            className={styles.frame}
            // Au doigt : balayer vers la gauche ou la droite change d'image.
            onPointerDown={(event) => {
              if (event.pointerType === "mouse" || count < 2) return;
              swipe.current = { x: event.clientX, y: event.clientY };
            }}
            onPointerUp={(event) => {
              const start = swipe.current;
              swipe.current = null;
              if (!start) return;
              const dx = event.clientX - start.x;
              const dy = event.clientY - start.y;
              if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.5) turn(dx < 0 ? 1 : -1);
            }}
            onPointerCancel={() => {
              swipe.current = null;
            }}
          >
            <Picture key={src} src={src} alt={alt} eager sizes="(max-width: 860px) 100vw, 70vw" />
            {count > 1 && (
              <>
                <button
                  type="button"
                  className={`${styles.arrow} ${styles.arrowPrev}`}
                  aria-label="Image précédente"
                  onClick={() => turn(-1)}
                >
                  ←
                </button>
                <button
                  type="button"
                  className={`${styles.arrow} ${styles.arrowNext}`}
                  aria-label="Image suivante"
                  onClick={() => turn(1)}
                >
                  →
                </button>
              </>
            )}
          </div>
          {count > 1 && (
            <div className={styles.thumbs}>
              {work.images.map(([thumb], index) => (
                <button
                  key={thumb}
                  type="button"
                  className={styles.thumb}
                  aria-label={`Image ${index + 1} sur ${count}`}
                  aria-current={index === shown}
                  onClick={() => setShown(index)}
                >
                  <Picture src={thumb} sizes="64px" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className={styles.info}>
          <p className={styles.label}>{work.kind}</p>
          <h2 id="fiche-titre">{work.title}</h2>
          {work.subtitle && <p className={styles.subtitle}>{work.subtitle}</p>}
          {work.lead && <p className={styles.lead}>{work.lead}</p>}

          {work.materials && (
            <dl className={styles.facts}>
              <dt>Matières</dt>
              <dd>{work.materials}</dd>
            </dl>
          )}

          {work.pdf && (
            <p className={styles.actions}>
              <a href={encodeURI(work.pdf)} target="_blank" rel="noreferrer noopener">
                Ouvrir le PDF
              </a>
              <a href={encodeURI(work.pdf)} download>
                Télécharger
              </a>
            </p>
          )}

          <div className={styles.pager}>
            <button type="button" onClick={onPrev}>
              ← Précédent
            </button>
            <button type="button" onClick={onNext}>
              Suivant →
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
}
