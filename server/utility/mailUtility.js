// root/server/utility/mailUtility.js
const dotenv = require('dotenv');
const path = require('path');
const nodemailer = require('nodemailer');

const gUser = process.env.GMAIL_USER;
const gPswd = process.env.GMAIL_PASS;


dotenv.config({ path: path.resolve(__dirname, '../../.env') });

console.log("Email User:", gUser);
console.log("Email Password:", gPswd ? "Password is set" : "Password is NOT set");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: gUser,
    pass: gPswd
  }
});

console.log(process.env.GMAIL_USER);
console.log(gPswd);

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
