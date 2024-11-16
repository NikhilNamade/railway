const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const connectTomongoose = require("./db")
const path = require("path")
const fs = require("fs")
connectTomongoose()
const cors = require('cors')
app.use(express.json());
app.use("/api/auth", require("./routes/auth"))
app.use("/api/data", require("./routes/userdata"))

app.use(cors({
  origin: 'https://railway-frontend.onrender.com', // Allow frontend domain
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  credentials: true // If needed, especially for cookies
}));

const multer = require('multer')
//Ensure uploads directory exists
const uploadDir = path.join(__dirname, "./uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir)
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})

const upload = multer({ storage: storage })
const cpUpload = upload.fields([{ name: 'aadhar'}, { name: 'collegeid'}])
app.post('/uploads', cpUpload, function (req, res) {
  console.log(req.file, req.body)
  res.send("file uploaded")
});
// Static file serving
app.use('/uploads', express.static(path.join(__dirname,"./uploads")));
// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

