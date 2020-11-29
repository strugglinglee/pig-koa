const Router = require('koa-router')
const api = require('./userRouter')();
const textApi = require('./textRouter')();
const categoryApi = require('./categoryRouter')();

module.exports = () => {
  // 装载所有子路由
  let router = new Router()
  router.use('/api', api.routes(), api.allowedMethods())
  router.use('/api', textApi.routes(), textApi.allowedMethods())
  router.use('/api', categoryApi.routes(), categoryApi.allowedMethods())
  return router;
}