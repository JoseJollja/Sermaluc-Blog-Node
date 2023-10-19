import { Schema, model } from 'mongoose'

import type IArticle from './article.interface'

const ArticleSchema = new Schema<IArticle>(
  {
    title: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, required: true }
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
)

ArticleSchema.virtual('user', {
  ref: 'User',
  localField: 'userId',
  foreignField: '_id',
  justOne: true
})

ArticleSchema.method('toJSON', function () {
  const { _id, ...object } = this.toObject()
  object.id = _id.toString()
  return object
})

export const ArticleModel = model('Article', ArticleSchema)
