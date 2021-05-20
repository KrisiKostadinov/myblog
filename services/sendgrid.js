const sendgrid = require('@sendgrid/mail');

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

const sendMail = (to, subject, text, html) => {
    const msg = {
        to: to,
        from: process.env.SENDGRID_API_EMAIL,
        subject: subject,
        text: text,
        html: html,
    }
    
    return sendgrid.send(msg);
}

module.exports = {
    sendMail,
}