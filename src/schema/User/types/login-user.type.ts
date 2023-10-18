import { withErrorsResponse } from '@src/generic-types'

import type IUser from '../user.interface'

export class LoginResponse extends withErrorsResponse<IUser> {}

export class LoginInput {
  email: string
  password: string

  constructor({ email, password }: LoginInput) {
    this.email = email
    this.password = password
  }
}
