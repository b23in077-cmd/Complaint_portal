import { useState } from "react";
import axios from "axios";

function Register() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [isAdmin, setIsAdmin] = useState(false);

  const register = async () => {
    if (data.password.length < 6) {
      return alert("Password must be at least 6 characters");
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
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
      alert(err.response?.data?.msg || "Error");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>

        <h2>Create Account 🚀</h2>

        <p style={{ color: "#aaa" }}>
          Register as {isAdmin ? "Admin" : "User"}
        </p>

        {/* 🔥 TOGGLE */}
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

        <input
          placeholder="Name"
          value={data.name}
          onChange={e => setData({...data, name: e.target.value})}
          style={styles.input}
        />

        <input
          placeholder="Email"
          value={data.email}
          onChange={e => setData({...data, email: e.target.value})}
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Password"
          value={data.password}
          onChange={e => setData({...data, password: e.target.value})}
          style={styles.input}
        />

        <button onClick={register} style={styles.button}>
          → Register
        </button>

        <p style={{ marginTop: "10px" }}>
          Already have account?{" "}
          <a href="/" style={{ color: "#00c6ff" }}>
            Login
          </a>
        </p>

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
    cursor: "pointer"
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
    padding: "8px"
  },
  inactive: {
    flex: 1,
    background: "#333",
    color: "gray",
    border: "none",
    padding: "8px"
  }
};

export default Register;