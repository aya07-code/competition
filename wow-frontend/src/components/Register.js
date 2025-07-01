import { useState } from "react";
import api, { csrf } from "../api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "", password_confirmation: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await api.get('/sanctum/csrf-cookie');
      await csrf(); // Obligatoire pour Sanctum
      await api.post("/register", form);
      navigate("/"); // Redirection après inscription
    } catch (err) {
      console.error("Erreur complète:", err);
      if (err.response) {
        setError(JSON.stringify(err.response.data.errors || err.response.data.message));
      } else {
        setError("Erreur réseau ou serveur injoignable");
      }
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="register-form">
        <h2>Inscription</h2>
        <input name="name" placeholder="Nom" onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Mot de passe" onChange={handleChange} required />
        <input name="password_confirmation" type="password" placeholder="Confirmation" onChange={handleChange} required />
        {error && <p className="error-message">{error}</p>}
        <button type="submit">S'inscrire</button>
      </form>

      <style>{`
        .register-container {
          min-height: 100vh;
          background-color: #111827;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 2rem;
        }

        .register-form {
          background-color: #1f2937;
          padding: 2rem;
          border-radius: 0.5rem;
          box-shadow: 0 0 10px rgba(0,0,0,0.5);
          color: white;
          width: 100%;
          max-width: 400px;
        }

        .register-form h2 {
          text-align: center;
          margin-bottom: 1.5rem;
          color: #facc15;
        }

        .register-form input {
          width: 100%;
          padding: 0.75rem;
          margin-bottom: 1rem;
          border: 1px solid #4b5563;
          border-radius: 0.375rem;
          background-color: #374151;
          color: white;
        }

        .register-form button {
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

        .register-form button:hover {
          background-color: #fde047;
        }

        .error-message {
          color: red;
          margin-top: -0.5rem;
          margin-bottom: 1rem;
          font-size: 0.9rem;
        }
      `}</style>
    </div>
  );
}
