import { withErrorsResponse } from '@src/generic-types'
import type IComment from '../comment.interface'

export class GetCommentByIdResponse extends withErrorsResponse<IComment> {}
