import { useEffect, useState } from "react";
import axios from "axios";

function Users() {
  const [users, setUsers] = useState([]);

  const token = localStorage.getItem("token");
  
  // ✅ Fetch users
  const fetchUsers = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.get("http://localhost:5000/api/users", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    console.log("RESPONSE:", res.data);
    setUsers(res.data);

  } catch (err) {
    console.error("ERROR:", err.response?.data || err.message);
  }
};

  // ✅ Delete user
  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`, {
        headers: { Authorization: token }
      });

      // refresh
      fetchUsers();
    } catch (err) {
      alert("Delete failed");
    }
  };

  useEffect(() => {
  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "/";
    return;
  }

  const payload = JSON.parse(atob(token.split(".")[1]));

  if (payload.role !== "admin") {
    window.location.href = "/";
  }

}, []);

 return (
  <div style={{ padding: "20px", color: "white" }}>
    <h2>All Users 👥</h2>

    {users.length === 0 ? (
      <p style={{ marginTop: "20px", color: "#aaa" }}>
        No users found. Register some users to display here.
      </p>
    ) : (
      users.map((u) => (
        <div key={u._id} style={styles.card}>
          <div>
            <p><b>Name:</b> {u.name}</p>
            <p><b>Email:</b> {u.email}</p>
          </div>

          <button
            onClick={() => deleteUser(u._id)}
            style={styles.deleteBtn}
          >
            Delete
          </button>
        </div>
      ))
    )}
  </div>
);
}

const styles = {
  card: {
    background: "#222",
    padding: "15px",
    margin: "10px 0",
    borderRadius: "8px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  deleteBtn: {
    background: "red",
    color: "white",
    border: "none",
    padding: "8px 12px",
    borderRadius: "5px",
    cursor: "pointer"
  }
};

export default Users;