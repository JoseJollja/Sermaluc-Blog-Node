import { PaginatedArgs, PaginatedResponse, type Sort } from '@src/generic-types'

import type { UserModel } from '../user.model'
import type { UserRole, UserStatus } from '../user.enums'

export class GetAllUsersFilters {
  rol?: UserRole
  status?: UserStatus
}

export class GetAllUsersArgs {
  sort: Sort
  pagination: PaginatedArgs
  filters?: GetAllUsersFilters

  constructor(sort: Sort, pagination: PaginatedArgs, filters?: GetAllUsersFilters) {
    this.sort = sort
    this.filters = filters
    this.pagination = new PaginatedArgs(pagination.page, pagination.pageSize)
  }
}

export class GetAllUsersResponse extends PaginatedResponse<typeof UserModel> {}
