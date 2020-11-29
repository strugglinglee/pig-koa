const mongoose = require('mongoose');

// 文案分类的数据库模型
let CategorySchema = new mongoose.Schema({
  name:String,
  type:String,
  date:String
});

let Category = mongoose.model('Category',CategorySchema)

module.exports = Category;