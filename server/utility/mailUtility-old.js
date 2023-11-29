// root/server/utility/mailUtility.js
const dotenv = require('dotenv');
const path = require('path');
const nodemailer = require('nodemailer');

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const gUser = process.env.GMAIL_USER;
const gPswd = process.env.GMAIL_PASS;


console.log("Email User:", gUser);
console.log("Email Password:", gPswd ? "Password is set" : "Password is NOT set");

// SMTP transport: https://nodemailer.com/smtp/
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "skoleprojektdis@gmail.com",
    pass: "gagj xqup tjcu xqdw",
  },
});

async function sendWelcomeEmail(recipientEmail, recipientName) {
  const mailOptions = {
    from: '"Your Service Name" <your-email@gmail.com>',
    to: recipientEmail,
    subject: "Welcome to Our Service!",
    text: `Hi ${recipientName}, welcome to our service! We're glad to have you.`,
    // You can also use HTML content
    html: `<b>Hi ${recipientName}</b>,<br>Welcome to our service! We're glad to have you.`
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Welcome email sent to ${recipientEmail}`);
  } catch (error) {
    console.error("Error sending welcome email", error);
    throw error; // Rethrow the error to handle it in the caller function
  }
}

module.exports = { sendWelcomeEmail };
