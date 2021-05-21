const Comment = require('../models/Comment');
const ProjectApp = require('../models/ProjectApp');

const createComment = async (data) => {
    const comment = await Comment.create(data);
    await ProjectApp.updateOne({ _id: comment.projectApp }, {
        $addToSet: { comments: comment._id }
    });

    return comment;
}

const getAllComments = async () => {
    return await Comment.find().lean()
        .populate('author').populate('projectApp.author');
}
const deleteComment = async (id, projectAppId) => {
    await ProjectApp.updateOne({ _id: projectAppId }, {
        $pull: { comments: id }
    });
    return await Comment.findOneAndDelete({ _id: id });
}

module.exports = {
    createComment,
    getAllComments,
    deleteComment,
}