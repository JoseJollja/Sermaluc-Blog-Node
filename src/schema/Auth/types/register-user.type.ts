import { withErrorsResponse } from '@src/generic-types'

import type IUser from '@src/schema/User/user.interface'
import type { UserRole, UserStatus } from '@src/schema/User/user.enums'

type RegisterUser = Omit<IUser, 'id' | 'createdAt' | 'updatedAt'>

export class RegisterUserInput implements RegisterUser {
  name: string
  email: string
  lastname: string
  password: string
  rol: UserRole
  status: UserStatus
}

export class RegisterUserData {
  token: string
  user: IUser
}

export class RegisterUserResponse extends withErrorsResponse<RegisterUserData> {}
