import { useState } from "react";
import axios from "axios";

function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {

    if (!username || !password) {
      alert("Please fill all fields ❗");
      return;
    }

    try {

      const res = await axios.post(
        "https://personalportfolio-api-ashy.vercel.app/api/login",
        {
          username,
          password,
        }
      );

      // store token
      localStorage.setItem("token", res.data.token);

      alert(res.data.message || "Login successful ✅");

      // redirect to dashboard
      window.location.href = "/dashboard";

    } catch (err) {

      console.error(err);

      alert(
        err.response?.data?.message ||
        "Login failed ❌"
      );
    }
  };

  return (
    <div style={{ padding: "50px" }}>

      <h2>Admin Login</h2>

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <br /><br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

      <button onClick={handleLogin}>
        Login
      </button>

    </div>
  );
}

export default Login;