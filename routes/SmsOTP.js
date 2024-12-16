const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

const generateOTP = () => {
  return Math.floor(1000 + Math.random() * 9000);
};

app.post('/send-otpsms', async (req, res) => {
  const { mobileNumber } = req.body;
  if (!mobileNumber) {
    return res.status(400).json({ message: 'Mobile number is required' });
  }

  const otp = generateOTP();
  console.log("firstotp", otp)
  console.log("mm", mobileNumber)
  try {
    const response = await axios.post('https://api.msg91.com/api/v5/otp', {
      mobile: mobileNumber,
      authkey: '432639Aul5VlzH6710079eP1',
      message: `Your OTP is: ${otp}`,
      sender: 'SAGAR630',
      otp: otp
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authkey': '432639Aul5VlzH6710079eP1'
      }
    });

    if (response.data.type === 'success') {
      return res.status(200).json({ message: 'OTP sent successfully', otp });
    } else {
      return res.status(500).json({ message: 'Failed to send OTP', error: response.data });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Error sending OTP', error: error.message });
  }
});

module.exports = app
