import { withErrorsResponse } from '@src/generic-types'
import type IArticle from '../article.interface'

export class UpdateArticleResponse extends withErrorsResponse<IArticle> {}

export class UpdateArticleArgs {
  title: string
  content: string
}
