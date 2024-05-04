const appointments = require('../Models/appointmentModel')
const { sendMail } = require('../sendMail')

exports.bookAppointment = async (req, res) => {
    console.log('Inside book appointment');
    console.log(req.payload);
    console.log(req.body);
    const { name, email, phone, age, gender, appointmentDate, department, doctor, remarks} = req.body
    const userId=req.payload
    try {
        const booking = new appointments({
            name, email, phone, age, gender, appointmentDate, department, doctor, remarks, userId
        })
        await booking.save()
        sendMail(email, " IMC ", `Dear ${name},
        Thank you for booking your appointment with IMC. We are pleased to confirm your appointment as follows: 
                Name : ${name}
                Age : ${age}
                Gender : ${gender}
                Appointment Date : ${appointmentDate}
                Doctor : ${doctor}
                Department : ${department}

                If you have any questions or need assistance, feel free to contact our friendly support team. We are here to help you !!!

    `)
    res.status(200).json(booking)

       

    } catch (err) {
        res.status(401).json(err)
    }
}


//get allappointment

exports.getAllAppointments = async (req, res) => {
    try {
        const allAppointments = await appointments.find()
        res.status(200).json(allAppointments)
    } catch (err) {
        res.status(401).json(err)
    }
}


//get user appointment
exports.getUserAppointment=async(req,res)=>{
    const userId=req.payload
    try{
        const userAppointment=await appointments.find({userId})
        res.status(200).json(userAppointment)
    }catch(err){
        res.status(401).json(err)
    }
}