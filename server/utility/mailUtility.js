// root/server/utility/mailUtility.js
const dotenv = require('dotenv');
const path = require('path');
const nodemailer = require('nodemailer');

// Login variabler til Gmail
const gUser = process.env.GMAIL_USER;
const gPswd = process.env.GMAIL_PASS;

// Opret transporter, som er en forbindelse til Gmail serveren
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: gUser,
    pass: gPswd,
  },
});

// Funktion til at sende mails, tager modtager, emne, tekst og html som parametre
async function sendMail(recipients, subject, text, html) {
  const mailOptions = {
    from: "Joes, <gUser>",
    to: recipients,
    subject: subject,
    text: text,
    html: html
  };

  // Send mailen og log resultatet
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.error("Error in sending email:", error);
    throw error;
  }
}

module.exports = { sendMail };
