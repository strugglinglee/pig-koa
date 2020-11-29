const mongoose = require('mongoose');

// 文案的数据库模型
let TextSchema = new mongoose.Schema({
  text:String,//文字
  author:String,//作者
  origin:String,//来源
  date:String,//添加日期
  category:String//分类
});

let Text = mongoose.model('Text',TextSchema)

module.exports = Text;