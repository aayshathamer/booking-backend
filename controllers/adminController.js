const db = require("../config/db");

// Get all admins
const getAllAdmins = (req, res) => {
  db.query(
    "SELECT id, name, email, bio, role, created_at FROM users WHERE role = 'admin'",
    (err, results) => {
      if (err) {
        console.error("Error fetching admins:", err);
        return res.status(500).json({ message: "Server error" });
      }
      res.json(results);
    }
  );
};

// Get single admin profile (for now fixed to id=1 until auth is added)
const getAdminProfile = (req, res) => {
  const adminId = 1;
  db.query(
    "SELECT id, name, email, bio, role, created_at FROM users WHERE id = ? AND role = 'admin'",
    [adminId],
    (err, results) => {
      if (err) {
        console.error("Error fetching admin profile:", err);
        return res.status(500).json({ message: "Server error" });
      }
      if (results.length === 0) {
        return res.status(404).json({ message: "Admin not found" });
      }
      res.json(results[0]);
    }
  );
};

// Update admin profile
const updateAdminProfile = (req, res) => {
  const adminId = 1;
  const { name, email, bio } = req.body;

  db.query(
    "UPDATE users SET name = ?, email = ?, bio = ? WHERE id = ? AND role = 'admin'",
    [name, email, bio, adminId],
    (err, result) => {
      if (err) {
        console.error("Error updating admin profile:", err);
        return res.status(500).json({ message: "Server error" });
      }
      if (result.affectedRows === 0) {
        return res
          .status(404)
          .json({ message: "Admin not found or no changes made" });
      }
      res.json({ message: "Profile updated successfully" });
    }
  );
};

// Add new admin
const addAdmin = (req, res) => {
  const { name, email, bio, password } = req.body;
  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ message: "Name, email, and password are required" });
  }

  db.query(
    "INSERT INTO users (name, email, bio, password, role) VALUES (?, ?, ?, ?, 'admin')",
    [name, email, bio, password],
    (err, result) => {
      if (err) {
        console.error("Error adding admin:", err);
        return res.status(500).json({ message: "Server error" });
      }
      res
        .status(201)
        .json({ message: "Admin added successfully", id: result.insertId });
    }
  );
};

module.exports = {
  getAllAdmins,
  getAdminProfile,
  updateAdminProfile,
  addAdmin,
};
