//载入user控制器
var users = require('../../app/controllers/user.server.controller');

module.exports = function (app) {
    //设置/users路由
    app.route('/users')
        //post方法用于新建用户
        .post(users.creat)
        //get方法获取用户列表
        .get(users.list);

    app.route('/users/:userId')
        .get(users.read);

    //定义中间件生成req.user对象,在任何userId参数被其他中间件调用前执行
    app.param('userId', users.userByID);
};
