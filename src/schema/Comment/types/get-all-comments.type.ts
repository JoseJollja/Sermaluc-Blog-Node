import { type PaginatedArgs, PaginatedResponse, type SortArg } from '@src/generic-types'
import type IComment from '../comment.interface'

export class GetAllCommentsArgs {
  sort?: SortArg
  pagination?: PaginatedArgs
  filters?: IComment
}

export class GetAllCommentsResponse extends PaginatedResponse<IComment> {}
