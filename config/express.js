var express = require('express'),
    morgan = require('morgan'), //日志中间件
    compress = require('compression'), //内容压缩
    bodyParser = require('body-parser'), //body 数据处理中间件
    methodOverride = require('method-override'); // 提供HTTP协议DELETE PUT方法支持

module.exports = function () {
    var app = express();

    if(process.env.NODE_ENV === 'development'){
        app.use(morgan('dev'));
    }else if(process.env.NODE_ENV === 'production'){
        app.use(compress());
    }

    app.use(bodyParser.urlencoded({extended: true})); //表单数据支持
    app.use(bodyParser.json()); //JSON数据支持
    app.use(methodOverride()); //DELETE PUT 方法支持

    app.set('views', './app/views'); //设置views目录
    app.set('view engine', 'ejs'); //设置view引擎为ejs


    require('../app/routes/index.server.routes.js')(app);

    app.use(express.static('./public')); //设置静态文件路径
    return app;
};
