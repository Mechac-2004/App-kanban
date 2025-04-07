import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  // Vérifie la présence du token ET s'il est valide (optionnel)
  const token = localStorage.getItem('authToken');
  const isAuthenticated = !!token; // Vous pourriez ajouter une vérification JWT ici

  if (!isAuthenticated) {
    // Redirige vers le login en sauvegardant la location actuelle
    return <Navigate to="/connexion" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;