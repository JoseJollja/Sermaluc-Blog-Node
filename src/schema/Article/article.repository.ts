import type * as t from './types'

import { ArticleModel } from './article.model'
import { UNKNOWN_ERROR } from '@src/constants'
import { setError } from '@src/utils/set-error'
import { getPagination } from '@src/utils/get-pagination'

export const ArticleRepository = {
  async getAll(args: t.GetAllArticlesArgs): Promise<t.GetAllArticlesResponse> {
    const sort = args.sort ?? { createdAt: 'asc' }
    const pagination = args.pagination ?? { page: 1, pageSize: 10 }
    const { skip, take } = getPagination(pagination.page, pagination.pageSize)

    try {
      const [count, data] = await Promise.all([
        ArticleModel.find(args.filters ?? {}).count(),
        ArticleModel.find(args.filters ?? {})
          .populate('user')
          .populate('photo')
          .skip(skip)
          .limit(take)
          .sort(sort)
          .exec()
      ])

      return {
        ok: true,
        data,
        meta: {
          totalItems: count,
          page: pagination.page,
          pageSize: pagination.pageSize
        }
      }
    } catch (error) {
      console.log({ error })
      return {
        ok: false,
        errors: UNKNOWN_ERROR
      }
    }
  },
  async getById(id: string): Promise<t.GetArticleByIdResponse> {
    try {
      const article = await ArticleModel.findById(id).populate('user').populate('photo').exec()
      if (article === null) return setError('id', 'Article not found')

      return { ok: true, data: article }
    } catch (error) {
      console.log({ error })
      return {
        ok: false,
        errors: UNKNOWN_ERROR
      }
    }
  },
  async create(args: t.CreateArticleArgs): Promise<t.CreateArticleResponse> {
    try {
      const article = new ArticleModel(args)
      await article.save()

      return { ok: true, data: article }
    } catch (error) {
      console.log({ error })

      if (error.code === 11000 && Boolean(error?.keyPattern?.title)) {
        return setError('title', 'Title already exists')
      }

      return {
        ok: false,
        errors: UNKNOWN_ERROR
      }
    }
  },
  async update(id: string, args: t.UpdateArticleArgs): Promise<t.UpdateArticleResponse> {
    try {
      const article = await ArticleModel.findById(id)
      if (article === null) return setError('id', 'Article not found')

      await article.updateOne(args).exec()

      return { ok: true, data: article }
    } catch (error) {
      console.log({ error })

      if (error.code === 11000 && Boolean(error?.keyPattern?.title)) {
        return setError('title', 'Title already exists')
      }
      return {
        ok: false,
        errors: UNKNOWN_ERROR
      }
    }
  },
  async delete(id: string): Promise<boolean> {
    return await ArticleModel.deleteOne({ _id: id })
      .exec()
      .then(() => true)
      .catch(() => false)
  }
}
