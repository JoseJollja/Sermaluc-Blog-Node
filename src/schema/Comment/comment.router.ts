import { Router } from 'express'
import * as controllers from './comment.controller'

const commentRouter = Router()

commentRouter.get('/', controllers.getAllCommentsController)
commentRouter.get('/:id', controllers.getCommentByIdController)
commentRouter.post('/', controllers.createCommentController)
commentRouter.put('/:id', controllers.updateCommentController)
commentRouter.delete('/:id', controllers.deleteCommentController)

export default commentRouter
