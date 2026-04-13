import { useState } from "react";
import axios from "axios";

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState("user");
  const [data, setData] = useState({});
  const [error, setError] = useState("");

  const submit = async () => {
    try {
      if (!/^(?=.*\d).{6,}$/.test(data.password)) {
        setError("Password must be 6+ chars and include a number");
        return;
      }

      const url = isLogin
        ? "http://localhost:5000/api/auth/login"
        : "http://localhost:5000/api/auth/register";

      const res = await axios.post(url, { ...data, role });

      localStorage.setItem("token", res.data.token);

      const payload = JSON.parse(atob(res.data.token.split(".")[1]));

      if (payload.role === "admin") {
        window.location.href = "/admin";
      } else {
        window.location.href = "/dashboard";
      }

    } catch {
      setError("Invalid credentials");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>{isLogin ? "Login" : "Register"}</h2>

        <select onChange={(e) => setRole(e.target.value)}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        {!isLogin && (
          <input placeholder="Name"
            onChange={e => setData({ ...data, name: e.target.value })}
          />
        )}

        <input placeholder="Email"
          onChange={e => setData({ ...data, email: e.target.value })}
        />

        <input type="password" placeholder="Password"
          onChange={e => setData({ ...data, password: e.target.value })}
        />

        <p style={{ color: "red" }}>{error}</p>

        <button onClick={submit}>
          {isLogin ? "Login" : "Register"}
        </button>

        <button style={styles.googleBtn}>
          Continue with Google
        </button>

        <p onClick={() => setIsLogin(!isLogin)} style={styles.link}>
          {isLogin ? "New user? Register" : "Already have account? Login"}
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
    background: "linear-gradient(135deg, #007bff, #00c6ff)"
  },
  card: {
    width: "320px",
    padding: "30px",
    borderRadius: "12px",
    background: "white",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
  },
  googleBtn: {
    background: "#db4437",
    color: "white"
  },
  link: {
    color: "#007bff",
    cursor: "pointer",
    textAlign: "center"
  }
};

export default Auth;