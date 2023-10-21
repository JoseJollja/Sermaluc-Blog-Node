import { withErrorsResponse } from '@src/generic-types'

import type IUpload from '../upload.interface'

export class CreateUploadResponse extends withErrorsResponse<IUpload> {}

export class CreateUploadArgs {
  filename: string
  size: number
  mimetype: string
  originalname: string
}
