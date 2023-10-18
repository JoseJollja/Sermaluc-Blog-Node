import argon2 from 'argon2'

import * as t from './types'

import logger from '@src/utils/logger'
import { UserModel } from './user.model'
import { UNKNOWN_ERROR } from '@src/constants'
import { setError } from '@src/utils/set-error'

export const UserRepository = {
  getAllUsers: async (args: t.GetAllUsersArgs): Promise<t.GetAllUsersResponse> => {
    const options: Partial<t.GetAllUsersArgs['filters']> = {}
    const { sort, filters, pagination } = new t.GetAllUsersArgs(args.sort, args.pagination, args.filters)

    if (typeof filters?.rol === 'string') options.rol = filters.rol
    if (typeof filters?.status === 'string') options.status = filters.status

    try {
      const [count, users] = await Promise.all([
        UserModel.find(options).count(),
        UserModel.find(options).skip(pagination.skip).limit(pagination.take).sort({ createdAt: sort }).exec()
      ])

      console.log({ users })

      return { data: [], page: pagination.page, pageSize: pagination.pageSize, totalItems: count }
    } catch (error) {
      console.log({ error })
      return { data: [], page: pagination.page, pageSize: pagination.pageSize, totalItems: 0 }
    }
  },
  createUser: async (input: t.CreateUserInput): Promise<t.CreateUserResponse> => {
    const args = new t.CreateUserInput(input)

    try {
      const hasUser = await UserModel.findOne({ email: args.email })
      if (hasUser === null) return setError('email', 'Correo ya ha sido registrado')

      const hashPassword = await argon2.hash(input.password)
      const user = new UserModel({ ...input, password: hashPassword })

      await user.save()

      return { data: user }
    } catch (error) {
      console.log({ error })
      logger.error('ERROR_REGISTER')
      return { errors: UNKNOWN_ERROR }
    }
  },
  updateUser: async (input: t.UpdateUserInput): Promise<t.UpdateUserResponse> => {
    const args = new t.UpdateUserInput(input)

    try {
      const { id, ...user } = args
      const oldUser = await UserModel.findOne({ _id: id })
      if (oldUser === null) return setError('id', 'Usuario no existe')

      await UserModel.updateOne({ _id: id }, user)

      return { data: { ...oldUser.toJSON(), ...input } }
    } catch (error) {
      console.log({ error })
      return { errors: UNKNOWN_ERROR }
    }
  },
  deleteUser: async (input: t.DeleteUserInput): Promise<boolean> => {
    const args = new t.DeleteUserInput(input)

    try {
      await UserModel.deleteOne({ _id: args.id })
      return true
    } catch (error) {
      console.log({ error })
      return false
    }
  },
  login: async (input: t.LoginInput): Promise<t.LoginResponse> => {
    const args = new t.LoginInput(input)

    try {
      const user = await UserModel.findOne({ email: args.email })
      if (user === null) return setError('email', 'Correo o contraseña incorrecta')

      const isValidPassword = await argon2.verify(user.password, args.password)
      if (!isValidPassword) return setError('email', 'Correo o contraseña incorrecta')

      return { data: user }
    } catch (error) {
      console.log({ error })
      return { errors: UNKNOWN_ERROR }
    }
  },
  register: async (input: t.RegisterUserInput): Promise<t.RegisterUserResponse> => {
    const args = new t.RegisterUserInput(input)

    try {
      const hasUser = await UserModel.findOne({ email: args.email })
      if (hasUser === null) return setError('email', 'Correo ya ha sido registrado')

      const hashPassword = await argon2.hash(input.password)
      const user = new UserModel({ ...input, password: hashPassword })

      await user.save()

      return { data: user }
    } catch (error) {
      console.log({ error })
      logger.error('ERROR_REGISTER')
      return { errors: UNKNOWN_ERROR }
    }
  }
}
