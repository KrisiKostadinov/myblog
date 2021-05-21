const { Schema, model } = require('mongoose');

const ProjectAppSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    subtitle: {
        type: String,
    },
    content: {
        type: String,
        required: true,
    },
    images: [
        {
            type: String
        }
    ],
    createdOn: {
        type: Date,
        default: Date.now
    }
});

const ProjectApp = model('ProjectApp', ProjectAppSchema);

module.exports = ProjectApp;