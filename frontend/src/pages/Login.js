import { useState } from "react";
import axios from "axios";

function Login() {
  const [data, setData] = useState({
    email: "",
    password: ""
  });

  const [isAdmin, setIsAdmin] = useState(false);

  const login = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          ...data,
          role: isAdmin ? "admin" : "user"
        }
      );

      localStorage.setItem("token", res.data.token);

      const payload = JSON.parse(atob(res.data.token.split(".")[1]));

      if (payload.role === "admin") {
        window.location.href = "/admin";
      } else {
        window.location.href = "/dashboard";
      }

    } catch (err) {
      alert("Invalid Credentials");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        
        <h2 style={{ marginBottom: "10px" }}>Welcome Back 👋</h2>

        <p style={{ color: "#aaa", fontSize: "14px" }}>
          Login as {isAdmin ? "Admin" : "User"}
        </p>

        {/* TOGGLE */}
        <div style={styles.toggle}>
          <button
            style={!isAdmin ? styles.active : styles.inactive}
            onClick={() => setIsAdmin(false)}
          >
            User
          </button>

          <button
            style={isAdmin ? styles.active : styles.inactive}
            onClick={() => setIsAdmin(true)}
          >
            Admin
          </button>
        </div>

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Enter email"
          autoComplete="off"
          value={data.email}
          onChange={e => setData({ ...data, email: e.target.value })}
          style={styles.input}
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Enter password"
          autoComplete="new-password"
          value={data.password}
          onChange={e => setData({ ...data, password: e.target.value })}
          style={styles.input}
        />

        {/* LOGIN BUTTON */}
        <button onClick={login} style={styles.button}>
          → Sign In
        </button>

        {/* ✅ FIX: SHOW ONLY FOR USER */}
        {!isAdmin && (
          <p style={{ marginTop: "15px", fontSize: "14px" }}>
            New user?{" "}
            <a href="/register" style={{ color: "#00c6ff" }}>
              Register here
            </a>
          </p>
        )}

      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(to right, #0f2027, #203a43, #2c5364)"
  },
  card: {
    background: "#111",
    padding: "30px",
    borderRadius: "12px",
    color: "white",
    width: "320px",
    textAlign: "center",
    boxShadow: "0 10px 30px rgba(0,0,0,0.5)"
  },
  input: {
    width: "100%",
    padding: "10px",
    marginTop: "10px",
    borderRadius: "6px",
    border: "1px solid #333",
    background: "#222",
    color: "white"
  },
  button: {
    width: "100%",
    marginTop: "15px",
    padding: "10px",
    border: "none",
    borderRadius: "6px",
    background: "linear-gradient(90deg, #007bff, #00c6ff)",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold"
  },
  toggle: {
    display: "flex",
    margin: "15px 0"
  },
  active: {
    flex: 1,
    background: "#007bff",
    color: "white",
    border: "none",
    padding: "8px",
    cursor: "pointer"
  },
  inactive: {
    flex: 1,
    background: "#333",
    color: "gray",
    border: "none",
    padding: "8px",
    cursor: "pointer"
  }
};

export default Login;