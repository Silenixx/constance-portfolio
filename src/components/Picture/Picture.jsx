import dimensions from "../../data/images.json";

// Version web d'un original de public/ (fabriquée par `npm run images`).
function web(src, width) {
  return `/img${src.replace(/\.\w+$/, "")}-${width}.webp`;
}

export function Picture({ src, alt = "", sizes = "100vw", eager = false, className }) {
  const { w, h } = dimensions[src] ?? {};
  return (
    <img
      className={className}
      src={web(src, 1600)}
      srcSet={`${web(src, 640)} 640w, ${web(src, 1600)} 1600w`}
      sizes={sizes}
      width={w}
      height={h}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      draggable="false"
    />
  );
}
