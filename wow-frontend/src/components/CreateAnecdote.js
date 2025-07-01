// src/pages/CreateAnecdote.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreateAnecdote() {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(
        "http://127.0.0.1:8000/api/anecdotes",
        { title, content },
        { withCredentials: true }
      )
      .then(() => {
        navigate("/"); // rediriger vers page d’accueil
      })
      .catch((err) => {
        console.error("Erreur création :", err);
      });
  };

  return (
    <div className="create-container">
      <h1 className="create-title">Partager une anecdote</h1>
      <form onSubmit={handleSubmit} className="create-form">
        <input
          type="text"
          placeholder="Titre"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="create-input"
          required
        />
        <textarea
          placeholder="Votre anecdote..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="create-textarea"
          required
        ></textarea>
        <button type="submit" className="create-button">
          Publier
        </button>
      </form>

      {/* CSS inline dans le composant */}
      <style>{`
        .create-container {
          min-height: 100vh;
          background-color: #000;
          color: white;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .create-title {
          font-size: 2rem;
          font-weight: bold;
          margin-bottom: 1.5rem;
          color: #facc15;
        }

        .create-form {
          width: 100%;
          max-width: 600px;
        }

        .create-input,
        .create-textarea {
          width: 100%;
          padding: 1rem;
          margin-bottom: 1.5rem;
          border-radius: 0.5rem;
          border: 1px solid #374151;
          background-color: #1f2937;
          color: white;
          font-size: 1rem;
        }

        .create-textarea {
          height: 160px;
          resize: vertical;
        }

        .create-button {
          background-color: #facc15;
          color: black;
          font-weight: 600;
          padding: 0.75rem 2rem;
          border-radius: 0.5rem;
          border: none;
          cursor: pointer;
          transition: background-color 0.2s ease-in-out;
        }

        .create-button:hover {
          background-color: #fde047;
        }
      `}</style>
    </div>
  );
}
