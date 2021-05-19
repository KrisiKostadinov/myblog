const cloudinary = require('cloudinary');
const { post } = require('../services');

module.exports = {
    getCreatePost(req, res) {
        res.render('post/create', { title: 'Създаване на статия' });
    },

    async postCreatePost(req, res) {
        const image = req.files?.image;
        const { title, subtitle, content } = req.body;

        try {
            let imageUrl = '';

            if(image) {
                const fileStr = image.tempFilePath;
                const uploadResponse = await cloudinary.uploader.upload(fileStr, { });
                imageUrl = uploadResponse.secure_url;
            }

            await post.createPost({ title, subtitle, content, imageUrl });
            res.redirect('/');
        } catch (err) {
            console.error(err);
            res.render('post/create', {
                title: 'Създаване на статия',
                error: err.code === 11000 ? 'Има статия с това име.' : 'Заглавието и описанието са задължителни',
                titlePost: title,
                subtitle,
                content,
                image,
            });
        }
    }
}