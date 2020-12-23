const Koa = require('koa');
const fs = require('fs');
const bodyParser = require('koa-bodyparser');
const mongoose = require('mongoose');
const cors = require('koa2-cors');

const app = new Koa();

app.use(bodyParser());
//允许跨域
app.use(cors());


const dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect('mongodb://root:18827604626Lky@42.192.211.93:27017/words', dbOptions).then(
  () => {
    console.info('MongoDB is ready');
  },
  (err) => {
    console.error('connect error:', err);
  }
); //words 本地数据库名称

/*
 *加载路由中间件
 */
const router = require('./routes/router')();
app.use(router.routes()).use(router.allowedMethods());

/*启动服务器*/
app.listen(3000, () => {
  console.log('[demo] route-use-middleware is starting at port 3000');
});
