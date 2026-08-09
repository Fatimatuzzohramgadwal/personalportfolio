import p1 from "../assets/project1.png";
import p2 from "../assets/project2.png";

function Projects() {
  const projects = [
    {
      title: "Smart Campus System",
      desc: "Booking system for labs",
      img: p1
    },
    {
      title: "Complaint System",
      desc: "Student complaint tracking",
      img: p2
    }
  ];

  return (
    <div className="container">
      <h1>My Projects</h1>

      {projects.map((project, index) => (
        <div className="card" key={index}>
          <img
            src={project.img}
            alt=""
            style={{ width: "100%", borderRadius: "10px" }}
          />
          <h3>{project.title}</h3>
          <p>{project.desc}</p>
          <button className="btn">View</button>
        </div>
      ))}
    </div>
  );
}

export default Projects;