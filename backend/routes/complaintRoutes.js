import express from "express";
import {
  createComplaint,
  getComplaints,
  updateStatus,
  upvoteComplaint,
  getSingleComplaint
} from "../controllers/complaintController.js";

import authMiddleware, { adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// ================= CREATE =================
router.post("/", authMiddleware, createComplaint);

// ================= GET ALL =================
router.get("/", authMiddleware, getComplaints);

// ================= GET SINGLE =================
router.get("/:id", authMiddleware, getSingleComplaint);

// ================= UPVOTE =================
router.put("/upvote/:id", authMiddleware, upvoteComplaint);

// ================= UPDATE (ADMIN ONLY) =================
router.put("/:id", authMiddleware, adminOnly, updateStatus);

export default router;