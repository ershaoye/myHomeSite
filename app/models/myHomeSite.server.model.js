var mongoose = require('mongoose'),
    crypto = require('crypto'),
    Schema = mongoose.Schema;

//定义userSchema
var userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        match: [/.+\@.+\..+/, 'Please fill a valid e-mail address']
    },
    username: {
        type: String,
        unique: true,
        required: 'Username is required',
        trim: true
    },
    password: {
        type: String,
        validate: [
            function (password) {
                return password && password.length > 6;
            }, 'Password should be longer'
        ],
        salt: {
            type: String
        },
        provider: {
            type: String,
            required: 'Provider is required'
        },
        providerId: String,
        providerData: {},
        created: {
            type: Date,
            default: Date.now
        }
    },
});

//定义视图
userSchema.virtual('fullName')
    .get(function () {
        return this.firstName + ' ' + this.lastName;
    })
    .set(function (fullName) {
        var spliteName = fullName.split(' ');
        this.firstName = spliteName[0] || '';
        this.lastName = spliteName[1] || '';
    });

//定义预处理
userSchema.pre('save', function (next) {
    if(this.password){
        this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
        this.password = this.hashPassword(this.password);
    }

    next();
});

//密码hash值
userSchema.methods.hashPassword = function (password) {
    return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
};

//验证密码
userSchema.methods.authenticate = function (password) {
    return this.password === this.hashPassword(password);
};

userSchema.statics.findUniqueUsername = function (username, suffix, callback) {
    var _this = this;
    var passibleUsername = username + (suffix || '');
    _this.findOne({
        username: passibleUsername
    }, function (err, user) {
        if(!err){
            if(!user){
                callback(passibleUsername)
            } else {
                return _this.findUniqueUsername(username, (suffix || 0) + 1, callback);
            }
        } else {
            callback(null);
        }
    });
};

userSchema.set('toJSON', {
    getters: true,
    virtuals: true
});

mongoose.model('User', userSchema);