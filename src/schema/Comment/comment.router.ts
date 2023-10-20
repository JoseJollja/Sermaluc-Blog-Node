import { Router } from 'express'
import * as controllers from './comment.controller'
import authChecker from '@src/middlewares/auth-checker.middleware'

const commentRouter = Router()

commentRouter.get('/', controllers.getAllCommentsController)
commentRouter.get('/:id', controllers.getCommentByIdController)
commentRouter.post('/', authChecker, controllers.createCommentController)
commentRouter.put('/:id', authChecker, controllers.updateCommentController)
commentRouter.delete('/:id', authChecker, controllers.deleteCommentController)

export default commentRouter
