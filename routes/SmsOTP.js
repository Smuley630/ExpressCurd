const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Helper function to generate OTP
const generateOTP = () => {
  return Math.floor(1000 + Math.random() * 9000); // Generates a 4-digit OTP
};

// POST route to send OTP
app.post('/send-otpsms', async (req, res) => {
  const { mobileNumber } = req.body;

  if (!mobileNumber) {
    return res.status(400).json({ message: 'Mobile number is required' });
  }

  const otp = generateOTP();
console.log("firstotp",otp)
console.log("mm",mobileNumber)
  try {
    // Call Msg91 API to send OTP
    const response = await axios.post('https://api.msg91.com/api/v5/otp', {
      mobile: mobileNumber,
      authkey: '432639Aul5VlzH6710079eP1', // Replace with your Msg91 API Key
      message: `Your OTP is: ${otp}`,
      sender: 'SAGAR630',
      otp: otp
      // Replace with your Sender ID
   // Optional: If you want to use a template, provide the ID here
    });
    console.log("res",response)

    if (response.data.type === 'success') {
      return res.status(200).json({ message: 'OTP sent successfully', otp }); // For testing purposes
    } else {
      return res.status(500).json({ message: 'Failed to send OTP', error: response.data });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Error sending OTP', error: error.message });
  }
});

module.exports = app
