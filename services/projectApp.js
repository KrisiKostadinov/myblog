const ProjectApp = require('../models/ProjectApp');

const createProjectApp = async (data) => {
    return await ProjectApp.create(data);
}

const updateProjectApp = async (id, data) => {
    return await ProjectApp.updateOne({ _id: id }, {
        $addToSet: { images: data.images }
    });
}

const getAllProjectApps = async () => {
    return await ProjectApp.find().lean();
}

const getProjectById = async (id) => {
    return await ProjectApp.findById(id).lean()
        .populate({
            path: 'comments',
            populate: { path: 'author' }
        }).lean();
}

module.exports = {
    createProjectApp,
    updateProjectApp,
    getAllProjectApps,
    getProjectById,
}