const User = require("../models/User");
const { sendMail } = require("./sendgrid");

const getUserById = async (id) => {
    return await User.findById(id);
}

const getUserByEmail = async (email) => {
    return await User.findOne({ email });
}

const sendVerificationEmail = async (user, secret) => {
    sendMail(user.email,
        'Успешно направена регистрация!',
        'Код за потвърждаване на профила.',
        `<h1>Hello, ${user.username}</h1><p>Последвайте линка  за да потвърдите профила си.</p>
        <a href="http://localhost:2000/users/verification/${user._id}/${secret.code}">http://localhost:2000/users/verification/${user._id}/${secret.code}</a>`);
}

const sendRecoveryPasswordEmail = async (email, link) => {
    sendMail(email,
        'Смяна на паролата',
        'Код за смяна на паролата',
        `<p>Последвайте линка за да смените паролата си.</p>
        <a href="http://localhost:2000/users/password/new/${link}">http://localhost:2000/users/password/new/${link}</a>`);
}

module.exports = {
    getUserById,
    sendVerificationEmail,
    getUserByEmail,
    sendRecoveryPasswordEmail,
}