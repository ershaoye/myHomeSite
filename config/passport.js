//载入passport
var passport = require('passport'),
    //载入mongoose
    mongoose = require('mongoose');

module.exports = function () {
    //实例化User
    var User = mongoose.model('User');

    //passport序列化用户ID
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    //passport反序列化
    passport.deserializeUser(function (id, done) {
        User.findOne({
            _id: id
        }, '-password -salt', function (err, user) {
            done(err, user);
        });
    });

    //载入本地验证策略
    require('./strategies/local');
};
