const Router = require('koa-router')
const textController = require('../controllers/TextController');

module.exports = () => {
  const api = new Router()
  api.get('/texts', textController.getTextList)
  api.get('/text/:id', textController.getTextInfoById)
  api.delete('/text/delete/:id', textController.deleteText)
  api.put('/text/update', textController.updateText)
  api.post('/text/add', textController.addText)

  return api;
}
