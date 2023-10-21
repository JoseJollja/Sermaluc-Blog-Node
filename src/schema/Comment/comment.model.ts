import { Schema, model } from 'mongoose'

import type IComment from './comment.interface'

const CommentSchema = new Schema<IComment>(
  {
    content: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, required: true },
    articleId: { type: Schema.Types.ObjectId, required: true }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
)

CommentSchema.virtual('user', {
  ref: 'User',
  localField: 'userId',
  foreignField: '_id',
  justOne: true,
  options: { select: '-password' }
})

CommentSchema.virtual('article', {
  ref: 'Article',
  localField: 'articleId',
  foreignField: '_id',
  justOne: true
})

CommentSchema.method('toJSON', function () {
  const { _id, ...object } = this.toObject()
  object.id = _id.toString()
  return object
})

const CommentModel = model('Comment', CommentSchema)

export { CommentModel, CommentSchema }
