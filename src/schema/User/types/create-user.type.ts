import { withErrorsResponse } from '@src/generic-types'

import type IUser from '../user.interface'
import type { UserRole, UserStatus } from '../user.enums'

type CreateUser = Omit<IUser, 'id' | 'createdAt' | 'updatedAt'>

export class CreateUserInput implements CreateUser {
  name: string
  email: string
  lastname: string
  password: string
  rol: UserRole
  status: UserStatus

  constructor({ name, email, lastname, password, rol, status }: CreateUser) {
    this.name = name
    this.email = email
    this.lastname = lastname
    this.password = password
    this.rol = rol
    this.status = status
  }
}

export class CreateUserResponse extends withErrorsResponse<IUser> {}
