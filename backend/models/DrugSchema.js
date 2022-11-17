const mongoose = require('mongoose');

const DrugSchema = new mongoose.Schema({
    type: {
        type: String,
        // default: '',
        required: [true, 'Please add a type'],
        trim: true,
    },
    name: {
        type: String,
        required: [true, "Please enter Drug Name!"],
        maxlength: [100, "Drug Name cannot exceed 100 characters"]
    },
    weight: {
        type: Number,
        default: 0
    },
    vendor: {
      type: String,
    //   default: "",
      required: [true, "Please enter your vendor!"],
      trim: true,
    },
    price: {
        type: Number,
        default: 0,
    },
    quantity: {
        type: Number,
        default: 0,
    }
})


const Drug =  mongoose.model("Drug", DrugSchema);
module.exports =  Drug;

