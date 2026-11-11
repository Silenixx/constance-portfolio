import { Header } from "./components/Header/Header";
import { Hero } from "./components/Hero/Hero";
import { Works } from "./components/Works/Works";
import { About } from "./components/About/About";
import { Contact } from "./components/Contact/Contact";

export default function App() {
  return (
    <>
      <a className="skip" href="#projets">
        Aller aux projets
      </a>
      <Header />
      <main>
        <Hero />
        <Works />
        <About />
      </main>
      <Contact />
    </>
  );
}
