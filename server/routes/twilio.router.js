// //root/routes/twilio.router.js
// const twilio = require('twilio');
// const express = require('express');
// const router = express.Router();

// const path = require('path');
// const dotenv = require('dotenv');
// dotenv.config({ path: path.resolve(__dirname, '../../.env') });

// const twilioConfig = {
//   myphone: process.env.MY_PHONE,
//   twilioPhone: process.env.TWILIO_PHONE,
//   accountSid: process.env.TWILIO_SID,
//   authToken: process.env.TWILIO_TOKEN
// };

// const client = twilio(twilioConfig.accountSid, twilioConfig.authToken);

// // POST-rute til at håndtere svar fra mobilnummeret
// router.post('/incomingSMS', (req, res) => {
//   const incomingMessage = req.body.Body.toLowerCase();

//   if (incomingMessage === 'server ping') {
//     // Udfør ping-test her
//     const pingResult = 'Serveren er online og reagerer.';
//     sendSMS(pingResult, req.body.From);
//   } else {
//     // Håndter andre beskeder
//     const response = 'Jeg forstår ikke din besked. Send "Server Ping" for at teste serveren.';
//     sendSMS(response, req.body.From);
//   }

//   res.status(200).end();
// });

// // Hjælpefunktion til at sende SMS-beskeder
// function sendSMS(message, to) {
//   client.messages
//     .create({
//       body: message,
//       from: twilioConfig.twilioPhone,
//       to: to
//     })
//     .then(message => console.log(`Besked sendt med SID: ${message.sid}`))
//     .catch(error => console.error(`Fejl: ${error.message}`));
// }

// module.exports = router;