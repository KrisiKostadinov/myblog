const { createComment, deleteComment } = require('../services/comment');

module.exports = {
    async postCreateComment(req, res) {
        const comment = await createComment({
            content: req.body.content,
            author: req.user._id,
            projectApp: req.params.projectAppId
        });

        res.send(comment);
    },

    async deleteComment(req, res) {
        await deleteComment(req.params.id, req.params.projectAppId);
        res.send(200);
    }
}