import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

export default function Home() {
  const [anecdotes, setAnecdotes] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/anecdotes", {
        withCredentials: true, // pour Sanctum
      })
      .then((res) => {
        setAnecdotes(res.data);
      })
      .catch((err) => {
        console.error("Erreur API :", err);
      });
  }, []);

  return (
    <div className="home-container">
    
      <h1 className="title">Liste des anecdotes</h1>
      <ul className="anecdote-list">
        {anecdotes.map((a) => (
          <li key={a.id} className="anecdote-card">
            <p className="anecdote-author">{a.user?.name || "Anonyme"} :</p>
            <p className="anecdote-content">{a.content}</p>
          </li>
        ))}
      </ul>

      <style>{`
        .home-container {
          min-height: 100vh;
          background-color: #111827;
          color: white;
          padding: 2rem;
        }

        .title {
          text-align: center;
          font-size: 2rem;
          font-weight: bold;
          color: #facc15;
          margin-bottom: 2rem;
        }

        .anecdote-list {
          list-style: none;
          padding: 0;
          max-width: 800px;
          margin: auto;
        }

        .anecdote-card {
          background-color: #1f2937;
          border: 1px solid #374151;
          border-radius: 0.5rem;
          padding: 1rem 1.5rem;
          margin-bottom: 1rem;
          box-shadow: 0 0 5px rgba(0,0,0,0.2);
        }

        .anecdote-author {
          font-weight: bold;
          color: #facc15;
          margin-bottom: 0.5rem;
        }

        .anecdote-content {
          color: #e5e7eb;
        }
      `}</style>
    </div>
  );
}
