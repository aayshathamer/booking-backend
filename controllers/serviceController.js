// controllers/serviceController.js
const db = require('../config/db');

// GET all services (with optional category filter)
const getAllServices = (req, res) => {
  const { category } = req.query;
  let sql = "SELECT * FROM services";
  const params = [];

  if (category) {
    sql += " WHERE category = ?";
    params.push(category);
  }

  db.query(sql, params, (err, results) => {
    if (err) {
      console.error("❌ Error fetching services:", err);
      return res.status(500).json({ message: "Failed to fetch services" });
    }
    res.status(200).json(results);
  });
};

// POST new service
const createService = (req, res) => {
  const {
    name,
    category,
    description,
    price,
    original_price,
    location,
    image,
    duration,
    is_featured
  } = req.body;

  const sql = `
    INSERT INTO services 
    (name, category, description, price, original_price, location, image, duration, is_featured)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      name,
      category || "hotels",
      description,
      price || null,
      original_price || null,
      location || null,
      image || null,
      duration || null,
      is_featured ? 1 : null  // ✅ store 1 or NULL
    ],
    (err, result) => {
      if (err) {
        console.error("❌ Error creating service:", err);
        return res.status(500).json({ message: "Failed to create service" });
      }
      res
        .status(201)
        .json({ message: "Service created successfully", id: result.insertId });
    }
  );
};

// PUT update service
const updateService = (req, res) => {
  const id = req.params.id;
  const {
    name,
    category,
    description,
    price,
    original_price,
    location,
    image,
    duration,
    is_featured
  } = req.body;

  const sql = `
    UPDATE services 
    SET name=?, category=?, description=?, price=?, original_price=?, location=?, image=?, duration=?, is_featured=? 
    WHERE id=?
  `;

  db.query(
    sql,
    [
      name,
      category || "hotels",
      description,
      price || null,
      original_price || null,
      location || null,
      image || null,
      duration || null,
      is_featured ? 1 : null, // ✅ store 1 or NULL
      id
    ],
    (err) => {
      if (err) {
        console.error("❌ Error updating service:", err);
        return res.status(500).json({ message: "Failed to update service" });
      }
      res.status(200).json({ message: "Service updated successfully" });
    }
  );
};

// DELETE service
const deleteService = (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM services WHERE id=?", [id], (err) => {
    if (err) {
      console.error("❌ Error deleting service:", err);
      return res.status(500).json({ message: "Failed to delete service" });
    }
    res.status(200).json({ message: "Service deleted successfully" });
  });
};

// Get featured services
const getFeaturedServices = (req, res) => {
  const sql = `
    SELECT s.* 
    FROM services s
    JOIN (
        SELECT category, MIN(id) as min_id
        FROM services
        WHERE is_featured = 1
        GROUP BY category
    ) grouped ON s.id = grouped.min_id
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching featured services:", err);
      return res.status(500).json({ error: "Failed to fetch featured services." });
    }
    res.status(200).json(results);
  });
};

// Get counts of services by category
const getServiceCounts = (req, res) => {
  const sql = `
    SELECT LOWER(category) AS category, COUNT(*) AS count
    FROM services
    GROUP BY category
  `;
  db.query(sql, (err, rows) => {
    if (err) {
      console.error("Error fetching service counts:", err);
      return res.status(500).json({ message: "Failed to fetch counts" });
    }
    res.json(rows);
  });
};

module.exports = {
  getAllServices,
  createService,
  updateService,
  deleteService,
  getFeaturedServices,
  getServiceCounts
};
