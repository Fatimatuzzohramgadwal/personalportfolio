function Skills() {
  const skills = ["HTML", "CSS", "JavaScript", "React", "Java", "Spring Boot"];

  return (
    <div className="container">
      <h1>My Skills</h1>

      {skills.map((skill, index) => (
        <div className="card" key={index}>
          <h3>{skill}</h3>
        </div>
      ))}
    </div>
  );
}

export default Skills;