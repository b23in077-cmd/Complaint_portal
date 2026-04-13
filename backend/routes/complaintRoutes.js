import express from "express";
import {
  createComplaint,
  getComplaints,
  updateStatus,
  upvoteComplaint,
  getSingleComplaint   // ✅ ADD THIS
} from "../controllers/complaintController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import Complaint from "../models/Complaint.js";
import { adminOnly } from "../middleware/authMiddleware.js";
const router = express.Router();

// CREATE
router.post("/", authMiddleware, createComplaint);

// GET ALL
router.get("/", authMiddleware, getComplaints);
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({ msg: "Complaint not found" });
    }

    res.json(complaint);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.get("/:id", authMiddleware, getSingleComplaint); 
// 🔥 VERY IMPORTANT ORDER
router.put("/upvote/:id", authMiddleware, upvoteComplaint);
router.put("/:id", authMiddleware, adminOnly, updateStatus);

export default router;