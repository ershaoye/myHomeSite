var config = require('./config'), //引入配置文件
    mongoose = require('mongoose');

module.exports = function () {
    var db = mongoose.connect(config.db); //配置mongoose连接信息

    require('../app/models/myHomeSite.server.model'); //载入mongooseSchema

    return db;
};
