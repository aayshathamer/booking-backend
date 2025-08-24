const db = require('../config/db');

// Create booking
const createBooking = (req, res) => {
  const { customer_name, contact, service_id, event_id, date, time, notes } = req.body;

  const sql = `
    INSERT INTO bookings (customer_name, contact, service_id, event_id, date, time, notes)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [customer_name, contact, service_id, event_id, date, time, notes], (err, result) => {
    if (err) {
      console.error('❌ Booking insert error:', err);
      return res.status(500).json({ message: 'Failed to create booking', error: err });
    }
    res.status(201).json({ message: '✅ Booking submitted successfully!' });
  });
};

// Get all bookings
const getAllBookings = (req, res) => {
  db.query('SELECT * FROM bookings ORDER BY created_at DESC', (err, results) => {
    if (err) {
      console.error('❌ Booking fetch error:', err);
      return res.status(500).json({ message: 'Failed to fetch bookings' });
    }
    res.status(200).json(results);
  });
};

// Update booking status
const updateBookingStatus = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ message: 'Status is required' });
  }

  const sql = 'UPDATE bookings SET status = ? WHERE id = ?';
  db.query(sql, [status, id], (err, result) => {
    if (err) {
      console.error('❌ Error updating booking status:', err);
      return res.status(500).json({ message: 'Failed to update booking status' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.status(200).json({ message: '✅ Booking status updated successfully' });
  });
};

module.exports = {
  createBooking,
  getAllBookings,
  updateBookingStatus
};
