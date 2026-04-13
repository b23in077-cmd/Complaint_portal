import Complaint from "../models/Complaint.js";

const categorize = (text) => {
  text = text.toLowerCase();
  if (text.includes("water")) return "Water";
  if (text.includes("electricity")) return "Electricity";
  return "General";
};

const priority = (text) => {
  if (text.includes("urgent")) return "High";
  return "Low";
};

export const createComplaint = async (req, res) => {
  try {
    const { title, description, area, city } = req.body;

    const complaint = await Complaint.create({
      title,
      description,
      category: categorize(description),
      priority: priority(description),
      location: { area, city },
      deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      userId: req.user.id
    });

    res.json(complaint);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }

};

export const getComplaints = async (req, res) => {
  try {
    let complaints;

    // ✅ If admin → get all complaints
    if (req.user.role === "admin") {
      complaints = await Complaint.find().populate("userId", "name email");
    } 
    // ✅ If normal user → only their complaints
    else {
      complaints = await Complaint.find({ userId: req.user.id });
    }

    res.json(complaints);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const updateStatus = async (req, res) => {
  try {
    const { status, priority } = req.body;

    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({ msg: "Not found" });
    }

    // ✅ Update status
    if (status) {
      complaint.status = status;
    }

    // ✅ Update priority (NEW)
    if (priority) {
      complaint.priority = priority;
    }

    await complaint.save();

    res.json(complaint);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const upvoteComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint.upvotes.includes(req.user.id)) {
      complaint.upvotes.push(req.user.id);
      await complaint.save();
    }

    res.json(complaint);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const checkEscalation = async () => {
  const complaints = await Complaint.find({
    status: { $ne: "Resolved" },
    deadline: { $lt: new Date() }
  });

  for (let c of complaints) {
    c.status = "Escalated";
    await c.save();
  }
};
export const getSingleComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({ msg: "Complaint not found" });
    }

    res.json(complaint);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};