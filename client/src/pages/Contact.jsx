import { useState } from "react";

function Contact() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !message) {
      alert("Please fill all fields ❗");
      return;
    }

    try {
      const res = await fetch("https://personalportfolio-api-ashy.vercel.app/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          message,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.message);

        // clear form after success
        setName("");
        setEmail("");
        setMessage("");
      } else {
        alert(data.error || "Something went wrong ❌");
      }

    } catch (error) {
      console.error(error);
      alert("Server error ❌");
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Contact Me</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ display: "block", margin: "10px 0", padding: "10px", width: "300px" }}
        />

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ display: "block", margin: "10px 0", padding: "10px", width: "300px" }}
        />

        <textarea
          placeholder="Enter your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{ display: "block", margin: "10px 0", padding: "10px", width: "300px", height: "100px" }}
        />

        <button
          type="submit"
          style={{
            padding: "10px 20px",
            background: "black",
            color: "white",
            border: "none",
            cursor: "pointer"
          }}
        >
          Send Message
        </button>

      </form>
    </div>
  );
}

export default Contact;