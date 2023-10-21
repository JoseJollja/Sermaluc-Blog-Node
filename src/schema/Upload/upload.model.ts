import { Schema, model } from 'mongoose'

import type IUpload from './upload.interface'

const UploadSchema = new Schema<IUpload>(
  {
    filename: { type: String, required: true },
    size: { type: Number, required: true },
    mimetype: { type: String, required: true },
    originalname: { type: String, required: true }
  },
  { timestamps: true }
)

UploadSchema.method('toJSON', function () {
  const { _id, ...object } = this.toObject()
  object.id = _id.toString()
  return object
})

export const UploadModel = model('Upload', UploadSchema)
