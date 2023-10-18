import { withErrorsResponse } from '@src/generic-types'

import type IUser from '../user.interface'
import type { UserRole, UserStatus } from '../user.enums'

type RegisterUser = Omit<IUser, 'id' | 'createdAt' | 'updatedAt'>

export class RegisterUserInput implements RegisterUser {
  name: string
  email: string
  lastname: string
  password: string
  rol: UserRole
  status: UserStatus

  constructor({ name, email, lastname, password, rol, status }: RegisterUser) {
    this.name = name
    this.email = email
    this.lastname = lastname
    this.password = password
    this.rol = rol
    this.status = status
  }
}

export class RegisterUserResponse extends withErrorsResponse<IUser> {}