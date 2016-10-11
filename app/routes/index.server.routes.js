module.exports = function (app) {
    //载入index controller
    var index = require('../controllers/index.server.controller');
    
    //用index.render方法渲染根get请求
    app.get('/', index.render);
};