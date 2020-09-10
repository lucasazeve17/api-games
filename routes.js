const express = require('express')
const GameController = require('./controllers/gameController/GameController')
const UserController = require('./controllers/userController/UserController')
const AuthMiddleware = require('./middleware/Auth')

const routes = express.Router()

routes.get('/games',AuthMiddleware,GameController.index)
routes.get('/games/:id',AuthMiddleware,GameController.show)
routes.post('/games',AuthMiddleware,GameController.create)
routes.put('/games/:id',AuthMiddleware,GameController.update)
routes.delete('/games/:id',AuthMiddleware,GameController.destroy)

routes.post('/users',UserController.create)
routes.post('/users/auth',UserController.auth)



module.exports = routes