const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    email: {
        type: Schema.Types.String,
        required: true,
        unique: true,
    },
    username: {
        type: Schema.Types.String,
        required: true,
    },
    role: {
        type: Schema.Types.String,
        default: 'user'
    },
    status: {
        type: Schema.Types.String,
        default: 'pending'
    },
    password: {
        type: Schema.Types.String,
        required: true,
    },
    posts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Post'
        }
    ]
});

const User = model('User', UserSchema);

module.exports = User;