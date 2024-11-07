const express = require("express");
const routes = express.Router();
const User = require("../models/USER");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "Thisisrailwayproject";
const { body, validationResult } = require("express-validator");
const fetchuser = require("../middleware/fetchuser");
// creating rout  http://localhost:5000/api/auth/createuser
routes.post(
    "/createuser",
    [
        body("name").isLength({ min: 5 }),
        body("email").isEmail(),
        body("tufid").isLength({ min: 11 }),
        body("password").isLength({ min: 5 }),
        body("Phno").isLength({ max: 10 })
    ],
    async (req, res) => {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ error: error.array() });
        }
        try {
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).send("User already exists");
            }
            let userWithTufid = await User.findOne({ tufid: req.body.tufid });
            if (userWithTufid) {
                return res.status(400).send("User  already exists");
            }
            const salt = await bcrypt.genSaltSync(10);
            const haspass = await bcrypt.hash(req.body.password, salt);
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                tufid: req.body.tufid,
                branch:req.body.branch,
                year:req.body.year,
                dob:req.body.dob,
                Phno:req.body.Phno,
                password: haspass,
            });
            const data = {
                user: {
                    id: user.id,
                },
            };
            const jwttoken = jwt.sign(data, JWT_SECRET);
            res.json({ jwttoken });
        } catch (error) {
            res.send(error + "internal error");
        }
    }
);
// creating rout  http://localhost:5000/api/auth/login
routes.post("/login",
    [
        body("tufid").isLength({ min: 11 }),
        body("password").exists()
    ],
    async (req, res) => {
        const error = validationResult(req)
        if(!error.isEmpty()){
            return res.status(404).send("Invalid Credintials");
        }
        const { tufid, password } = req.body;
        try {
            let user = await User.findOne({ tufid });
            if (!user) {
                return res.status(404).send("User not exists");
            }
            const validuser = await bcrypt.compare(password, user.password);
            if (!validuser) {
                return res.status(404).send("Invalid User");
            }
            const data = {
                user: {
                    id: user.id,
                },
            };
            const jwttoken = jwt.sign(data, JWT_SECRET);
            res.json({user,jwttoken });
        } catch (error) {
            res.send(error + "internal error");
        }
    });
// creating rout  http://localhost:5000/api/auth/fetchuser
routes.post("/fetchuser", fetchuser, async (req, res) => {
    try {
        const _id = req.user.id;
        const user = await User.findById(_id).select("-password");
        res.json({ user });
    } catch (err) {
        res.status(400).send("Server  auth Error");
    }
});

// creating rout  http://localhost:5000/api/auth/fetchuser/:id
routes.post("/fetchuser/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        const user = await User.findById(req.params.id).select("-password");
        res.json({ user });
    } catch (err) {
        res.status(400).send("Server  auth Error");
    }
});
module.exports = routes;
