import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar.jsx";
import Home from "./pages/Home.jsx";
import OutilsPedagogique from "./pages/OutilsPedagogiques.jsx";
import DesignEspaces from "./pages/DesignEspaces.jsx";
import DesignObjets from "./pages/DesignObjets.jsx";
import Contact from "./pages/Contact.jsx";
import Presentation from "./pages/Presentation.jsx";
import Graphisme from "./pages/Graphisme.jsx";


export default function App() {
  return (
    <div className="layout">
      <aside className="layout__aside">
        <Sidebar />
      </aside>
      <main className="layout__main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/presentation" element={<Presentation />} />
          <Route path="/outils-pedagogiques" element={<OutilsPedagogique />} />
          <Route path="/graphisme" element={<Graphisme />} />
          <Route path="/design-d-espaces" element={<DesignEspaces />} />
          <Route path="/design-d-objets" element={<DesignObjets />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
    </div>
  );
}
