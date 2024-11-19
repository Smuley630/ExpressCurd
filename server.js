const express= require('express')
const routeEmployee = require ('./routes/employee')
const routeOtp = require('./routes/otp')
const routesmsotp=require('./routes/SmsOTP')
const routeusers=require('./routes/users')
const routeusersReview = require('./routes/userReview')
const routewelcomeMail = require('./routes/welcomeMail')
const routefoodOrder = require('./routes/foodOrder')
const routeExpense = require('./routes/expense')
const routeSaving = require('./routes/saving')






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
app.use(routeusers)
app.use(routeusersReview)
app.use(routewelcomeMail)
app.use(routefoodOrder)
app.use(routeExpense)
app.use(routeSaving)




app.get('/',(req, res)=>{
res.send("welcome to shop")
})


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(8000,'0.0.0.0',()=>{
    console.log("server running on 3000")
})