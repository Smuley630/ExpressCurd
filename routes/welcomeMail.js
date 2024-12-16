// server.js
const express = require('express');
const nodemailer = require('nodemailer');
const crypto = require('crypto');  // For generating OTPs
const cors = require('cors');
const bodyParser = require('body-parser');

const router = express();
router.use(cors());
router.use(bodyParser.json());


// Configure Nodemailer for sending emails
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'Smuley630@gmail.com',  // Your Gmail address
        pass: 'mbwe arxv iyzh ppxh'     // Your Gmail password or router Password
    }
});

// Generate OTP and send to email
router.post('/send-welcomeMail', (req, res) => {
    const { name ,email } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }
    const mailOptions = {
        from: 'Smuley630@gmail.com',
        to: email,
        subject: 'Welcome ',
        text: `Welcome ${name}! We're thrilled to have you here. Dive in to explore our offerings, designed with your needs in mind. Enjoy a seamless, engaging experience as you navigate through our site. Thank you for visiting—let's make something amazing together!`
    };
    console.log("..../send-welcomeMail",mailOptions)

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
console.log(".......sagart")
            console.log("...eror",error);
            return res.status(500).json({ message: 'Error sending OTP' });
        }
        res.status(200).json({ message: 'OTP sent successfully' });
    });
});


module.exports = router

