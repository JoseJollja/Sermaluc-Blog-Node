export default interface IUpload {
  id: string
  filename: string
  size: number
  mimetype: string
  originalname: string
  createdAt: Date
  updatedAt: Date
}
