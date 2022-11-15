const mongoose = require('mongoose');
 const Schema = mongoose.Schema;

 const userSchema = new Schema({
    name: {type: String},
    email: {type: String, unique : true},
    password: {type: String}
 }, {timestamps : true})

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;