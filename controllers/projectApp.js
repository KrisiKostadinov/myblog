const { getAllProjectApps, createProjectApp, getProjectById } = require('../services/projectApp');
const cloudinary = require('cloudinary');

module.exports = {
    async getCreateProjectApp(req, res) {
        res.render('administration/projects/apps/create', { title: 'Нов проект', layout: 'admin' });
    },

    async postCreateProjectApp(req, res) {
        const files = req.files;
        const { title, subtitle, content } = req.body;

        if (title === '' || content === '') {
            return res.render('administration/projects/apps/create', {
                title: 'Нов проект',
                layout: 'admin',
                error: 'Заглавието и описанието са задължителни!',
                titleProject: title,
                subtitle,
                content
            });
        }

        if (files) {
            let paths = [];
            const uploaders = files.images.map(img => {
                const fileStr = img.tempFilePath;
                return cloudinary.uploader.upload(fileStr, {})
                    .then((res) => {
                        console.log(res);
                        paths.push(res.secure_url);
                    });
            });

            Promise.all(uploaders)
                .then(async () => {
                    await createProjectApp({
                        title,
                        subtitle,
                        content,
                        images: paths
                    });

                    req.flash('success_msg', 'Успешно създаване на проект!');
                    res.redirect('projects/apps/all');
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    },

    async getAll(req, res) {
        const apps = await getAllProjectApps();
        apps.forEach(app => {
            app.cover = app.images[0];
            console.log(app);
        });

        res.render('projects/apps/all', { title: 'Проекти', apps });
    },

    async byId(req, res) {
        const app = await getProjectById(req.params.id);

        app.createdOn = new Date(app.createdOn).toLocaleDateString();

        console.log(app);

        res.render('projects/apps/details', { title: app.title, app });
    }
}