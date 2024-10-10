require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const jwt = require('jsonwebtoken');
const { expressjwt: jwtMiddleware } = require('express-jwt');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const app = express();
app.use(bodyParser.json());
app.use(helmet());
app.use(cors());

// Basic rate-limiting to protect against brute-force attacks
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
});
app.use(limiter);

// MySQL connection setup
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
});

// Middleware to protect routes
app.use(
  jwtMiddleware({
    secret: process.env.OIDC_CLIENT_SECRET,
    algorithms: ['HS256'],
  }).unless({ path: ['/login'] })
);

// Function to verify ownership of the reservation
function checkOwnership(req, res, next) {
  const username = req.auth.username; // Retrieved from the JWT
  const reservationId = req.params.id;

  db.query(
    'SELECT * FROM reservations WHERE id = ? AND username = ?',
    [reservationId, username],
    (err, results) => {
      if (err || results.length === 0) {
        return res.status(403).json({ message: 'Unauthorized access' });
      }
      next();
    }
  );
}

// OIDC Authentication route
app.post('/login', (req, res) => {
  // Mock OIDC login and token retrieval process
  const { token } = req.body;
  jwt.verify(token, process.env.OIDC_CLIENT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Invalid token' });
    res.json({ message: 'Login successful', token });
  });
});

// Get user profile (based on authenticated token)
app.get('/profile', (req, res) => {
  const { username, name, email, contact, country } = req.auth; // Extract from token
  res.json({ username, name, email, contact, country });
});

// Create new vehicle service reservation
app.post('/reservations', (req, res) => {
  const { date, time, location, vehicle_registration, current_mileage, message } = req.body;
  const username = req.auth.username; // Retrieved from the JWT

  db.query(
    'INSERT INTO reservations (username, date, time, location, vehicle_registration, current_mileage, message) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [username, date, time, location, vehicle_registration, current_mileage, message],
    (err, results) => {
      if (err) return res.status(500).json({ message: 'Error creating reservation' });
      res.json({ message: 'Reservation created successfully' });
    }
  );
});

// Get all reservations for the authenticated user
app.get('/reservations', (req, res) => {
  const username = req.auth.username;
  db.query('SELECT * FROM reservations WHERE username = ?', [username], (err, results) => {
    if (err) return res.status(500).json({ message: 'Error retrieving reservations' });
    res.json(results);
  });
});

// Delete a reservation (if owned by the user)
app.delete('/reservations/:id', checkOwnership, (req, res) => {
  const reservationId = req.params.id;

  db.query('DELETE FROM reservations WHERE id = ?', [reservationId], (err, results) => {
    if (err) return res.status(500).json({ message: 'Error deleting reservation' });
    res.json({ message: 'Reservation deleted successfully' });
  });
});

// Error handling
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({ message: 'Invalid token' });
  }
  next(err);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
