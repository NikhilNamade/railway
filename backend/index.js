const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const connectTomongoose = require("./db");
connectTomongoose();
const cors = require('cors');

// Update CORS configuration to allow the 'auth-token' header
app.use(cors({
  origin: 'https://railway-concession-system.onrender.com', // Allow frontend domain
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization', 'auth-token'], // Add 'auth-token' to allowed headers
  credentials: true // If you need cookies or authentication headers
}));

app.use(express.json());
app.use("/api/auth", require("./routes/auth"));
app.use("/api/data", require("./routes/userdata"));

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
