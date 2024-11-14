const mongoose = require('mongoose');
const { Schema } = mongoose;

const USERSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    branch: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    tufid: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    Phno:
    {
        type: Number,
        default: 0
    },
    concessionRejectedCount:
    {
        type: Number,
        default: 0
    },
    lastConcessionDate:{
        type: Date,
        required: true,
        default: Date.now
    },  // Date of last approval or rejection
    canRequestConcession:
    {
        type: Boolean,
        default: true
    },
    nextConcessionDate: {
        type: Date,
    },
    Date: {
        type: Date,
        required: true,
        default: Date.now
    }
});
module.exports = mongoose.model("User", USERSchema)