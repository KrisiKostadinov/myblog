const ProjectApp = require('../models/ProjectApp');

const createProjectApp = async (data) => {
    return await ProjectApp.create(data);
}

const getAllProjectApps = async () => {
    return await ProjectApp.find().lean();
}

module.exports = {
    createProjectApp,
    getAllProjectApps,
}