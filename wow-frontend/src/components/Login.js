import { useState } from "react";
import api, { csrf } from "../api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await csrf(); // Obligatoire avec Sanctum
      await api.post("/login", form);
      navigate("/");
    } catch (err) {
      setError("Identifiants invalides");
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Connexion</h2>
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Mot de passe"
          onChange={handleChange}
          required
        />
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Se connecter</button>
      </form>

      {/* CSS intégré */}
      <style>{`
        .login-container {
          min-height: 100vh;
          background-color: #111827;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 2rem;
        }

        .login-form {
          background-color: #1f2937;
          padding: 2rem;
          border-radius: 0.5rem;
          box-shadow: 0 0 10px rgba(0,0,0,0.5);
          color: white;
          width: 100%;
          max-width: 400px;
        }

        .login-form h2 {
          text-align: center;
          margin-bottom: 1.5rem;
          color: #facc15;
        }

        .login-form input {
          width: 100%;
          padding: 0.75rem;
          margin-bottom: 1rem;
          border: 1px solid #4b5563;
          border-radius: 0.375rem;
          background-color: #374151;
          color: white;
        }

        .login-form button {
          width: 100%;
          padding: 0.75rem;
          background-color: #facc15;
          color: black;
          font-weight: bold;
          border: none;
          border-radius: 0.375rem;
          cursor: pointer;
          transition: background-color 0.2s ease-in-out;
        }

        .login-form button:hover {
          background-color: #fde047;
        }

        .error-message {
          color: red;
          font-size: 0.9rem;
          margin-bottom: 1rem;
        }
      `}</style>
    </div>
  );
}
