
require('dotenv').config();
const express = require("express")
const routes = express.Router()
const UserData = require("../models/USERDATA")
const fetchuser = require("../middleware/fetchuser")
const USER = require("../models/USER");



const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN
const client = require('twilio')(accountSid, authToken);



const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

// Configure AWS SDK
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

const s3 = new AWS.S3();

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.AWS_BUCKET_NAME, // S3 bucket name
        acl: 'public-read', // File permissions
        metadata: (req, file, cb) => {
            cb(null, { fieldName: file.fieldname });
        },
        key: (req, file, cb) => {
            cb(null, Date.now().toString() + '-' + file.originalname); // Unique filename
        }
    })
});

// Handle multiple file uploads
const cpUpload = upload.fields([
    { name: 'aadhar', maxCount: 1 },
    { name: 'collegeid', maxCount: 1 }
]);




// creating rout  http://localhost:5000/api/data/adddata
routes.post("/adddata",cpUpload,fetchuser, async (req, res) => {
    console.log("Request body:", req.body);
    console.log("Request files:", req.files);
    const user = req.user;
    console.log(user)
    const existingdata = await UserData.find({ user_id: user.id })
    if (existingdata) {
        await UserData.deleteMany({ user_id: user.id })
    }

    const checkrequest = await USER.findById(user.id)
    const currentDate = new Date();
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(currentDate.getMonth() - 1);

    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(currentDate.getMonth() - 3);
    if (checkrequest) {
        if (checkrequest.concessionRejectedCount >= 3 || !checkrequest.canRequestConcession) {
            return res.status(404).json({ error: "Unable to Request for the Concession" })
        }
    }


    const { name, email, tufid, address, from, to, year, branch, Class, period } = req.body
    console.log(req.body.aadhar);
    try {
        let userdata = new UserData({
            name,
            email,
            tufid,
            address,
            from,
            to,
            year,
            branch,
            Class,
            period,
            aadhar: req.files['aadhar'][0].location, // S3 URL for Aadhar
            collegeid: req.files['collegeid'][0].location, // S3 URL for College ID
            user_id: user.id
        })
        const savedata = await userdata.save()
        res.json({ savedata })
    } catch (error) {
        res.status(400).send("Internal error")
    }
})

// creating rout  http://localhost:5000/api/data/updateData/:id
routes.put("/updateData/:id", async (req, res) => {
    const { status, reason } = req.body
    const newData = {
        status,
        reason,
    }
    try {
        let userId = await UserData.findById(req.params.id)
        if (!userId) {
            return res.status(404).send("User Not Found")
        }
        const newUserData = await UserData.findByIdAndUpdate(req.params.id, { $set: newData }, { new: true })
        const userData = await UserData.findById(req.params.id)
        const user = await USER.findById(userData.user_id)
        const currentDate = new Date();
        if (userData && user) {
            console.log("Both data are present");

            // If the status is "Approve", handle concession period
            if (userData.status === "Approve") {
                user.concessionRejectedCount = 0;  // Reset rejection count
                user.lastConcessionDate = currentDate; // Set the current date for concession approval
                user.canRequestConcession = false;  // Initially set to false

                // Calculate when the user can request a new concession based on the period
                let concessionPeriod = userData.period.toLowerCase(); // Assuming period can be "one month" or "quarter"
                if (concessionPeriod === "monthly") {
                    user.nextConcessionDate = new Date(currentDate.setMonth(currentDate.getMonth() + 1)); // Add 1 month
                } else if (concessionPeriod === "quaterly") {
                    user.nextConcessionDate = new Date(currentDate.setMonth(currentDate.getMonth() + 3)); // Add 3 months
                }

            } else if (userData.status === "Reject") {
                user.concessionRejectedCount += 1;

                // If rejected 3 times, block for 1 month
                if (user.concessionRejectedCount >= 3) {
                    user.canRequestConcession = false;
                    user.lastConcessionDate = currentDate;  // Set current date for rejection block
                    user.nextConcessionDate = new Date(currentDate.setMonth(currentDate.getMonth() + 1)); // Block for 1 month
                }
            }
        }

        await user.save()
        res.json({ newUserData })
    } catch (error) {
        res.status(400).send("Internal error")
    }
})

// creating rout  http://localhost:5000/api/data/deleteData/:id
routes.delete("/deleteData/:id", async (req, res) => {
    try {
        let userId = await UserData.findById(req.params.id)
        if (!userId) {
            return res.status(404).send("User Not Found")
        }
        const deleteuser = await UserData.findByIdAndDelete(req.params.id)
        res.send("User Deleted Successfully")
    } catch (error) {
        res.status(400).send("Internal error")
    }
})


// creating rout  http://localhost:5000/api/data/fetchdata
routes.post("/fetchdata", async (req, res) => {
    try {
        const data = await UserData.find().sort({ createdAt: -1 });
        res.json({ data })
    } catch (error) {
        res.status(400).send("Internal error")
    }
})

// creating rout  http://localhost:5000/api/data/fetchdata/:id
routes.post("/fetchdatabyid", fetchuser, async (req, res) => {
    try {
        const userid = req.user.id;
        const data = await UserData.findOne({
            user_id: userid
        }).sort({ createdAt: -1 });
        res.json({ data })
    } catch (error) {
        res.status(400).send("Internal error")
    }
})

routes.put("/updateStatus/:id", async (req, res) => {
    const { canRequestConcession, concessionRejectedCount } = req.body;
    try {
        const user = await USER.findById(req.params.id);
        if (!user) {
            return res.status(404).send("User Not Found");
        }

        user.canRequestConcession = canRequestConcession;
        user.concessionRejectedCount = concessionRejectedCount;

        await user.save();
        res.json({ message: "User status updated successfully", user });
    } catch (error) {
        res.status(400).send("Internal error");
    }
});

// send msg http://localhost:5000/api/data/send-msg"
routes.post("/send-msg", async (req, res) => {
    const { to, message } = req.body;

    try {
        const response = await client.messages.create({
            body: message,
            from: process.env.TWILIO_PHONE_NUMBER, // Twilio phone number
            to: "+91" + to
        });
        res.status(200).json({ sucess: true, response });
    } catch (error) {
        res.status(500).json({ sucess: false, error: error.message });
    }
})

module.exports = routes
