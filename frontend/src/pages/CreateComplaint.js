import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function CreateComplaint() {
  const [data, setData] = useState({
    title: "",
    description: "",
    area: "",
    city: ""
  });

  const token = localStorage.getItem("token");

  const submit = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/complaints",
        data,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      alert("Complaint submitted ✅");

      // 🔥 clear form after submit
      setData({
        title: "",
        description: "",
        area: "",
        city: ""
      });

    } catch (err) {
      alert("Error submitting complaint");
    }
  };

  return (
    <div>
      <Navbar />

      <div style={styles.container}>
        <h2 style={styles.heading}>Create Complaint 📝</h2>

        <div style={styles.formCard}>
          
          <input
            type="text"
            placeholder="Title"
            value={data.title}
            onChange={(e) =>
              setData({ ...data, title: e.target.value })
            }
            style={styles.input}
          />

          <textarea
            placeholder="Description"
            value={data.description}
            onChange={(e) =>
              setData({ ...data, description: e.target.value })
            }
            style={{ ...styles.input, height: "80px", resize: "none" }}
          />

          <input
            type="text"
            placeholder="Area"
            value={data.area}
            onChange={(e) =>
              setData({ ...data, area: e.target.value })
            }
            style={styles.input}
          />

          <input
            type="text"
            placeholder="City"
            value={data.city}
            onChange={(e) =>
              setData({ ...data, city: e.target.value })
            }
            style={styles.input}
          />

          <button onClick={submit} style={styles.button}>
            Submit 🚀
          </button>

        </div>
      </div>
    </div>
  );
}

/* ✅ STYLES (FIXES YOUR ERROR) */
const styles = {
  container: {
    padding: "30px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    color: "white"
  },

  heading: {
    marginBottom: "20px",
    fontSize: "26px",
    fontWeight: "bold"
  },

  formCard: {
    width: "100%",
    maxWidth: "600px",
    background: "rgba(255,255,255,0.08)",
    backdropFilter: "blur(12px)",
    borderRadius: "16px",
    padding: "25px",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    boxShadow: "0 8px 30px rgba(0,0,0,0.3)"
  },

  input: {
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    outline: "none",
    background: "rgba(255,255,255,0.1)",
    color: "white",
    fontSize: "14px"
  },

  button: {
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    background: "linear-gradient(135deg, #00c6ff, #0072ff)",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "0.3s"
  }
};

export default CreateComplaint;