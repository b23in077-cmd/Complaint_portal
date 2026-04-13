import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  let role = "";

  if (token) {
    const payload = JSON.parse(atob(token.split(".")[1]));
    role = payload.role;
  }

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div style={{
      background: "rgba(255,255,255,0.1)",
      backdropFilter: "blur(10px)",
      padding: "15px 30px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      color: "white",
      borderBottom: "1px solid rgba(255,255,255,0.2)"
    }}>
      <h2>🚀 Complaint Portal</h2>

      <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
        
        <Link to="/dashboard" style={{ color: "white" }}>Dashboard</Link>
        <Link to="/create" style={{ color: "white" }}>Create</Link>

        {/* ✅ ADMIN ONLY LINKS */}
        {role === "admin" && (
          <>
            <Link to="/admin" style={{ color: "white" }}>
              Admin Panel
            </Link>

            {/* 🔥 NEW USERS LINK */}
            <Link to="/users" style={{ color: "white" }}>
              Users
            </Link>
          </>
        )}

        <button onClick={() => document.body.classList.toggle("dark")}>
          🌙
        </button>

        <button onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;