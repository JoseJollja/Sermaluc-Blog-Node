import type { ZodError } from 'zod'
import type { FieldError } from '@src/generic-types'

export const formatZodErrors = (errors: ZodError) => {
  return errors.errors.map((error): FieldError => ({ field: String(error.path?.[0]), message: error.message }))
}
