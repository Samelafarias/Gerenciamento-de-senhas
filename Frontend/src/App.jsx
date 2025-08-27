import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// importação das páginas
import Inicio from "./pages/Inicio";
import Dados from "./pages/Dados";
import Ticket from "./pages/Ticket";
import Adm from "./pages/Adm";
import Visor from "./pages/Visor";

function App() {
  return (
    <Router>
      <Routes>
        {/* rotas */}
        <Route path="/" element={<Inicio />} />

        <Route path="dados" element={<Dados />} />

        <Route path="ticket" element={<Ticket />} />

        <Route path="adm" element={<Adm />} />

        <Route path="visor" element={<Visor />} />
      </Routes>
    </Router>
  );
}

export default App;
