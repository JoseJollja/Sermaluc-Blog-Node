export type SortArg = 'asc' | 'desc'

export class FieldError {
  field: string
  message: string
}

export class PaginatedArgs {
  page: number
  pageSize: number
}

export class PaginatedResponse<TItem extends object> {
  ok: boolean
  data?: TItem[]
  meta?: {
    page: number
    pageSize: number
    totalItems: number
  }

  errors?: FieldError[]
}

export class withErrorsResponse<TItem extends object> {
  ok: boolean
  errors?: FieldError[]
  data?: TItem | undefined
}
