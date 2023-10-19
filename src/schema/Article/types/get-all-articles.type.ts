import { type PaginatedArgs, PaginatedResponse, type SortArg } from '@src/generic-types'
import type IArticle from '../article.interface'

export class GetAllArticlesArgs {
  filters?: IArticle
  pagination?: PaginatedArgs
  sort?: Record<keyof IArticle, SortArg>
}

export class GetAllArticlesResponse extends PaginatedResponse<IArticle> {}
