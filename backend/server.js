import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import adminRoutes from "./routes/adminRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import complaintRoutes from "./routes/complaintRoutes.js";
import { checkEscalation } from "./controllers/complaintController.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/users", userRoutes);
app.get("/", (req, res) => {
  res.send("API Running 🚀");
});
app.use("/api/admin", adminRoutes);
const PORT = process.env.PORT || 5000;
setInterval(checkEscalation, 60000); // every 1 minute
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
console.log("Complaint routes loaded");