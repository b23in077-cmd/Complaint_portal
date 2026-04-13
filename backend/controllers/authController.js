import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


// ================= REGISTER =================
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // ✅ hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ FORCE ROLE = USER ONLY
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: "user"
    });

    await user.save();

    // ✅ AUTO LOGIN AFTER REGISTER
    const token = jwt.sign(
      { id: user._id, role: user.role },
      "secret123",
      { expiresIn: "1d" }
    );

    res.json({ token });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// ================= LOGIN =================
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ✅ HARDCODED ADMIN LOGIN
    if (email === "Deekshitha" && password === "deekshitha1") {
      const token = jwt.sign(
        { id: "admin123", role: "admin" },
        "secret123",
        { expiresIn: "1d" }
      );

      return res.json({
        token,
        user: {
          name: "Deekshitha",
          email: "Deekshitha",
          role: "admin"
        }
      });
    }

    // ✅ NORMAL USER LOGIN
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }

    // ❌ BLOCK IF SOMEHOW ADMIN EXISTS IN DB
    if (user.role === "admin") {
      return res.status(403).json({ msg: "Admin login not allowed here" });
    }

    // ✅ password check
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid password" });
    }

    // ✅ create token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      "secret123",
      { expiresIn: "1d" }
    );

    res.json({
      token,
      user: {
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};