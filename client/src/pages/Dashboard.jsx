import { useEffect, useState } from "react";
import "./Dashboard.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const API = "https://personalportfolio-api-zf05.onrender.com"; // ✅ FIXED

function Dashboard({ darkMode, toggleTheme }) {
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/admin";
    } else {
      fetchContacts();
    }
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const fetchContacts = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`${API}/api/contact`, {
        headers: { Authorization: token },
      });

      if (!res.ok) throw new Error();

      const data = await res.json();
      setContacts(data);
    } catch {
      setError("Failed to load messages ❌");
      toast.error("Error loading data");
    } finally {
      setLoading(false);
    }
  };

  const deleteMsg = async (id) => {
    if (!window.confirm("Delete this message?")) return;

    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`${API}/api/contact/${id}`, {
        method: "DELETE",
        headers: { Authorization: token },
      });

      if (!res.ok) throw new Error();

      toast.success("Message deleted ✅");
      fetchContacts();
    } catch {
      toast.error("Delete failed ❌");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/admin";
  };

  const filteredContacts = contacts.filter(
    (item) =>
      (item.name || "").toLowerCase().includes(search.toLowerCase()) ||
      (item.email || "").toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLast = currentPage * itemsPerPage;
  const currentItems = filteredContacts.slice(
    indexOfLast - itemsPerPage,
    indexOfLast
  );
  const totalPages = Math.ceil(filteredContacts.length / itemsPerPage);

  const chartData = contacts.reduce((acc, item) => {
    const date = new Date(item.createdAt).toLocaleDateString();

    const found = acc.find((d) => d.date === date);
    if (found) found.count++;
    else acc.push({ date, count: 1 });

    return acc;
  }, []);

  return (
    <div className="dashboard">
      {/* HEADER */}
      <div className="header">
        <h2>📊 Admin Dashboard</h2>

        <div className="header-actions">
          <button onClick={toggleTheme} className="toggle-btn">
            {darkMode ? "☀ Light" : "🌙 Dark"}
          </button>

          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </div>

      {/* ANALYTICS */}
      <h3>Total Messages: {contacts.length}</h3>

      <div className="chart">
        <ResponsiveContainer>
          <BarChart data={chartData}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search by name or email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search"
      />

      {error && <p className="error">{error}</p>}

      {loading ? (
        <p>Loading...</p>
      ) : currentItems.length === 0 ? (
        <p>No messages found ❌</p>
      ) : (
        <>
          <div className="tableWrapper">
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
                {currentItems.map((item) => (
                  <tr key={item._id}>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.message}</td>
                    <td>
                      <button
                        className="delete-btn"
                        onClick={() => deleteMsg(item._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pagination">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Prev
            </button>

            <span>
              Page {currentPage} of {totalPages}
            </span>

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </button>
          </div>
        </>
      )}

      <ToastContainer />
    </div>
  );
}

export default Dashboard;