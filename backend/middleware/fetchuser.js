const jwt = require("jsonwebtoken")
const JWT_SECRET = "Thisisrailwayproject"

fetchuser = (req, res, next) => {
    const token = req.header("auth-token")
    if (!token) {
        return res.status(404).send("Auth-token is provided")
    }
    try {
        const data = jwt.verify(token, JWT_SECRET)
        req.user = data.user
        next()
    } catch (error) {
        console.error(err.message + "jjj");
        return res.status(500).json({ error: "Server error while fetching user" }); // Return a JSON response

    }
}
module.exports = fetchuser;