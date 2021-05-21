const { Schema, model } = require('mongoose');

const CommentSchema = new Schema({
    content: {
        type: String,
        required: true,
    },
    projectApp: {
        type: Schema.Types.ObjectId,
        ref: 'ProjectApp'
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Comment = model('Comment', CommentSchema);

module.exports = Comment;