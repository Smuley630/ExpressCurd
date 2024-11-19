// server.js
const express = require('express');
const nodemailer = require('nodemailer');
const crypto = require('crypto');  // For generating OTPs
const cors = require('cors');
const bodyParser = require('body-parser');

const router = express();
router.use(cors());
router.use(bodyParser.json());

let otpStore = {};  // Store OTP temporarily for verification (use database in production)

// Configure Nodemailer for sending emails
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'Smuley630@gmail.com',  // Your Gmail address
        pass: 'mbwe arxv iyzh ppxh'     // Your Gmail password or router Password
    }
});

// Generate OTP and send to email
router.post('/send-otp', (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }

    // Generate a 6-digit OTP
    const otp = crypto.randomInt(100000, 999999).toString();

    // Store OTP with timestamp for expiration checking
    otpStore[email] = { otp, createdAt: Date.now() };

    // Send OTP via email
    const mailOptions = {
        from: 'Smuley630@gmail.com',
        to: email,
        subject: 'Your OTP for Two-Step Verification',
        text: `Your OTP is ${otp}. It will expire in 5 minutes.`
    };
    console.log("....mailOptions",mailOptions)

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log("...eror",error);
            return res.status(500).json({ message: 'Error sending OTP' });
        }
        res.status(200).json({ message: 'OTP sent successfully' });
    });
});

// Verify OTP
router.post('/verify-otp', (req, res) => {
    const { email, otp } = req.body;
console.log("11",email,otp)
    if (!email || !otp) {
        return res.status(400).json({ message: 'Email and OTP are required' });
    }

    const otpData = otpStore[email];
    console.log("..otpdata",otpData)
    if (!otpData) {
        return res.status(400).json({ message: 'OTP not found' });
    }

    const isValidOtp = otpData.otp === otp;
    const isExpired = (Date.now() - otpData.createdAt) > 300000;  // OTP is valid for 5 minutes

    if (isExpired) {
        return res.status(400).json({ message: 'OTP has expired' });
    }

    if (!isValidOtp) {
        return res.status(400).json({ message: 'Invalid OTP' });
    }

    // OTP is valid
    res.status(200).json({ message: 'OTP verified successfully' });
});
module.exports = router

