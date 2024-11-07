const express = require('express')
const app = express()
const port = process.env.PORT || 5000;
const connectTomongoose = require("./db")
connectTomongoose()
const cors = require('cors')
app.use(cors())
app.use(express.json());
app.use("/api/auth", require("./routes/auth"))
app.use("/api/data", require("./routes/userdata"))

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})
// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })