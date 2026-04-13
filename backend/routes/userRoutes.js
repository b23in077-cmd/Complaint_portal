import express from "express";
import User from "../models/User.js";
import authMiddleware, { adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ GET ALL USERS (ADMIN ONLY)
router.get("/", authMiddleware, adminOnly, async (req, res) => {
  try {
    const users = await User.find().select("-password");

    console.log("🔥 USERS FROM DB:", users); // ADD THIS

    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ DELETE USER (ADMIN ONLY)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ msg: "Access denied" });
    }

    await User.findByIdAndDelete(req.params.id);
    res.json({ msg: "User deleted" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;