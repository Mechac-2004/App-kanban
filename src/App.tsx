import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./components/Auth/inscription/inscription";
import Login from "./components/Auth/Connexion/login";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/inscription" element={<Signup />} />
          <Route path="/connexion" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
