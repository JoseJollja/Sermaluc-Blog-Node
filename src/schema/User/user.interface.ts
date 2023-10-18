import type { UserStatus, UserRole } from './user.enums'

export default interface IUser {
  id: string
  name: string
  lastname: string
  email: string
  password: string
  rol: UserRole
  status: UserStatus
  createdAt: Date
  updatedAt: Date
}
