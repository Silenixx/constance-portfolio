export default function Presentation() {
  return (
    <section className="page bio">

      {/* En-tête + intro regroupés dans un panneau */}
      <section className="bio__panel">
        <header className="bio__header">
          <img
            src="/public/constance2.jpg"
            alt="Constance TAHAY"
            className="bio__photo"
          />
          <div>
            <h2 className="bio__title">Constance TAHAY</h2>
            <p className="bio__tagline">Designer conceptrice d'outils</p>
            <div className="actions">
              <a className="btn" href="/contact">Me contacter</a>
              {/* <a className="btn btn--ghost" href="/cv.pdf" target="_blank" rel="noreferrer">Télécharger le CV</a> */}
            </div>
          </div>
        </header>

        <article className="bio__intro">
          <p>
            Je conçois des espaces (intérieurs et extérieurs), des scénographies et des objets
            en mettant l’usage au centre. Mon travail croise pédagogie, matérialité et narration :
            chaque projet doit être lisible, fonctionnel et durable.
          </p>
          <p>
            J’accompagne particuliers, collectivités et structures culturelles de la phase d’idée
            jusqu’à la mise en œuvre : recherche, esquisses, maquettes, choix matériaux, plans et suivi.
            Côté pédagogie, je développe des supports ludiques pour transmettre méthodes et savoir-faire.
          </p>
        </article>
      </section>

      {/* Sections */}
      <section className="bio__section">
        <h3 className="section__title"><span>Parcours scolaire</span></h3>
        <ul className="timeline">
          <li>
            <span className="timeline__year">2022 — 2024</span>
            <div>
              <strong>DNSEP, Design des milieux</strong><br/>
              École nationale supérieure d’art et de design de Nancy
            </div>
          </li>
          <li>
            <span className="timeline__year">2019 — 2022</span>
            <div>
              <strong>DNA design d’objet & espace</strong><br/>
              ÉSAD de Reims
            </div>
          </li>
          <li>
            <span className="timeline__year">2017</span>
            <div>
              <strong>CPES-CAAP</strong><br/>Lycée — Ville
            </div>
          </li>
          <li>
            <span className="timeline__year">2017</span>
            <div>
              <strong>Baccalauréat scientifique</strong><br/>
              Ensemble scolaire Notre Dame Saint Joseph
            </div>
          </li>
        </ul>
      </section>

      <section className="bio__section">
        <h3 className="section__title"><span>Parcours professionnel</span></h3>
        <ul className="timeline">
          <li>
            <span className="timeline__year">2024 — Aujourd’hui</span>
            <div>
              <strong>Designer d’espaces & d’objets — Indépendante</strong><br/>
              Conception d’intérieurs, scénographies, signalétique, mobiliers sur mesure.
            </div>
          </li>
          <li>
            <span className="timeline__year">2022 — 2024</span>
            <div>
              <strong>Designer — Agence / Collectivité</strong><br/>
              AMO, plans, rendus, suivi de fabrication, coordination corps d’état.
            </div>
          </li>
          <li>
            <span className="timeline__year">2020 — 2022</span>
            <div>
              <strong>Chargée d’outils pédagogiques</strong><br/>
              Création de supports ludiques, ateliers, kits méthodologiques.
            </div>
          </li>
        </ul>
      </section>

      <section className="bio__section">
        <h3 className="section__title"><span>Compétences</span></h3>
        <ul className="chips">
          <li className="chip">Design d’espaces (int./ext.)</li>
          <li className="chip">Scénographie</li>
          <li className="chip">Design d’objets</li>
          <li className="chip">Outils pédagogiques</li>
          <li className="chip">Esquisses & maquettes</li>
          <li className="chip">Plans & détails techniques</li>
          <li className="chip">Suivi de chantier</li>
        </ul>
      </section>
    </section>
  );
}
