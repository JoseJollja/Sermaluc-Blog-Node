import { withErrorsResponse } from '@src/generic-types'

import type IUser from '../user.interface'
import type { UserRole, UserStatus } from '../user.enums'

export interface UpdateUser {
  id: string
  name: string
  email: string
  lastname: string
  rol: UserRole
  status: UserStatus
}

export class UpdateUserResponse extends withErrorsResponse<IUser> {}

export class UpdateUserInput implements UpdateUser {
  id: string
  name: string
  email: string
  lastname: string
  rol: UserRole
  status: UserStatus

  constructor({ id, name, email, lastname, rol, status }: UpdateUser) {
    this.id = id
    this.name = name
    this.email = email
    this.lastname = lastname
    this.rol = rol
    this.status = status
  }
}
