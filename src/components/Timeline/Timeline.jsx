import styles from "./Timeline.module.css";

export function Timeline({ id, kicker, title, items }) {
  return (
    <section className={styles.section} id={id}>
      <p className={styles.kicker}>{kicker}</p>
      <h2>{title}</h2>
      <ol>
        {items.map((item) => (
          <li key={`${item.year}-${item.title}`}>
            <span>{item.year}</span>
            <div>
              <strong>{item.title}</strong>
              <p>{item.place}</p>
              {item.detail ? <p className={styles.detail}>{item.detail}</p> : null}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
