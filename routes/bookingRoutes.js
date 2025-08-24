const express = require('express');
const router = express.Router();
const {
  getAllBookings,
  createBooking,
  updateBookingStatus
} = require('../controllers/bookingController');

// GET all bookings
router.get('/', getAllBookings);

// CREATE booking
router.post('/', createBooking);

// UPDATE booking status ✅
router.put('/:id/status', updateBookingStatus);

module.exports = router;
