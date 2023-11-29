const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "skoleprojektdis@gmail.com",
    pass: "gagj xqup tjcu xqdw",
  },
});

async function sendMail(recipients, subject, text, html) {
  const mailOptions = {
    from: "Your Service <skoleprojektdis@gmail.com>",
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
