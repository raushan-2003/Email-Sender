const nodemailer = require('nodemailer');
const htmlTemplate = require('./emailTemplate');
require('dotenv').config();

// Retrieve environment variables
const Useremail = process.env.USERMAIL;
const pass = process.env.PASS;

async function sendMail(email, subject, dynamicText) {
    try {
        // Create a nodemailer transporter using Gmail service
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: Useremail, // Gmail user email address from environment variable
                pass: pass // Gmail password from environment variable
            }
        });

        // Create HTML email template with dynamic text content
        let template = htmlTemplate(dynamicText);

        // Define mail options
        const mailOptions = {
            from: `Raushan Singh <${Useremail}>`, // Sender email address
            to: email, // Recipient email address
            subject: subject, // Email subject
            html: template // Email body in HTML format
        };

        // Send mail
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent: ", info.response);

        // Return response
        return {
            statusCode: 200,
            id: info.messageId,
            body: info
        };
    } catch (error) {
        console.error("Error sending email: ", error);
        throw error;
    }
}

module.exports = sendMail;


