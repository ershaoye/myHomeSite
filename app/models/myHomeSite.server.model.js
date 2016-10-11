var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

//定义userSchema
var userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    username: String,
    password: String,
});

mongoose.model('User', userSchema);