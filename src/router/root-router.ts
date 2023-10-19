import { Router } from 'express'

import authRouter from '@src/schema/Auth/auth.router'
import commentRouter from '@src/schema/Comment/comment.router'
import articleRouter from '@src/schema/Article/article.router'

import authChecker from '@src/middlewares/auth-checker.middleware'

const rootRouter = Router()

rootRouter.use('/auth', authRouter)
rootRouter.use('/articles', authChecker, articleRouter)
rootRouter.use('/comments', authChecker, commentRouter)

export default rootRouter
