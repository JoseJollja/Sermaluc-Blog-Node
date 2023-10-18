import { Router } from 'express'

import userRouter from '@src/schema/User/user.router'
import authRouter from '@src/schema/Auth/auth.router'

const rootRouter = Router()

rootRouter.use('/auth', authRouter)
rootRouter.use('/users', userRouter)

export default rootRouter
