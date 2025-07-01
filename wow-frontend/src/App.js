// src/App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import CreateAnecdote from "./components/CreateAnecdote";
import Anecdote from "./components/Anecdote";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/anecdotes" element={<Anecdote />} />
         <Route path="/createanecdotes" element={<CreateAnecdote />} />
      </Routes>
    </Router>
  );
}

export default App;
