const { Schema, model } = require('mongoose');

const PostSchema = new Schema({
    title: {
        type: Schema.Types.String,
        required: true,
        unique: true,
    },
    subtitle: {
        type: Schema.Types.String
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    content: {
        type: Schema.Types.String,
        required: true,
    },
    createdOn: {
        type: Date,
        default: Date.now,
    },
    updatedOn: {
        type: Date,
    },
    imageUrl: {
        type: String
    }
});

const Post = model('Post', PostSchema);

module.exports = Post;