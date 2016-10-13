//载入passport
var passport = require('passport'),
//载入passport-local
    localStrategy = require('passport-local').Strategy,
//载入User
    User = require('mongoose').model('User');

module.exports = function () {
    //passport使用本地用户名密码验证方式
    passport.use(new localStrategy(function (username, password, done) {
        User.findOne({
            username: username
        }, function (err, user) {
            if (err) {
                return done(err);
            }

            //未找到用户
            if (!user) {
                return done(null, false, {
                    message: 'Unkown user'
                });
            }

            //密码错误
            if (!user.authenticate(password)) {
                return done(null, false, {
                    message: 'Invalid password'
                });
            }

            //用户验证成功
            return done(null, user);
        });
    }));
};
