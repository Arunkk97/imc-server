//load .env file contents into process .env  by default
require('dotenv').config()
const express=require('express')
const cors=require('cors')
const router=require('./Routes/router')
require('./DB/connection')

//create an express application
const hmsServer=express()

//use cors in express server
hmsServer.use(cors())
hmsServer.use(express.json())
hmsServer.use(router)
hmsServer.use('/uploads',express.static('./uploads'))

const PORT=3000 || process.env.PORT

hmsServer.listen(PORT,()=>{
    console.log(`hmsServer started at PORT ${PORT}`);
})

// http://localhost:3000/
hmsServer.get('/',(req,res)=>{
    res.status(200).send(`<h1 style="color:red">hmsServer started and waiting for client request!!! </h1>`)
})