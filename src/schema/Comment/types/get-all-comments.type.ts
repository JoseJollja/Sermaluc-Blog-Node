import { type PaginatedArgs, PaginatedResponse, type SortArg } from '@src/generic-types'
import type IComment from '../comment.interface'

export class GetAllCommentsArgs {
  filters?: IComment
  pagination?: PaginatedArgs
  sort?: Record<keyof IComment, SortArg>
}

export class GetAllCommentsResponse extends PaginatedResponse<IComment> {}
