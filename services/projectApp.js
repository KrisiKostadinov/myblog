const ProjectApp = require('../models/ProjectApp');

const createProjectApp = async (data) => {
    return await ProjectApp.create(data);
}

const getAllProjectApps = async () => {
    return await ProjectApp.find().lean();
}

const getProjectById = async (id) => {
    return await ProjectApp.findById(id).lean();
}

module.exports = {
    createProjectApp,
    getAllProjectApps,
    getProjectById,
}