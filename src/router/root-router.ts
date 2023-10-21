import { Router } from 'express'

import authRouter from '@src/schema/Auth/auth.router'
import uploadRouter from '@src/schema/Upload/upload.router'
import commentRouter from '@src/schema/Comment/comment.router'
import articleRouter from '@src/schema/Article/article.router'
import authChecker from '@src/middlewares/auth-checker.middleware'

const rootRouter = Router()

rootRouter.use('/auth', authRouter)
rootRouter.use('/articles', articleRouter)
rootRouter.use('/comments', commentRouter)
rootRouter.use('/uploads', authChecker, uploadRouter)

export default rootRouter
