const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER || "deepak.kommonschool@gmail.com",
        pass: process.env.EMAIL_PASS
    }
});

// Verify connection on startup
transporter.verify((error) => {
    if (error) {
        console.error('Email service error:', error);
    } else {
        console.log('Email service ready');
    }
});

const sendEmail = async (to, subject, body) => {
    if (!process.env.EMAIL_PASS) {
        const error = new Error('EMAIL_PASS environment variable is not set');
        console.error('Configuration error:', error.message);
        throw error;
    }

    let mailOptions = {
        to,
        from: process.env.EMAIL_USER || "deepak.kommonschool@gmail.com",
        subject,
        html: body
    };

    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.error('Error sending email to', to, ':', err);
                reject(err);
            } else {
                console.log('Email sent successfully to', to, ':', info.response);
                resolve(info);
            }
        });
    });
};

module.exports = sendEmail;