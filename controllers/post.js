const cloudinary = require('cloudinary');
const { post } = require('../services');

module.exports = {
    getCreatePost(req, res) {
        res.render('post/create', { title: 'Създаване на статия' });
    },

    async getPost(req, res) {
        try {
            const postDb = await post.getPost(req.params.id);
            if (postDb) {
                postDb.createdOn = new Date(postDb.createdOn).toLocaleDateString();
            }

            res.render('post/details', { title: postDb.title, post: postDb });
        } catch (err) {
            res.redirect('/404');
        }
    },

    async searchPosts(req, res) {
        const query = req.query.search;
        const posts = await post.searchPosts(query);
        posts.forEach(post => {
            post.createdOn = new Date(post.createdOn).toLocaleDateString();
        })
        res.render('post/search', { title: 'Резултат от търсенето', posts, query });
    },

    async postCreatePost(req, res) {
        const image = req.files?.image;
        const { title, subtitle, content } = req.body;

        try {
            let imageUrl = '';

            if (image) {
                const fileStr = image.tempFilePath;
                const uploadResponse = await cloudinary.uploader.upload(fileStr, {});
                imageUrl = uploadResponse.secure_url;
            }

            await post.createPost({ title, subtitle, content, imageUrl, author: req.user._id });
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
    },

    async deletePost(req, res) {
        await post.deletePost(req.params.id);
        res.sendStatus(200);
    }
}