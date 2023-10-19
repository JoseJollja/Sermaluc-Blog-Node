import { z } from 'zod'

import { CommentRepository } from './comment.repository'
import { formatZodErrors } from '@src/utils/format-zod-errors'

import type { Response } from 'express'
import type { CustomRequest } from '@src/interface'

export const getAllCommentsController = async (req: CustomRequest, res: Response) => {
  const schema = z.object({
    sort: z.object({ createdAt: z.enum(['asc', 'desc']).optional() }).optional(),
    pagination: z.object({ page: z.number().min(1), pageSize: z.number().min(1) }).optional(),
    filters: z.object({ articleId: z.string().optional() }).optional()
  })

  const parse = schema.safeParse(req.body)
  if (!parse.success) {
    res.status(400).json({
      ok: parse.success,
      errors: formatZodErrors(parse.error)
    })

    return
  }

  const response = await CommentRepository.getAll(req.body)
  if (!response.ok) return res.status(400).json(response)

  return res.json(response)
}

export const getCommentByIdController = async (req: CustomRequest, res: Response) => {
  const response = await CommentRepository.getById(req.params.id)
  if (!response.ok) return res.status(400).json(response)

  return res.json(response)
}

export const createCommentController = async (req: CustomRequest, res: Response) => {
  const schema = z.object({
    content: z.string().min(2),
    articleId: z.string().min(2)
  })

  const parse = schema.safeParse(req.body)
  if (!parse.success) {
    res.status(400).json({
      ok: parse.success,
      errors: formatZodErrors(parse.error)
    })

    return
  }

  const response = await CommentRepository.create({ ...req.body, userId: req.user?.id })
  if (!response.ok) return res.status(400).json(response)

  return res.json(response)
}

export const updateCommentController = async (req: CustomRequest, res: Response) => {
  const schema = z.object({
    content: z.string().min(2)
  })

  const parse = schema.safeParse(req.body)
  if (!parse.success) {
    res.status(400).json({
      ok: parse.success,
      errors: formatZodErrors(parse.error)
    })

    return
  }

  const response = await CommentRepository.update(req.params.id, req.body)
  if (!response.ok) return res.status(400).json(response)

  return res.json(response)
}

export const deleteCommentController = async (req: CustomRequest, res: Response) => {
  const ok = await CommentRepository.delete(req.params.id)
  if (ok) return res.status(400).json({ ok })

  return res.json({ ok })
}
