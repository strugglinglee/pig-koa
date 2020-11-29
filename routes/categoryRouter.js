const Router = require('koa-router')
const categoryController = require('../controllers/CategoryController');

module.exports = () => {
  const api = new Router()
  api.get('/categories', categoryController.getCategoryList)
  api.get('/category/:id', categoryController.getCategoryInfoById)
  api.delete('/category/delete/:id', categoryController.deleteCategory)
  api.put('/category/update', categoryController.updateCategory)
  api.post('/category/add', categoryController.addCategory)

  return api;
}
