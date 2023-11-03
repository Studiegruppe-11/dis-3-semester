const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const twilio = {
  myphone: process.env.MY_PHONE,
  twilioPhone: process.env.TWILIO_PHONE,
  accountSid: process.env.TWILIO_SID,
  authToken: process.env.TWILIO_TOKEN
};

const accountSid = twilio.accountSid;
const authToken = twilio.authToken;
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
    body: 'Godmorgen! Skriv "Server Ping" for at teste om serveren kører',
    from: twilio.twilioPhone,
    to: twilio.myphone
  })
  .then(message => console.log(` Besked sendt `))
  .catch(error => console.error(`Fejl: ${error.message}`));
