let mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const BlogPost = new Schema({
  title: String,
  birthdate: Date,
  author: mongoose.Schema.Types.ObjectId
}, {collection: 'blogs'});

module.exports = mongoose.model('BlogPost', BlogPost);