const { getAllProjectApps, createProjectApp, updateProjectApp, getProjectById } = require('../services/projectApp');
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

        const app = await createProjectApp({
            title,
            subtitle,
            content
        });

        if (files) {
            let paths = [];
            const uploaders = files.images.map(img => {
                const fileStr = img.tempFilePath;
                return cloudinary.uploader.upload(fileStr, {})
                    .then((res) => {
                        paths.push(res.secure_url);
                    });
            });

            Promise.all(uploaders)
                .then(async () => {
                    await updateProjectApp(app._id, { images: paths });
                })
                .catch((err) => {
                    console.log(err);
                });
        }

        req.flash('success_msg', 'Успешно създаване на проект!');
        res.redirect('projects/apps/all');
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
        try {
            const app = await getProjectById(req.params.id);
            
            if (app) {
                app.createdOn = new Date(app.createdOn).toLocaleDateString();
                app.comments.map(comment => {
                    comment.isMy = String(req.user?._id) == String(comment.author._id);
                });
            }
            res.render('projects/apps/details', { title: app.title, app });
        } catch (err) {
            res.redirect('/404');
        }
    }
}