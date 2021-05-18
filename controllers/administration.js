const { getAllUsers } = require("../services/admin");

module.exports = {
    async getUsers(req, res) {
        const page = req.query.page ? Number(req.query.page) : 0;

        const data = await getAllUsers(page);

        data.users.map(user => {
            user.firstName = user.username.split(' ')[0];
            user.lastName = user.username.split(' ')[1];
        });

        console.log('page ' + page);

        res.render('administration/users', {
            title: 'Потребители',
            users: data.users,
            page,
            layout: 'admin',
            isLast: data.numberOfDocuments === data.users.length * (page + 1),
            numberOfDocuments: data.numberOfDocuments / 2
        });
    }
}