const express=require('express')
const userController=require('../Controllers/userController')
const appointmentController=require('../Controllers/appointmentController')
const jwtMiddleware=require('../Middlewares/jwtMiddleware')
const adminController=require('../Controllers/adminController')
const multerConfig = require('../Middlewares/multerMiddleware')

const router=new express.Router()

//register 
router.post('/register',userController.register)

//login
router.post('/login',userController.login)

//book appointment
router.post('/book-appointment',jwtMiddleware,appointmentController.bookAppointment)

//get all appointments
router.get('/all-appointments',appointmentController.getAllAppointments)

//get user appointment
router.get('/user-appointments',jwtMiddleware,appointmentController.getUserAppointment)

//job post
router.post('/job-post',jwtMiddleware,adminController.jobPost)

//get job post admin
router.get('/getAllJob',jwtMiddleware,adminController.getJobPost)

//remove job post
router.delete('/removeJob/:jid',jwtMiddleware,adminController.removeJob)

//edit job post
router.put('/editJob/:jid',jwtMiddleware,adminController.editJob)

//get careers post home page
router.get('/getCareersJob',adminController.getJobPost)

//job apply  post
router.post('/jobApplication',multerConfig.single('resume'),userController.jobApplicationPost)

//get job application  admin
router.get('/getAllJobApplication',jwtMiddleware,adminController.getAllJobApplication)

//addDoctor
router.post('/addDoctor',multerConfig.single('doctorImage'),adminController.addDoctor)

//get all doctor admin
router.get('/getAllDoctors',jwtMiddleware,adminController.getAllDoctor)

//remove doctor
router.delete('/removeDoctor/:dId',jwtMiddleware,adminController.removeDoctor)

//edit doctor
router.put('/editDoctor/:dId',jwtMiddleware,multerConfig.single('doctorImage'),adminController.editDoc)

//get alldoctors homepage
router.get('/homeDoctor',adminController.getAllDoctorsHome)

//get alldoctors to appointment page
router.get('/allDoctorAppoint',adminController.getAllDoctorsAppoint)

//get job application  admin
router.get('/getAllJobApplicationCount',adminController.getAllJobApplicationCount)

//get All Doc and Dep
router.get('/getDocAndDep/:dId',adminController.getDocAndDep)

module.exports=router