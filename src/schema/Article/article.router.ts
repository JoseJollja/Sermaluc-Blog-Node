import { Router } from 'express'
import * as controllers from './article.controller'

const articleRouter = Router()

articleRouter.get('/', controllers.getAllArticlesController)
articleRouter.get('/:id', controllers.getArticleByIdController)
articleRouter.post('/', controllers.createArticleController)
articleRouter.put('/:id', controllers.updateArticleController)
articleRouter.delete('/:id', controllers.deleteArticleController)

export default articleRouter
