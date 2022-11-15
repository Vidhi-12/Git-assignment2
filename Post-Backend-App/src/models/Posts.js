const mongoose = require('mongoose');
 const Schema = mongoose.Schema;

 const postSchema = new Schema({
    title: String, 
    body: String,
    image:String,
    user : {type : Schema.Types.ObjectId, ref: "User"}
 }, {timestamps : true})

const postModel = mongoose.model("Post", postSchema);
module.exports = postModel;
