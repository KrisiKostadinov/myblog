const { getAllUsers } = require("../services/admin");

module.exports = {
    async getUsers(req, res) {
        let users = await getAllUsers();

        users.map(user => {
            user.firstName = user.username.split(' ')[0];
            user.lastName = user.username.split(' ')[1];
        });

        res.render('administration/users', { users, layout: 'admin', title: 'Потребители' });
    }
}