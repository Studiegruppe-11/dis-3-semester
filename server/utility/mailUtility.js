// root/server/utility/mailUtility.js
const dotenv = require('dotenv');
// const path = require('path');
const nodemailer = require('nodemailer');


// dotenv.config({ path: path.resolve(__dirname, '../../.env') });

// Gmail brugerens mail + applikationskode (normalt password kan ikke bruges)
const gUser = 'skoleprojektdis@gmail.com';
const gPswd = 'gagj xqup tjcu xqdw';

// const gUser = process.env.GMAIL_USER;
// const gPswd = process.env.GMAIL_PASS;

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: gUser,
    pass: gPswd,
  },
});

console.log("Email User:", gUser);
console.log("email Password:", gPswd ? "Password is set" : "Password is NOT set");

async function sendMail(recipients, subject, text, html) {
  const mailOptions = {
    from: "Your Service <gUser>",
    to: recipients,
    subject: subject,
    text: text,
    html: html
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.error("Error in sending email:", error);
    throw error; // Rethrow the error for further handling
  }
}

module.exports = { sendMail };
