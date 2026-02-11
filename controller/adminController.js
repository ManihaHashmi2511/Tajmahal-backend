const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");



// ================= LOGIN =================
const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin)
      return res.status(401).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, admin.password);
    if (!match)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: admin._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token });

  } catch (error) {
    res.status(500).json({ message: "Login failed" });
  }
};

const verifyCurrentCredentials = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findById(req.adminId);

    if (!admin || admin.email !== email)
      return res.status(401).json({ message: "Current credentials incorrect" });

    const match = await bcrypt.compare(password, admin.password);
    if (!match)
      return res.status(401).json({ message: "Current credentials incorrect" });

    res.json({ message: "Verified successfully" });

  } catch (error) {
    res.status(500).json({ message: "Verification failed" });
  }
};


// ========== UPDATE NEW CREDENTIALS ==========
const updateCredentials = async (req, res) => {
  const { newEmail, newPassword } = req.body;

  try {
    const hashed = await bcrypt.hash(newPassword, 10);

    await Admin.findByIdAndUpdate(req.adminId, {
      email: newEmail,
      password: hashed
    });

    res.json({ message: "Credentials updated successfully" });

  } catch (error) {
    res.status(500).json({ message: "Update failed" });
  }
};

module.exports = { adminLogin, verifyCurrentCredentials, updateCredentials };