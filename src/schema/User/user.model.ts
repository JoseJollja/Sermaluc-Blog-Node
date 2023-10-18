import { Schema, model } from 'mongoose'

import { UserRole, UserStatus } from './user.enums'
import type IUser from './user.interface'

const UserSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  password: { type: String, required: true },
  rol: { type: String, required: true, enum: [UserRole.ADMIN, UserRole.USER] },
  status: { type: String, required: true, enum: [UserStatus.ACTIVO, UserStatus.INACTIVO] },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})

UserSchema.method('toJSON', function () {
  const { _id, password, ...object } = this.toObject()
  object.id = _id.toString()
  return object
})

export const UserModel = model('User', UserSchema)
