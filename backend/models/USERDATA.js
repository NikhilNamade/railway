const  mongoose = require('mongoose');
const { Schema } = mongoose;

const UserDataSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email:{
        type:String,
        required:true
    },
    tufid:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    from:{
        type:String,
        required:true
    },
    to:{
        type:String,
        required:true
    },
    year:{
        type:String,
        required:true
    },
    branch:{
        type:String,
        required:true
    },
    Class:{
        type:String,
        required:true
    },
    period:{
        type:String,
        required:true
    },
    aadhar:{
        type:String,
        required:true
    },
    collegeid:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true,
        default:"Pending"
    },
    reason:{
        type:String,
        default:"No Reason",
        required:true
    },
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
    
}, { timestamps: true });
module.exports = mongoose.model("UserData", UserDataSchema)