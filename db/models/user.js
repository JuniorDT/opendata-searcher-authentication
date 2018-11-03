const mongoose = require('mongoose');
const Records = require('./record');

const userSchema = mongoose.Schema({
    id: Number,
    name: String,
    btd: Date,
    role: String,
    password: String,
    login: String,
    email: String,
});

userSchema.methods.getRecords = function(cb) {
    return Records.find({authorId: this.id}, cb);
};

const User = mongoose.model('User', userSchema);
module.exports = User;