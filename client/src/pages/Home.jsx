import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="container home-page">
      <h1>Hello, I'm a Full Stack Developer 🚀</h1>

      <p>
        Building modern web applications with MERN stack
      </p>

      <Link to="/projects">
        <button className="btn">
          View Projects
        </button>
      </Link>
    </div>
  );
}

export default Home;