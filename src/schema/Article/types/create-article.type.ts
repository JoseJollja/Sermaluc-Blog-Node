import { withErrorsResponse } from '@src/generic-types'
import type IArticle from '../article.interface'

export class CreateArticleResponse extends withErrorsResponse<IArticle> {}

export class CreateArticleArgs {
  title: string
  content: string
  userId: string
}
