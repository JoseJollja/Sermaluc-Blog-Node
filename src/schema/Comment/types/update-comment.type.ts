import { withErrorsResponse } from '@src/generic-types'
import type IComment from '../comment.interface'

export class UpdateCommentResponse extends withErrorsResponse<IComment> {}

export class UpdateCommentArgs {
  content: string
}
