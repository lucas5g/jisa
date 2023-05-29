import { Request, Response, Router } from 'express'

import { AuthController } from './controllers/AuthController'
import { GameController } from './controllers/GameController'
import { GroupController } from './controllers/GroupController'
import { ModalityController } from './controllers/ModalityController'
import { PlaceController } from './controllers/PlaceController'
import { ProjectController } from './controllers/ProjectController'
import { StudentController } from './controllers/StudentController'
import { TeamController } from './controllers/TeamController'
import { UserController } from './controllers/UserController'

import { auth } from './utils/auth'
import { errors } from './utils/errors'
import { ConfigController } from './controllers/ConfigController'

export const routes = Router()

/**
 * Default
 */
routes.get('/', (req:Request, res:Response) => res.json({api: 'Api release 2023-03-22'}))
routes.post('/login', AuthController.login)
routes.get('/clear-caches', ConfigController.clearCaches)

/**
 * Middleawares
 */
routes.use(auth)


/**
 * Users
 */
routes.get('/users', UserController.index)
routes.get('/users/:id', UserController.show)
routes.post('/users', UserController.create)
routes.put('/users/:id', UserController.update)
routes.delete('/users/:id', UserController.delete)

/**
 * Groups
 */
routes.get('/groups', GroupController.index)
routes.get('/groups/:id', GroupController.show)
routes.post('/groups', GroupController.create)
routes.put('/groups/:id', GroupController.update)
routes.delete('/groups/:id',GroupController.delete)

/**
 * Modalities
 */
routes.get('/modalities', ModalityController.index)
routes.get('/modalities/:id', ModalityController.show)
routes.post('/modalities', ModalityController.create)
routes.put('/modalities/:id', ModalityController.update)
routes.delete('/modalities/:id',ModalityController.delete)

/**
 * Places
 */
routes.get('/places', PlaceController.index)
routes.get('/places/:id', PlaceController.show)
routes.post('/places', PlaceController.create)
routes.put('/places/:id', PlaceController.update)
routes.delete('/places/:id',PlaceController.delete)

/**
 * Students
 */
routes.get('/students', StudentController.index)
// routes.get('/students/:id', StudentController.show)
// routes.post('/students', StudentController.create)
// routes.put('/students/:id', StudentController.update)
// routes.delete('/students/:id',StudentController.delete)

/**
 * Games
 */
routes.get('/games', GameController.index)
routes.get('/games/:id', GameController.show)
routes.post('/games', GameController.create)
routes.put('/games/:id', GameController.update)
routes.delete('/games/:id',GameController.delete)


/**
 * Projects
 */
routes.get('/projects', ProjectController.index)


/**
 * Teams
 */
routes.get('/teams', TeamController.index)
routes.get('/teams/:id', TeamController.show)
routes.post('/teams', TeamController.create)
routes.put('/teams/:id', TeamController.update)
routes.delete('/teams/:id',TeamController.delete)


/**
 * Auth
 */
routes.get('/me', AuthController.me)

routes.use(errors)


