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
    ]
});

const ProjectApp = model('ProjectApp', ProjectAppSchema);

module.exports = ProjectApp;