import { Navbar } from "./components/Navbar/Navbar";
import { Presentation } from "./components/Presentation/Presentation";
import { Projects } from "./components/Projects/Projects";
import { Formation } from "./components/Formation/Formation";
import { Experience } from "./components/Experience/Experience";
import { Skills } from "./components/Skills/Skills";
import { Contact } from "./components/Contact/Contact";
import { BackToTop } from "./components/BackToTop/BackToTop";

export default function App() {
  return (
    <>
      <Navbar />
      <main id="contenu">
        <Presentation />
        <Experience />
        <Projects />
        <Formation />
        <Skills />
        <Contact />
      </main>
      <BackToTop />
    </>
  );
}
