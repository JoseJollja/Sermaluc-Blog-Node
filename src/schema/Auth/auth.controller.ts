import { z } from 'zod'
import { AuthRepository } from './auth.repository'
import { UserRole, UserStatus } from '../User/user.enums'
import { formatZodErrors } from '@src/utils/format-zod-errors'

import type { Request, Response } from 'express'
import type { CustomRequest } from '@src/interface'

export const authMeController = async (req: CustomRequest, res: Response) => {
  const hasUser = req.user !== undefined
  res.status(hasUser ? 200 : 401).json({ ok: hasUser, data: req.user ?? null })
}

export const authLoginController = async (req: Request, res: Response) => {
  const schema = z.object({
    email: z.string().email(),
    password: z.string().min(6).max(100)
  })

  const parse = schema.safeParse(req.body)
  if (!parse.success) {
    res.status(400).json({
      ok: parse.success,
      errors: formatZodErrors(parse.error)
    })

    return
  }

  const response = await AuthRepository.login(req.body)
  if (!response.ok) {
    res.status(400).json(response)
    return
  }

  res.json(response)
}

export const authRegisterController = async (req: Request, res: Response) => {
  const schema = z.object({
    name: z.string().min(2).max(100),
    lastname: z.string().min(2).max(100),
    email: z.string().email(),
    password: z.string().min(6).max(100),
    rol: z.enum([UserRole.ADMIN, UserRole.USER]),
    status: z.enum([UserStatus.ACTIVO, UserStatus.INACTIVO])
  })

  const parse = schema.safeParse(req.body)
  if (!parse.success) {
    res.status(400).json({
      ok: parse.success,
      errors: formatZodErrors(parse.error)
    })

    return
  }

  const response = await AuthRepository.register(req.body)
  if (!response.ok) {
    res.status(400).json(response)
    return
  }

  res.json(response)
}
