const mongoose = require("mongoose")
const mongooseURI = "mongodb+srv://nikhilnamade193:oYAZkvyTW4KxPonm@railway.cujld.mongodb.net/"
const connectTomongoose = async () => {
    await mongoose.connect(mongooseURI, {
        useUnifiedTopology: true
    });
    console.log("Connect to mongoose");
}
module.exports = connectTomongoose