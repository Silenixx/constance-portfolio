import { Timeline } from "../Timeline/Timeline";
import { experience } from "../../data/site.js";

export function Experience() {
  return (
    <Timeline
      id="parcours"
      kicker="Parcours"
      title="Expérience"
      items={experience}
    />
  );
}
