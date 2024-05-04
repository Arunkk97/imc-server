const jobs = require('../Models/jobModel')
const doctors = require('../Models/doctorModel');
const applications = require('../Models/applicationModel');

//job post
exports.jobPost = async (req, res) => {
    console.log('Inside job post');
    console.log(req.payload);
    console.log(req.body);
    const { title, qualification, experience, description,jobId } = req.body
    const userId = req.payload
    try {
        const vacancy = new jobs({
            title, qualification, experience, description,jobId,userId
        })
        await vacancy.save()
        res.status(200).json(vacancy)

    } catch (err) {
        res.status(401).json(err)
    }
}

//get job post
exports.getJobPost=async(req,res)=>{
    // const userId=req.payload
    try{
        const jobDetails=await jobs.find()
        res.status(200).json(jobDetails)
    }catch(err){
        res.status(401).json(err)
    }
}

//remove
exports.removeJob=async(req,res)=>{
    console.log('inside remove job');
    const {jid}=req.params
    try{
        const jobpost=await jobs.findByIdAndDelete({_id:jid})
        res.status(200).json(jobpost)

    }catch(err){
        res.status(401).json(err)
    }
}


//edit
exports.editJob=async(req,res)=>{
    console.log('inside edit job');
    const {jid}=req.params
    const userId=req.payload
    const {title, qualification, experience, description}=req.body
    try{
        const updatedJob=await jobs.findByIdAndUpdate({_id:jid},{
            title, qualification, experience, description,userId 
        },{new:true})
        await updatedJob.save()
        res.status(200).json(updatedJob)

    }catch(err){
        res.status(401).json(err)
    }
}

//get job application  
exports.getAllJobApplication=async(req,res)=>{
    try{
        const jobApplication=await applications.find()
        res.status(200).json(jobApplication)
    }catch(err){
        res.status(401).json(err)
    }
}

//add doctors
exports.addDoctor = async (req, res) => {
    console.log('Inside add doctor ');
    console.log(req.body);
    console.log(req.file);
    const { name, address, phone, email,qualification,department } = req.body
    const doctorImage = req.file.filename
    try {
        const existingDoctor = await doctors.findOne({ email })
        if (existingDoctor) {
            res.status(406).json('Doctor Already Added !!!')

        } else {
            const newDoctor = new doctors({
                name, address, phone, email,qualification,department,doctorImage 
            })
            await newDoctor.save()
            res.status(200).json(newDoctor)
        }
    } catch (err) {
        res.status(401).json(err)
    }
}

//get all doctor admin
exports.getAllDoctor=async(req,res)=>{
    try{
        const allDoctors=await doctors.find()
        res.status(200).json(allDoctors)
    }catch(err){
        res.status(401).json(err)
    }
}

//remove doctor
exports.removeDoctor=async(req,res)=>{
    console.log('inside remove Doctor');
    const {dId}=req.params
    try{
        const docRemove=await doctors.findByIdAndDelete({_id:dId})
        res.status(200).json(docRemove)

    }catch(err){
        res.status(401).json(err)
    }
}

//edit doctor
exports.editDoc=async(req,res)=>{
    console.log('inside edit doctor');
    const {dId}=req.params
    const userId=req.payload
    const {name, address, phone, email,qualification,department,doctorImage}=req.body
    const uploadImage=req.file?req.file.filename:doctorImage
    try{
        const updatedDoc=await doctors.findByIdAndUpdate({_id:dId},{
            name, address, phone, email,qualification,department,doctorImage:uploadImage,userId
        },{new:true})
        await updatedDoc.save()
        res.status(200).json(updatedDoc)

    }catch(err){
        res.status(401).json(err)
    }
}

//get alldoctors homepage
exports.getAllDoctorsHome=async(req,res)=>{
    try{
        const allDoctorsHome=await doctors.find()
        res.status(200).json(allDoctorsHome)
    }catch(err){
        res.status(401).json(err)
    }
}


//get alldoctors to appointment page
exports.getAllDoctorsAppoint=async(req,res)=>{
    try{
        const allDoctorsAppoint=await doctors.find()
        res.status(200).json(allDoctorsAppoint)
    }catch(err){
        res.status(401).json(err)
    }
}

//get job application count  
exports.getAllJobApplicationCount=async(req,res)=>{
    try{
        const jobApplicationCount=await applications.find()
        res.status(200).json(jobApplicationCount)
    }catch(err){
        res.status(401).json(err)
    }
}

//get All Doc and Dep
exports.getDocAndDep=async(req,res)=>{
    const {dId}=req.params
   
    try{
        const allDoc=await doctors.find({department:dId})
        res.status(200).json(allDoc)
    }catch(err){
        res.status(401).json(err)
    }
}






