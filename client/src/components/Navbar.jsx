import { Link } from "react-router-dom";
import {
  FaHome,
  FaUser,
  FaCode,
  FaProjectDiagram,
  FaMoon,
  FaSun,
  FaLock,
} from "react-icons/fa";

function Navbar({ darkMode, toggleTheme }) {
  return (
    <nav
      style={{
        ...styles.navbar,
        backgroundColor: darkMode ? "#020617" : "#ffffff",
        color: darkMode ? "#ffffff" : "#111827",
        boxShadow: darkMode
          ? "0 2px 10px rgba(0,0,0,0.4)"
          : "0 2px 10px rgba(0,0,0,0.1)",
      }}
    >
      {/* LOGO */}
      <Link
        to="/"
        style={{
          ...styles.logo,
          color: "#38bdf8",
        }}
      >
        MyPortfolio
      </Link>

      {/* NAVIGATION */}
      <div style={styles.navLinks}>
        <Link to="/" style={linkStyle(darkMode)}>
          <FaHome />
          <span>Home</span>
        </Link>

        <Link to="/about" style={linkStyle(darkMode)}>
          <FaUser />
          <span>About</span>
        </Link>

        <Link to="/skills" style={linkStyle(darkMode)}>
          <FaCode />
          <span>Skills</span>
        </Link>

        <Link to="/projects" style={linkStyle(darkMode)}>
          <FaProjectDiagram />
          <span>Projects</span>
        </Link>

        <Link to="/contact" style={linkStyle(darkMode)}>
          <span>Contact</span>
        </Link>

        {/* ADMIN LOGIN */}
        <Link to="/login" style={linkStyle(darkMode)}>
          <FaLock />
          <span>Admin Login</span>
        </Link>

        {/* THEME TOGGLE */}
        <button
          onClick={toggleTheme}
          title={
            darkMode
              ? "Switch to Light Mode"
              : "Switch to Dark Mode"
          }
          aria-label={
            darkMode
              ? "Switch to Light Mode"
              : "Switch to Dark Mode"
          }
          style={{
            ...styles.toggleButton,
            backgroundColor: darkMode ? "#f8fafc" : "#0f172a",
            color: darkMode ? "#0f172a" : "#ffffff",
          }}
        >
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>
      </div>
    </nav>
  );
}

/* Navigation Link Style */
const linkStyle = (darkMode) => ({
  display: "inline-flex",
  alignItems: "center",
  gap: "7px",
  margin: "0 5px",
  padding: "9px 10px",
  color: darkMode ? "#ffffff" : "#111827",
  textDecoration: "none",
  fontSize: "15px",
  fontWeight: "500",
  borderRadius: "6px",
  transition: "all 0.25s ease",
});

/* Navbar Styles */
const styles = {
  navbar: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "14px 40px",
    minHeight: "68px",
    boxSizing: "border-box",
    position: "relative",
    zIndex: 1000,
    transition:
      "background-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease",
  },

  logo: {
    margin: 0,
    fontSize: "24px",
    fontWeight: "bold",
    textDecoration: "none",
    whiteSpace: "nowrap",
  },

  navLinks: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    flexWrap: "wrap",
  },

  toggleButton: {
    marginLeft: "12px",
    width: "40px",
    height: "40px",
    border: "none",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    fontSize: "16px",
    transition: "all 0.25s ease",
    flexShrink: 0,
  },
};

export default Navbar;