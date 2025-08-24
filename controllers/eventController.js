// controllers/eventController.js
const db = require('../config/db');

// GET all events
const getAllEvents = (req, res) => {
  db.query("SELECT * FROM events", (err, results) => {
    if (err) {
      console.error("❌ Error fetching events:", err);
      return res.status(500).json({ message: "Failed to fetch events" });
    }
    res.status(200).json(results);
  });
};

// POST new event
const createEvent = (req, res) => {
  const { title, description, date, time, location, image_url } = req.body;
  const sql = `
    INSERT INTO events (title, description, date, time, location, image_url)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  db.query(sql, [title, description, date, time, location, image_url], (err, result) => {
    if (err) {
      console.error("❌ Error creating event:", err);
      return res.status(500).json({ message: "Failed to create event" });
    }
    res.status(201).json({ message: "Event created successfully", id: result.insertId });
  });
};

// PUT update event
const updateEvent = (req, res) => {
  const id = req.params.id;
  const { title, description, date, time, location, image_url } = req.body;
  const sql = `
    UPDATE events SET title=?, description=?, date=?, time=?, location=?, image_url=? WHERE id=?
  `;
  db.query(sql, [title, description, date, time, location, image_url, id], (err) => {
    if (err) {
      console.error("❌ Error updating event:", err);
      return res.status(500).json({ message: "Failed to update event" });
    }
    res.status(200).json({ message: "Event updated successfully" });
  });
};

// DELETE event
const deleteEvent = (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM events WHERE id=?", [id], (err) => {
    if (err) {
      console.error("❌ Error deleting event:", err);
      return res.status(500).json({ message: "Failed to delete event" });
    }
    res.status(200).json({ message: "Event deleted successfully" });
  });
};

module.exports = {
  getAllEvents,
  createEvent,
  updateEvent,
  deleteEvent,
};

