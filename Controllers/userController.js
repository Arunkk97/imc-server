const users = require('../Models/userModel')
const applications = require('../Models/applicationModel')
const jwt = require('jsonwebtoken')

//register
exports.register = async (req, res) => {
    console.log("inside register request!!!");
    const { username, email, password } = req.body
    console.log(username, email, password);
    try {
        //check email is present in db or not
        const existingUser = await users.findOne({ email })
        //if email is present then existing user
        if (existingUser) {
            res.status(406).json("user already exists!!!")
        } else {
            //else store/ insert data to db
            const newUser = new users({
                username, email, password, profile: ''
            })
            //to store data to mongodb  from mongoose model
            await newUser.save()
            res.status(200).json(newUser)
        }

    } catch (err) {
        res.status(401).json(err)
    }
}

//login
exports.login = async (req, res) => {
    console.log("inside login function");

    //get email password from req
    const { email, password } = req.body
    console.log(email, password);
    try {
        //check email is present in db or not
        const existingUser = await users.findOne({ email, password })
        if (existingUser) {
            //user can login
            //generate token
            const token = jwt.sign({ userId: existingUser._id }, process.env.JWT_SECRET)

            res.status(200).json({
                existingUser,
                token
            })
        } else {
            //incorrect email/password
            res.status(404).json("incorrect Email/password")
        }

    } catch (err) {
        res.status(401).json(err)
    }

}


//job application post
exports.jobApplicationPost = async (req, res) => {
    console.log('Inside job App post');
    console.log(req.body);
    console.log(req.file);
    const { name, address, phone, email, gender, age, qualification,jobId } = req.body
    // const userImage = req.file.filename
    const resume = req.file.filename
    try {
        const existingApplication = await applications.findOne({ email })
        if (existingApplication) {
            res.status(406).json('Application already submitted !!!')

        } else {
            const newJob = new applications({
                name, address, phone, email, gender, age, qualification,jobId,resume
            })
            await newJob.save()
            res.status(200).json(newJob)
        }
    } catch (err) {
        res.status(401).json(err)
    }
}
