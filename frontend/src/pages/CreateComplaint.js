import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function CreateComplaint() {
  const [data, setData] = useState({});
  const token = localStorage.getItem("token");

  const submit = async () => {
    await axios.post(
      "http://localhost:5000/api/complaints",
      data,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    alert("Complaint submitted");
  };

  return (
  <div>
    <Navbar />

    <div className="container">
      <div className="card">
        <h2>Create Complaint</h2>

        <input placeholder="Title"
          onChange={e => setData({...data, title:e.target.value})}
        />

        <input placeholder="Description"
          onChange={e => setData({...data, description:e.target.value})}
        />

        <input placeholder="Area"
          onChange={e => setData({...data, area:e.target.value})}
        />

        <input placeholder="City"
          onChange={e => setData({...data, city:e.target.value})}
        />

        <button onClick={submit}>Submit</button>
      </div>
    </div>
  </div>
);
}

export default CreateComplaint;