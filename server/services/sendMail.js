const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

async function sendMail({email, otp}) {
    subject = 'Your OTP Code';
    htmlContent = `
        <p>Hello,</p>
        <p>Your OTP code is: <strong>${otp}</strong></p>
        <p>This code is valid for 15 minutes.</p>
        <p>Thank you!</p>
    `;

    const mailOptions = {
        from: `"ESTORE" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: subject,
        html: htmlContent
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Email sent to ${email}`);
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Failed to send email');
    }
}

module.exports = sendMail;