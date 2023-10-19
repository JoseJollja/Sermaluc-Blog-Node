import type { Types } from 'mongoose'

export default interface IArticle {
  id: string
  title: string
  content: string
  userId: Types.ObjectId
  createdAt: Date
  updatedAt: Date
}
