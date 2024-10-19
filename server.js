const express= require('express')
const routeEmployee = require ('./routes/employee')
const routeOtp = require('./routes/otp')
const routesmsotp=require('./routes/SmsOTP')
// const routecompant= require('./routes/company')
const cors = require('cors');


const bodyparser = require('body-parser')
const mysql2 = require('mysql2')

const app = express()
app.use(cors());
const jsonparse= bodyparser.json()
app.use(jsonparse)




app.use(routeEmployee)
app.use(routeOtp)
app.use(routesmsotp)



app.get('/',(req, res)=>{
res.send("welcome to shop")
})


app.listen(3000,'0.0.0.0',()=>{
    console.log("server running on 3000")
})