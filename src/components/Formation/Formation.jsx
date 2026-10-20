import { Timeline } from "../Timeline/Timeline";
import { education } from "../../data/site.js";

export function Formation() {
  return (
    <Timeline
      id="formation"
      kicker="Formation"
      title="Parcours scolaire"
      items={education}
    />
  );
}
