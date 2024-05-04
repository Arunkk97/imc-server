const mongoose = require('mongoose')

const applicationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    qualification: {
        type: String,
        required: true,
    },
    jobId:{
        type: String,
        required: true
    },
    resume:{
        type: String,
        required: true
    }
})
const applications = mongoose.model("applications", applicationSchema)

module.exports = applications