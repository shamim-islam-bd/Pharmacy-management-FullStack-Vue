const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name!"],
        maxlength: [100, "Your name cannot exceed 100 characters"]
    },
    description: {
        type: String,
        required: [true, "Please enter your description!"],
        maxlength: [100, "Your description cannot exceed 100 characters"]
    },
    // image: {
    //     type: String,
    //     default: "no-photo.jpg"
    // },
    createdAt: {
        type: Date,
        default: Date.now
    }
})


const Vendor =  mongoose.model("Vendor", vendorSchema);
module.exports =  Vendor;

