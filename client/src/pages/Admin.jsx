import { useEffect, useState } from "react";
import axios from "axios";
import "./Admin.css";

function Admin() {
  const [messages, setMessages] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "/login";
  } else {
    fetchMessages();
  }
}, []);

  const fetchMessages = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.get("https://personalportfolio-api-ashy.vercel.app/api/contact", {
      headers: {
        Authorization: token,
      },
    });

    setMessages(res.data);
  } catch (err) {
    alert("Unauthorized ❌ Please login");
    window.location.href = "/login";
  }
};

  const deleteMessage = async (id) => {
    try {
      await axios.delete(`https://personalportfolio-api-zf05.onrender.com/api/contact/${id}`);
      fetchMessages();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={darkMode ? "container dark" : "container"}>
      
      <div className="header">
        <h1>Admin Dashboard</h1>
        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "☀ Light" : "🌙 Dark"}
        </button>
      </div>

      <div className="card">
        <h2>Total Messages: {messages.length}</h2>
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Message</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {messages.map((msg) => (
            <tr key={msg._id}>
              <td>{msg.name}</td>
              <td>{msg.email}</td>
              <td>{msg.message}</td>
              <td>
                <button
                  className="delete-btn"
                  onClick={() => deleteMessage(msg._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}

export default Admin;