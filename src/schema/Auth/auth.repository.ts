import argon2 from 'argon2'

import type * as t from './types'

import jwt from '@src/utils/jwt'
import logger from '@src/utils/logger'
import { UserModel } from '../User/user.model'
import { UNKNOWN_ERROR } from '@src/constants'
import { setError } from '@src/utils/set-error'

export const AuthRepository = {
  login: async (input: t.LoginInput): Promise<t.LoginResponse> => {
    try {
      const user = await UserModel.findOne({ email: input.email })
      if (user === null) return setError('credentials', 'Correo o contraseña incorrecta')

      const isValidPassword = await argon2.verify(user.password, input.password)
      if (!isValidPassword) return setError('credentials', 'Correo o contraseña incorrecta')

      const token = jwt.sign({ id: user._id }, { expiresIn: '1d' })

      return { ok: true, data: { token, user } }
    } catch (error) {
      console.log({ error })
      return { ok: false, errors: UNKNOWN_ERROR }
    }
  },
  register: async (input: t.RegisterUserInput): Promise<t.RegisterUserResponse> => {
    try {
      const hasUser = await UserModel.findOne({ email: input.email })
      if (hasUser !== null) return setError('email', 'Correo ya ha sido registrado')

      const hashPassword = await argon2.hash(input.password)
      const user = new UserModel({ ...input, password: hashPassword })

      await user.save()
      const token = jwt.sign({ id: user._id }, { expiresIn: '1d' })

      return {
        ok: true,
        data: { token, user }
      }
    } catch (error) {
      console.log({ error })
      logger.error('ERROR_REGISTER')
      return { ok: false, errors: UNKNOWN_ERROR }
    }
  },
  me: async (id: string): Promise<t.MeResponse> => {
    try {
      const user = await UserModel.findById(id)
      if (user === null) return setError('user', 'Usuario no encontrado')

      return { ok: true, data: user }
    } catch (error) {
      console.log({ error })
      logger.error('ERROR_ME')
      return { ok: false, errors: UNKNOWN_ERROR }
    }
  }
}
