import { Router } from 'express'

const userRouter = Router()

userRouter.get('/:id', (req, res) => {
  console.log('GET_USER_ID')
  const { id } = req.params
  res.json({ id })
})

userRouter.get('/', (_req, res) => {
  console.log('GET_USERS')
  res.json({ ok: true, data: [] })
})

userRouter.put('/', (_req, res) => {
  console.log('PUT_USERS')
  res.json({ ok: true, data: [] })
})

userRouter.post('/', (_req, res) => {
  console.log('POST_USERS')
  res.json({ ok: true, data: [] })
})

userRouter.delete('/:id', (req, res) => {
  console.log('DELETE_USERS')
  const { id } = req.params
  res.json({ id })
})

export default userRouter
