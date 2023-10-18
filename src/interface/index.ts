import type { Request } from 'express'

import type IUser from '@src/schema/User/user.interface'

export interface CustomRequest extends Request {
  user?: IUser
}
