//载入配置文件
var config = require('./config'),
    //载入express
    express = require('express'),
    //日志中间件
    morgan = require('morgan'),
    //内容压缩
    compress = require('compression'),
    //body 数据处理中间件
    bodyParser = require('body-parser'),
    //提供HTTP协议DELETE PUT方法支持
    methodOverride = require('method-override'),
    //引入并定义session
    session = require('express-session'),
    //引入passport
    passport = require('passport');

module.exports = function () {
    var app = express();

    if(process.env.NODE_ENV === 'development'){
        //如果系统环境是测试环境,app加载morgan
        app.use(morgan('dev'));
    }else if(process.env.NODE_ENV === 'production'){
        //如果系统环境是生产环境,app进行内容压缩
        app.use(compress());
    }

    //表单数据支持
    app.use(bodyParser.urlencoded({extended: true}));
    //JSON数据支持
    app.use(bodyParser.json());
    //DELETE PUT 方法支持
    app.use(methodOverride());

    //定义session设置
    app.use(session({
        saveUninitialized: true,
        resave: true,
        secret: config.sessionSecret
    }));

    //设置views目录
    app.set('views', './app/views');
    //设置view引擎为ejs
    app.set('view engine', 'ejs');

    //启动passport中间件
    app.use(passport.initialize());
    //跟踪session中间件
    app.use(passport.session());

    //载入index路由并实例化
    require('../app/routes/index.server.routes.js')(app);
    //载入users路由并实例化
    require('../app/routes/user.server.routes')(app);

    //设置静态文件路径
    app.use(express.static('./public'));

    return app;
};
