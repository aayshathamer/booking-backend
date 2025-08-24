const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./config/db');

const bookingRoutes = require('./routes/bookingRoutes');
const eventRoutes = require('./routes/eventRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const adminRoutes = require("./routes/adminRoutes");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Allowed origins for frontend (GoDaddy + local dev)
const allowedOrigins = [
  "https://cybersomaliland.com",       // main domain
  "https://cybersomaliland.com/user",  // user app
  "https://cybersomaliland.com/admin", // admin app
  "http://localhost:5173"              // Vite local dev (optional)
];

// ✅ Configure CORS
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS blocked for origin: " + origin));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

// ✅ Root test
app.get('/', (req, res) => {
  res.send('✅ Backend is working and connected to MySQL');
});

// ✅ DB test route
app.get('/api/test-db', (req, res) => {
  db.query('SELECT 1', (err, result) => {
    if (err) {
      console.error('❌ DB test failed:', err);
      return res.status(500).json({ success: false, error: err });
    }
    res.status(200).json({ success: true, message: '✅ Database query successful', result });
  });
});

// ✅ Route mounts
app.use('/api/bookings', bookingRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/services', serviceRoutes);
app.use("/api/admins", adminRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
