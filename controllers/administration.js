const { getAllUsers, getAllPosts } = require("../services/admin");

module.exports = {
    async getUsers(req, res) {
        const page = req.query.page ? Number(req.query.page) : 0;

        const data = await getAllUsers(page);

        data.users.map(user => {
            user.firstName = user.username.split(' ')[0];
            user.lastName = user.username.split(' ')[1];
        });

        res.render('administration/users', {
            title: 'Потребители',
            users: data.users,
            page,
            layout: 'admin',
            isLast: data.numberOfDocuments === data.users.length * (page + 1),
            numberOfDocuments: data.numberOfDocuments / 2
        });
    },

    async getPosts(req, res) {
        const page = req.query.page ? Number(req.query.page) : 0;

        const data = await getAllPosts(page);

        data.posts.forEach(post => {
            post.createdOn = new Date(post.createdOn).toLocaleDateString();
            const titleHelper = post.title.length > 30 ? '...' : '';
            const subtitleHelper = post.subtitle.length > 30 ? '...' : '';
            post.title = post.title.substr(0, 30) + titleHelper;
            post.subtitle = post.subtitle.substr(0, 30) + subtitleHelper;
        });

        res.render('administration/posts', {
            title: 'Статии',
            posts: data.posts,
            page,
            layout: 'admin',
            isLast: data.numberOfDocuments === data.posts.length * (page + 1),
            numberOfDocuments: data.numberOfDocuments / 2
        });
    }
}