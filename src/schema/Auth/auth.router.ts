import { Router } from 'express'

import authChecker from '@src/middlewares/auth-checker.middleware'
import { authLoginController, authMeController, authRegisterController } from './auth.controller'

const authRouter = Router()

authRouter.get('/me', authChecker, authMeController)

authRouter.post('/login', authLoginController)
authRouter.post('/register', authRegisterController)

export default authRouter
