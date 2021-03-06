//从系统环境变量读取当前是开发环境还是生产环境
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

//引入mongoose配置
var mongoose = require('./config/mongoose'),
    //引入express配置
    express = require('./config/express'),
    //引入passport配置
    passport = require('./config/passport');

var db = mongoose(); //mongoose要最先实例化,这样才能被其他模块引用
var app = express();
var passport = passport();

app.listen(3000);
module.exports = app;

console.log('Server runnig at http://localhost:3000');
