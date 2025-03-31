import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./components/Auth/inscription/inscription";
import Login from "./components/Auth/Connexion/login";
import Kanban from './Content/Appkanban'
import ProtectedRoute from './components/Auth/ProtectedRoute';

function App() {
  
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/inscription" element={<Signup />} />
          <Route path="/connexion" element={<Login />} />
          <Route path="/index" element={<Kanban/>} />

          {/* Routes protégées */}
        <Route 
          path="/Content/Appkanban" 
          element={
            <ProtectedRoute>
              <Kanban />
            </ProtectedRoute>
          } 
        />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
