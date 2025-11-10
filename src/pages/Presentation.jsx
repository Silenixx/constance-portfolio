export default function Presentation() {
  return (
    <section className="page bio">
      <header className="bio__header">
        <img
          src="/public/constance2.jpg"  // mets ton image ici (public/images/constance.jpg)
          alt="Constance TAHAY"
          className="bio__photo"
        />
        <div>
          <h2>Constance TAHAY</h2>
          <p className="bio__tagline">
            Designer conceptrice d'outils
          </p>
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

      <section className="bio__section">
        <h3>Parcours scolaire</h3>
        <ul className="timeline">
          {/* TODO: remplace par tes vraies infos */}
          <li>
            <span className="timeline__year">2021 — 2023</span>
            <div>
              <strong>Master (ou équivalent) – Design d’espaces</strong><br/>
              École / Université — Ville
            </div>
          </li>
          <li>
            <span className="timeline__year">2018 — 2021</span>
            <div>
              <strong>Licence / DNMADE – Design</strong><br/>
              Établissement — Ville
            </div>
          </li>
          <li>
            <span className="timeline__year">2017</span>
            <div>
              <strong>Baccalauréat</strong><br/>
              Lycée — Ville
            </div>
          </li>
        </ul>
      </section>

      <section className="bio__section">
        <h3>Parcours professionnel</h3>
        <ul className="timeline">
          {/* TODO: remplace par tes vraies missions */}
          <li>
            <span className="timeline__year">2024 — Aujourd’hui</span>
            <div>
              <strong>Designer d’espaces & d’objets – Indépendante</strong><br/>
              Conception d’intérieurs, scénographies, signalétique, mobiliers sur mesure.
            </div>
          </li>
          <li>
            <span className="timeline__year">2022 — 2024</span>
            <div>
              <strong>Designer – Agence / Collectivité</strong><br/>
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
        <h3>Compétences</h3>
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
