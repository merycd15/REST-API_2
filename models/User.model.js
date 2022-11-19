var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    date: Date,
    rol: String,
    schooling: String,
    phone: String,
    birthday: Date,
    collegeDegree: String,
    experiences: String,
    courses:String
})

UserSchema.plugin(mongoosePaginate)
const User = mongoose.model('User', UserSchema)

module.exports = User;