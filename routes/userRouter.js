const Router = require('koa-router')
const userController = require('../controllers/UserController');

module.exports = () => {
  const api = new Router()
  api.get('/users', userController.getUserList)
  api.get('/user/:id', userController.getUserInfoById)
  api.get('/user/delete/:id', userController.deleteUser)
  api.post('/user/update', userController.updateUser)
  api.post('/user/add', userController.addUser)

  return api;
}
