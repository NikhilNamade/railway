const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const connectTomongoose = require("./db")
const path = require("path")
connectTomongoose()
const cors = require('cors')
app.use(cors())
app.use(express.json());
app.use("/api/auth", require("./routes/auth"))
app.use("/api/data", require("./routes/userdata"))
app.use('/uploads', express.static(path.join(__dirname,"./uploads")));

// Connect to MongoDB
connectTomongoose();
app.use(cors({
  origin: 'https://railway-frontend.onrender.com', // Allow frontend domain
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  credentials: true // If needed, especially for cookies
}));

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/data", require("./routes/userdata"));

// Static file serving
app.use('/uploads', express.static(path.join(__dirname, '../../frontend/public/uploads')));

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

