import jwt from '@src/utils/jwt'
import { setError } from '@src/utils/set-error'
import { AuthRepository } from '@src/schema/Auth/auth.repository'

import type { CustomRequest } from '@src/interface'
import type { NextFunction, Response } from 'express'

async function authChecker(req: CustomRequest, res: Response, next: NextFunction) {
  const token = req.headers.authorization ?? null

  if (token === null || (token !== null && !token.startsWith('Bearer '))) {
    const error = setError('auth', 'Unauthorized')
    res.status(401).json(error)
    return
  }

  const payload = jwt.verify<{ id: string }>(token.split(' ')[1])
  if (payload === null) {
    const error = setError('auth', 'Unauthorized')
    res.status(401).json(error)
    return
  }

  const response = await AuthRepository.me(payload.id)
  if (!response.ok) {
    const error = setError('auth', 'Forbidden')
    res.status(403).json(error)
    return
  }

  req.user = response.data

  next()
}

export default authChecker
