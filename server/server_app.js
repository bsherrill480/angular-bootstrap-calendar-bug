const express = require('express'),
    path = require('path'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    app = express();

let calledBefore = false;


module.exports = function() {
    if (!calledBefore) {

        app.set('view engine', 'pug');
        app.set('views', path.join(__dirname, '/views'));

        // uncomment after placing your favicon in /public
        //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
        app.use(logger('dev'));
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended: true}));
        app.use(cookieParser());
        app.use(express.static(path.join(__dirname, '..', 'build')));

        app.use(/.*/, function(req, res, next) {
            res.sendFile('index.html', {root: path.join(__dirname, '../../build')});
        });

        app.use(function (req, res, next) {
            var err = new Error('Not Found');
            err.status = 404;
            next(err);
        });


        app.use(function (err, req, res, next) {
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                error: err
            });
        });

        return app;
    }
};
