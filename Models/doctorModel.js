const mongoose = require('mongoose')

const doctorSchema = new mongoose.Schema({
   name: {
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true,
    },
    phone:{
        type: Number,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    qualification: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true
    },
    doctorImage: {
        type: String,
        required: true
    }

})
const doctors = mongoose.model("doctors", doctorSchema)

module.exports = doctors