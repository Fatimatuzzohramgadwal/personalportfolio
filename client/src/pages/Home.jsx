import { Link } from "react-router-dom";

function Home() {
  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>Hello, I'm a Full Stack Developer 🚀</h1>

      <p style={{ marginTop: "10px" }}>
        Building modern web applications with MERN stack
      </p>

      <Link to="/projects">
        <button style={{ marginTop: "20px", padding: "10px 20px" }}>
          View Projects
        </button>
      </Link>
    </div>
  );
}

export default Home;