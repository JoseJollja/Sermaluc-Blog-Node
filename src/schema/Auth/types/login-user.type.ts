import { withErrorsResponse } from '@src/generic-types'

import type IUser from '@src/schema/User/user.interface'

export class LoginData {
  token: string
  user: IUser
}

export class LoginResponse extends withErrorsResponse<LoginData> {}

export class LoginInput {
  email: string
  password: string
}
