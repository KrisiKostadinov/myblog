const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const passport = require('passport');
const fileUpload = require('express-fileupload');
const cloudinary = require('cloudinary');

require('dotenv').config();
require('./config/db');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const administrationRouter = require('./routes/administration');
const postRouter = require('./routes/post');
const projectAppsRouter = require('./routes/projectApps');
const commentAppRouter = require('./routes/comment');

require('./config/passport')(passport);

const app = express();

app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(methodOverride('_method'));

app.use(require("body-parser").json());
app.use(fileUpload({
    useTempFiles: true,
}));

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs',
    helpers: {
        is: function (first, second, options) {
            return first === second ? options.fn(this) : options.inverse(this);
        },
        inc: function (number) {
            return parseInt(number) + 1;
        },
        dec: function (number) {
            return parseInt(number) - 1;
        },
        times: function (n, block) {
            var accum = '';
            for (var i = 0; i < n; ++i)
                accum += block.fn(i);
            return accum;
        },
        isAsNum: function (first, second, options) {
            console.log(' - ' + first, second);
            return Number(first) === Number(second) ? options.fn(Number(this)) : options.inverse(Number(this));
        },
    }
}));

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())

app.use(flash());


app.set('view engine', '.hbs');
app.use("/public", express.static(__dirname + '/public'));

app.use((req, res, next) => {
    res.locals.error_msg = req.flash('error_msg');
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error = req.flash('error');
    console.log(res.locals);
    next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/administration', administrationRouter);
app.use('/post', postRouter);
app.use('/projects/apps', projectAppsRouter);
app.use('/comment', commentAppRouter);
app.use('*', (req, res) => res.render('404'));

app.listen(process.env.PORT, () => console.log('Server listening on port: ' + process.env.PORT));