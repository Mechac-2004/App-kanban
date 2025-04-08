import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Signup from "./components/Auth/inscription/Inscription";
import Login from "./components/Auth/connexion/Login";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import Header from "./components/Header";
import Board from "./components/Board";

import "./App.css";
function AppContent() {
  const location = useLocation();
  console.log(location.pathname);  // Log de la route actuelle

  const hideHeader = ["/inscription", "/connexion"].includes(location.pathname);

  return (
    <div id="root">
      { /*Affichage conditionnel du Header et Board*/}
      {!hideHeader && <Header />}
      
      {/*Le contenu principal */}
      <main className={hideHeader ? "" : "main-content"}>
        {/* Affiche Board uniquement si on n'est pas sur la page d'inscription ou de connexion */}
        {!hideHeader && <Board />}
      
        {/* Les routes de l'application */}
        <Routes>
          <Route path="/inscription" element={<Signup />} />
          <Route path="/connexion" element={<Login />} />
          <Route
            path="./index"
            element={
              <ProtectedRoute>
                <Board />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
