// src/components/Nav.js
import { Link } from "react-router-dom";

export default function Nav() {
  const styles = {
    navbar: {
      backgroundColor: "#1e293b", // slate-800
      color: "#fff",
      padding: "1rem 2rem",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    logo: {
      fontSize: "1.5rem",
      fontWeight: "bold",
    },
    links: {
      listStyle: "none",
      display: "flex",
      gap: "1.5rem",
      margin: 0,
      padding: 0,
    },
    link: {
      textDecoration: "none",
      color: "#fff",
      fontWeight: 500,
      transition: "color 0.3s ease",
    },
    linkHover: {
      color: "#38bdf8", // sky-400
    }
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.logo}>WOW</div>
      <ul style={styles.links}>
        <li>
          <Link to="/" style={styles.link}>Accueil</Link>
        </li>
        <li>
          <Link to="/login" style={styles.link}>Connexion</Link>
        </li>
        <li>
          <Link to="/register" style={styles.link}>Inscription</Link>
        </li>
        <li>
          <Link to="/anecdotes" style={styles.link}>Anecdotes</Link>
        </li>
        <li>
          <Link to="/createanecdotes" style={styles.link}>Create Anecdotes</Link>
        </li>
      </ul>
    </nav>
  );
}
