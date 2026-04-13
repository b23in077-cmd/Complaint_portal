import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,

  priority: {
    type: String,
    enum: ["High", "Medium", "Low"],
    default: "Low"
  },

  status: {
    type: String,
    enum: ["Pending", "In Progress", "Resolved", "Escalated"], // ✅ added
    default: "Pending"
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  upvotes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],

  location: {
    area: String,
    city: String
  },

  deadline: {
  type: Date,
  required: true
}

}, { timestamps: true });

export default mongoose.model("Complaint", complaintSchema);