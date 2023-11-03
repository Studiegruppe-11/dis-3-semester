const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS
  }
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
  }
}

module.exports = { sendWelcomeEmail };
