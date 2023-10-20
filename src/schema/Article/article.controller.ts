import { z } from 'zod'
import { ArticleRepository } from './article.repository'
import { formatZodErrors } from '@src/utils/format-zod-errors'

import type { Response } from 'express'
import type { CustomRequest } from '@src/interface'

export const getAllArticlesController = async (req: CustomRequest, res: Response) => {
  const schema = z.object({
    sort: z.object({ createdAt: z.enum(['asc', 'desc']).optional() }).optional(),
    pagination: z.object({ page: z.number().min(1), pageSize: z.number().min(1) }).optional(),
    filters: z.object({ userId: z.string().optional() }).optional()
  })

  const parse = schema.safeParse(req.query)
  if (!parse.success) {
    res.status(400).json({
      ok: parse.success,
      errors: formatZodErrors(parse.error)
    })

    return
  }

  const response = await ArticleRepository.getAll(req.query)
  if (!response.ok) return res.status(400).json(response)

  return res.json(response)
}

export const getArticleByIdController = async (req: CustomRequest, res: Response) => {
  const response = await ArticleRepository.getById(req.params.id)
  if (!response.ok) return res.status(400).json(response)

  return res.json(response)
}

export const createArticleController = async (req: CustomRequest, res: Response) => {
  const schema = z.object({
    title: z.string().min(2).max(100),
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

  const response = await ArticleRepository.create({ ...req.body, userId: req.user?.id })
  if (!response.ok) return res.status(400).json(response)

  return res.json(response)
}

export const updateArticleController = async (req: CustomRequest, res: Response) => {
  const schema = z.object({
    title: z.string().min(2).max(100),
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

  const response = await ArticleRepository.update(req.params.id, req.body)
  if (!response.ok) return res.status(400).json(response)

  return res.json(response)
}

export const deleteArticleController = async (req: CustomRequest, res: Response) => {
  const ok = await ArticleRepository.delete(req.params.id)
  if (!ok) return res.status(400).json({ ok })

  return res.json({ ok })
}
