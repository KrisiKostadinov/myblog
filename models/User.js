const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    email: {
        type: Schema.Types.String,
        required: true,
        unique: true,
    },
    password: {
        type: Schema.Types.String,
        required: true,
    }
});

const User = model('User', UserSchema);

module.exports = User;