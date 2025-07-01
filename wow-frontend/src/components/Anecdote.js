import React, { useState } from "react";
import api from "../api";

export default function Anecdote({ anecdote, user }) {
  // Toujours en haut : ne jamais mettre après un "if" ou "return"
  const [votes, setVotes] = useState(() => ({
    bof: anecdote?.votes?.bof ?? 0,
    excellent: anecdote?.votes?.excellent ?? 0,
    technique: anecdote?.votes?.technique ?? 0,
    wow: anecdote?.votes?.wow ?? 0,
  }));

  // Ensuite, on vérifie si l'objet est vide et on retourne null
  if (!anecdote) return null;

  const handleVote = async (type) => {
    try {
      const response = await api.post(`/anecdotes/${anecdote.id}/vote`, { type });
      setVotes(response.data.votes);
    } catch (err) {
      console.error("Erreur de vote :", err);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Supprimer cette anecdote ?")) return;
    try {
      await api.delete(`/anecdotes/${anecdote.id}`);
      window.location.reload();
    } catch (err) {
      console.error("Erreur suppression :", err);
    }
  };

  const isOwnerOrAdmin = user && (user.id === anecdote.user_id || user.role === "admin");

  return (
    <div className="bg-white p-4 rounded shadow mb-4 text-black">
      <h2 className="text-xl font-bold">{anecdote.title}</h2>
      <p className="mt-2">{anecdote.content}</p>

      <div className="flex space-x-4 mt-4">
        {["bof", "excellent", "technique", "wow"].map((type) => (
          <button
            key={type}
            onClick={() => handleVote(type)}
            className="bg-gray-100 px-3 py-1 rounded hover:bg-yellow-200"
          >
            {type} ({votes[type] ?? 0})
          </button>
        ))}
      </div>

      {isOwnerOrAdmin && (
        <button
          onClick={handleDelete}
          className="mt-4 text-red-600 hover:underline"
        >
          🗑 Supprimer
        </button>
      )}
    </div>
  );
}
