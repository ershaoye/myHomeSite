//载入用户模型
var User = require('mongoose').model('User');

//新建用户方法
exports.creat = function (req, res, next) {
    var user = new User(req.body);

    user.save(function (err) {
        if (err) {
            console.log(err);
        } else {
            res.json(user);
        }
    })
};

//获取用户列表
exports.list = function (req, res, next) {
    User.find({}, function (err, users) {
        if (err) {
            return next(err);
        } else {
            res.json(users);
        }
    });
};

//读取用户信息
exports.read = function (req, res) {
    res.json(req.user);
};

//获取指定用户信息
exports.userByID = function (req, res, next, id) {
    //通过用户ID查找用户
    User.findOne({
        _id: id
    }, function (err, user) {
        if (err) {
            return next(err);
        } else {
            //如果找到将user赋值给req对象user属性
            req.user = user;
            next();
        }
    })
};
