import { useRef, useState } from "react";
import styles from "./Pieces.module.css";

const burst = Array.from({ length: 22 }, (_, i) => {
  const angle = (i * Math.PI) / 11 - Math.PI / 2;
  const radius = i % 2 === 0 ? 46 : 27;
  return `${(50 + radius * Math.cos(angle)).toFixed(1)},${(50 + radius * Math.sin(angle)).toFixed(1)}`;
}).join(" ");

// Formes découpées, dessinées dans un carré de 100.
const shapes = {
  croix: <path d="M50 22v56M22 50h56" fill="none" stroke="currentColor" strokeWidth="36" strokeLinecap="round" />,
  lune: <path d="M92 34A44 44 0 1 1 8 34a44 34 0 0 0 84 0Z" />,
  etoile: <polygon points={burst} stroke="currentColor" strokeWidth="6" strokeLinejoin="round" />,
  goutte: <path d="M50 6c10 26 32 40 32 58a32 32 0 0 1-64 0c0-18 22-32 32-58Z" />,
  arche: <path d="M6 84a44 44 0 0 1 88 0H66a16 16 0 0 0-32 0Z" stroke="currentColor" strokeWidth="6" strokeLinejoin="round" />,
  galet: <path d="M50 6c15 0 24 11 24 23 0 9-4 13-4 20s8 12 8 24c0 13-12 22-28 22S22 86 22 73c0-12 8-17 8-24s-4-11-4-20C26 17 35 6 50 6Z" />,
};

const pieces = [
  { shape: "etoile", color: "#6542c4", x: 30, y: 62, turn: 8, scale: 1 },
  { shape: "croix", color: "#f6b62e", x: 47, y: 34, turn: -10, scale: 1.05 },
  { shape: "arche", color: "#c4532f", x: 88, y: 36, turn: 12, scale: 1 },
  { shape: "galet", color: "#f2a3c4", x: 61, y: 70, turn: 28, scale: 0.9 },
  { shape: "goutte", color: "#8fb5a3", x: 73, y: 30, turn: -14, scale: 0.8 },
  { shape: "lune", color: "#f08a2c", x: 80, y: 78, turn: 18, scale: 1 },
];

export function Shape({ name, className, style }) {
  return (
    <svg className={className} style={style} viewBox="0 0 100 100" aria-hidden="true" fill="currentColor">
      {shapes[name]}
    </svg>
  );
}

// Les pièces du haut de page : on peut les attraper et les déplacer.
export function Pieces() {
  const [moves, setMoves] = useState({});
  const [held, setHeld] = useState(null);
  const [order, setOrder] = useState([]);
  const grip = useRef(null);

  return (
    <div className={styles.pieces} aria-hidden="true">
      {pieces.map((piece) => {
        const move = moves[piece.shape] ?? { x: 0, y: 0 };
        const lifted = held === piece.shape;
        return (
          <div
            key={piece.shape}
            className={`${styles.piece} ${lifted ? styles.held : ""}`}
            style={{
              left: `${piece.x}%`,
              top: `${piece.y}%`,
              color: piece.color,
              zIndex: 1 + order.indexOf(piece.shape) + 1,
              "--scale": piece.scale,
              transform: `translate(-50%, -50%) translate(${move.x}px, ${move.y}px) rotate(${piece.turn + (lifted ? 6 : 0)}deg)`,
            }}
            onPointerDown={(event) => {
              event.currentTarget.setPointerCapture(event.pointerId);
              grip.current = { x: event.clientX - move.x, y: event.clientY - move.y };
              setHeld(piece.shape);
              setOrder((list) => [...list.filter((name) => name !== piece.shape), piece.shape]);
            }}
            onPointerMove={(event) => {
              if (!lifted || !grip.current) return;
              const next = { x: event.clientX - grip.current.x, y: event.clientY - grip.current.y };
              setMoves((all) => ({ ...all, [piece.shape]: next }));
            }}
            onPointerUp={() => setHeld(null)}
            onPointerCancel={() => setHeld(null)}
          >
            <Shape name={piece.shape} />
          </div>
        );
      })}
    </div>
  );
}
