export type Sort = 'asc' | 'desc'

export class FieldError {
  field: string
  message: string
}

export class PaginatedArgs {
  page: number = 1
  pageSize: number = 10

  constructor(page: number, pageSize: number) {
    this.page = page
    this.pageSize = pageSize
  }

  get skip(): number {
    return this.page === 1 ? 0 : this.pageSize * (this.page - 1)
  }

  get take(): number {
    return this.pageSize
  }
}

export class PaginatedResponse<TItem extends object> {
  data: TItem[]
  page: number
  pageSize: number
  totalItems: number

  constructor(data: TItem[], page: number, pageSize: number, totalItems: number) {
    this.data = data
    this.page = page
    this.pageSize = pageSize
    this.totalItems = totalItems
  }
}

export class withErrorsResponse<TItem extends object> {
  ok: boolean
  data?: TItem | undefined
  errors?: FieldError[]
}
