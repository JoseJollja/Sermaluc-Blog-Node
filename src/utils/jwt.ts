import config from '@src/config'
import * as jwta from 'jsonwebtoken'

type Payload<T extends object> = T & {
  iat: number
  exp: number
}

const SECRET_KEY = config.session.secret

const sign = <T extends object>(payload: T, options?: jwta.SignOptions) => {
  return jwta.sign(payload, SECRET_KEY, options)
}

const verify = <T extends object>(token: string) => {
  try {
    return jwta.verify(token, SECRET_KEY) as Payload<T>
  } catch (err) {
    return null
  }
}

const decode = <T extends object>(token: string) => {
  return jwta.decode(token, { complete: true }) as Payload<T> | null
}

const jwt = { sign, verify, decode }

export default jwt
