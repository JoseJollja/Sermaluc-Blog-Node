import { withErrorsResponse } from '@src/generic-types'
import type IArticle from '../article.interface'

export class GetArticleByIdResponse extends withErrorsResponse<IArticle> {}
