// server.js
const express = require('express');
const nodemailer = require('nodemailer');
const crypto = require('crypto');  
const cors = require('cors');
const bodyParser = require('body-parser');

const router = express();
router.use(cors());
router.use(bodyParser.json());

let otpStore = {};  

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'Smuley630@gmail.com',  
        pass: 'mbwe arxv iyzh ppxh'     
    }
});

router.post('/send-otp', (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }

    const otp = crypto.randomInt(100000, 999999).toString();

    otpStore[email] = { otp, createdAt: Date.now() };

    const mailOptions = {
        from: 'Smuley630@gmail.com',
        to: email,
        subject: 'Your OTP for Two-Step Verification',
        text: `Your OTP is ${otp}. It will expire in 5 minutes.`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({ message: 'Error sending OTP' });
        }
        res.status(200).json({ message: 'OTP sent successfully' });
    });
});

router.post('/verify-otp', (req, res) => {
    const { email, otp } = req.body;
    if (!email || !otp) {
        return res.status(400).json({ message: 'Email and OTP are required' });
    }

    const otpData = otpStore[email];
    if (!otpData) {
        return res.status(400).json({ message: 'OTP not found' });
    }

    const isValidOtp = otpData.otp === otp;
    const isExpired = (Date.now() - otpData.createdAt) > 300000;  

    if (isExpired) {
        return res.status(400).json({ message: 'OTP has expired' });
    }

    if (!isValidOtp) {
        return res.status(400).json({ message: 'Invalid OTP' });
    }

    res.status(200).json({ message: 'OTP verified successfully' });
});
module.exports = router

