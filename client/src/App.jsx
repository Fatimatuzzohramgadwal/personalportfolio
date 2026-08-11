import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";

import Home from "./pages/Home";
import About from "./pages/About";
import Skills from "./pages/Skills";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function App() {
  const [darkMode, setDarkMode] = useState(true);

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <BrowserRouter>
      <div className={darkMode ? "app dark-theme" : "app light-theme"}>

        <Navbar
          darkMode={darkMode}
          toggleTheme={toggleTheme}
        />

        <main className="page-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/login" element={<Login />} />

            <Route
              path="/dashboard"
              element={
                <Dashboard
                  darkMode={darkMode}
                  toggleTheme={toggleTheme}
                />
              }
            />
          </Routes>
        </main>

      </div>
    </BrowserRouter>
  );
}

export default App;
