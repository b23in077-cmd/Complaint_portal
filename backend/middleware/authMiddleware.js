import jwt from "jsonwebtoken";

// ================= AUTH MIDDLEWARE =================
const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // ❌ No header
    if (!authHeader) {
      return res.status(401).json({ msg: "No token, authorization denied" });
    }

    // ❌ Wrong format (must be: Bearer <token>)
    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ msg: "Invalid token format" });
    }

    // ✅ Extract token
    const token = authHeader.split(" ")[1];

    // ❌ Token missing after split
    if (!token) {
      return res.status(401).json({ msg: "Token missing" });
    }

    // ✅ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded; // contains id + role

    next();

  } catch (err) {
    return res.status(401).json({ msg: "Invalid or expired token" });
  }
};

// ================= ADMIN ONLY =================
export const adminOnly = (req, res, next) => {
  try {
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({ msg: "Access denied: Admin only" });
    }
    next();
  } catch (err) {
    return res.status(500).json({ msg: "Server error" });
  }
};

export default authMiddleware;