import { UNKNOWN_ERROR } from '@src/constants'
import type { CreateUploadArgs, CreateUploadResponse } from './types'
import { UploadModel } from './upload.model'

export const UploadRepository = {
  async create(args: CreateUploadArgs): Promise<CreateUploadResponse> {
    try {
      const upload = new UploadModel(args)
      await upload.save()

      return { ok: true, data: upload }
    } catch (error) {
      console.log('[ERROR_UPLOAD_REPOSITORY_CREATE]', error)
      return { ok: false, errors: UNKNOWN_ERROR }
    }
  },
  async delete(id: string): Promise<{ ok: boolean }> {
    return await UploadModel.deleteOne({ _id: id })
      .then(() => ({ ok: true }))
      .catch((error) => {
        console.log('[ERROR_UPLOAD_REPOSITORY_DELETE]', error)
        return { ok: false }
      })
  }
}
