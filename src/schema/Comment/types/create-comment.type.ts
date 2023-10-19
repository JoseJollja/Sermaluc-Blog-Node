import { withErrorsResponse } from '@src/generic-types'

import type { Types } from 'mongoose'
import type IComment from '../comment.interface'

export type CreateComment = Omit<IComment, 'id' | 'createdAt' | 'updatedAt'>

export class CreateCommentResponse extends withErrorsResponse<IComment> {}

export class CreateCommentArgs implements CreateComment {
  content: string
  userId: Types.ObjectId
  articleId: Types.ObjectId
}
