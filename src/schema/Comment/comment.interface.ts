import type { Types } from 'mongoose'

export default interface IComment {
  id: string
  content: string
  userId: Types.ObjectId
  articleId: Types.ObjectId
  createdAt: Date
  updatedAt: Date
}
