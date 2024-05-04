const mongoose = require('mongoose')

const jobSchema = new mongoose.Schema({
   
    title: {
        type: String,
        required: true
    },
    qualification: {
        type: String,
        required: true,

    },
    experience: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    jobId:{
        type: String,
        required: true

    },
    userId: {
        type: String,
        required: true

    }

})
const jobs = mongoose.model("jobs", jobSchema)

module.exports = jobs