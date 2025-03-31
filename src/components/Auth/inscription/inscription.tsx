import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate(); // Hook pour la navigation
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || 'Erreur lors de l\'inscription');
      }
  
      const data = await res.json();
      console.log('Inscription réussie:', data);
      
      // Et dans AppKanban.tsx
      const token = localStorage.getItem('authToken');
      if (!token) {
          // Redirection vers la page de connexion après inscription
          navigate('/connexion', { 
          state: { 
            registrationSuccess: true,
            email: formData.email 
          } 
        });
      }
      
      
    } catch (error) {
      console.error('Erreur:', error);
      setErrors({ 
        server: [error instanceof Error ? error.message : 'Erreur inconnue'] 
      });
    }
  };

  return (
    <div className="container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Inscription</h2>

        <label>Nom d'utilisateur</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        {errors.name && <p>{errors.name[0]}</p>}

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label>Mot de passe</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        {errors.server && <p className="error">{errors.server[0]}</p>}

        <button type="submit">S'inscrire</button>
      </form>
    </div>
  );
};

export default SignUp;