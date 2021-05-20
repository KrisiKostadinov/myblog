const { Schema, model } = require('mongoose');

const SecretCodeSchema = new Schema({
    email: {
        type: Schema.Types.String,
        required: true,
        unique: true,
    },
    code: {
        type: Schema.Types.String,
        required: true,
    },
    createdOn: {
        type: Date,
        default: Date.now,
        expires: 600,
    }
});

const SecretCode = model('SecretCode', SecretCodeSchema);

module.exports = SecretCode;