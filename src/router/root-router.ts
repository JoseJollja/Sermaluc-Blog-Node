import { Router } from 'express'

import authRouter from '@src/schema/Auth/auth.router'
import commentRouter from '@src/schema/Comment/comment.router'
import articleRouter from '@src/schema/Article/article.router'

const rootRouter = Router()

rootRouter.use('/auth', authRouter)
rootRouter.use('/articles', articleRouter)
rootRouter.use('/comments', commentRouter)

export default rootRouter
