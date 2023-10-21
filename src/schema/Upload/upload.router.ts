import multer from 'multer'
import { Router } from 'express'
import * as path from 'node:path'
import * as crypto from 'node:crypto'
import { setError } from '@src/utils/set-error'
import { UploadRepository } from './upload.repository'

const uploadDest = path.join(__dirname, '../../../public/uploads')
const upload = multer({
  fileFilter: (_req, file, cb) => {
    // File size limit (10MB)
    const maxSize = 1024 * 1024 * 10
    if (file.size > maxSize) {
      cb(new Error('File size limit exceeded'))
      return
    }

    // File type limit (images only)
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
    if (!allowedMimeTypes.includes(file.mimetype)) {
      cb(new Error('Invalid file type'))
    } else {
      cb(null, true)
    }
  },
  storage: multer.diskStorage({
    destination: function (_req, _file, cb) {
      cb(null, uploadDest)
    },
    filename: function (_req, file, cb) {
      cb(null, crypto.randomUUID() + file.mimetype.replace('image/', '.'))
    }
  })
})

const uploadRouter = Router()

uploadRouter.post('/', upload.single('file'), async (req, res) => {
  if (req.file === undefined) {
    res.status(400).json({ ok: false, errors: setError('file', 'File not found') })
    return
  }

  // TODO: implement file resize
  // TODO: implement file compression
  const { filename, mimetype, size, originalname } = req.file

  const upload = await UploadRepository.create({ size, filename, mimetype, originalname })
  if (!upload.ok) {
    res.status(500).json(upload)
    return
  }

  res.json(upload)
})

uploadRouter.delete('/:id', async (req, res) => {
  const { id } = req.params
  const response = await UploadRepository.delete(id)
  if (!response.ok) {
    res.status(500).json(response)
    return
  }

  res.json(response)
})

export default uploadRouter
