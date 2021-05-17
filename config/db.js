const mongoose = require('mongoose');

const url = process.env.DATABASE_LOCAL;

module.exports = mongoose.connect(url, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
}).then(() => {
    console.log(`Database is ready to ${process.env.DATABASE_SUBJECT}!`);
}).catch((err) => {
    console.log(err);
});