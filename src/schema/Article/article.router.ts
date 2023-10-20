import { Router } from 'express'
import * as controllers from './article.controller'
import authChecker from '@src/middlewares/auth-checker.middleware'

const articleRouter = Router()

articleRouter.get('/', controllers.getAllArticlesController)
articleRouter.get('/:id', controllers.getArticleByIdController)
articleRouter.post('/', authChecker, controllers.createArticleController)
articleRouter.put('/:id', authChecker, controllers.updateArticleController)
articleRouter.delete('/:id', authChecker, controllers.deleteArticleController)

export default articleRouter
