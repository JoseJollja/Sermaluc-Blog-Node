import type * as t from './types'

import { CommentModel } from './comment.model'
import { UNKNOWN_ERROR } from '@src/constants'
import { setError } from '@src/utils/set-error'
import { getPagination } from '@src/utils/get-pagination'

export const CommentRepository = {
  async getAll(args: t.GetAllCommentsArgs): Promise<t.GetAllCommentsResponse> {
    const sort = args.sort ?? { createdAt: 'asc' }
    const pagination = args.pagination ?? { page: 1, pageSize: 10 }
    const { skip, take } = getPagination(pagination.page, pagination.pageSize)

    try {
      const [count, data] = await Promise.all([
        CommentModel.find(args.filters ?? {}).count(),
        CommentModel.find(args.filters ?? {})
          .populate('user')
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
  async getById(id: string): Promise<t.GetCommentByIdResponse> {
    try {
      const comment = await CommentModel.findById(id).exec()
      if (comment === null) return setError('id', 'Comment not found')

      return { ok: true, data: comment }
    } catch (error) {
      console.log({ error })
      return {
        ok: false,
        errors: UNKNOWN_ERROR
      }
    }
  },
  async create(args: t.CreateCommentArgs): Promise<t.CreateCommentResponse> {
    try {
      const comment = new CommentModel(args)
      await comment.save()

      return { ok: true, data: comment }
    } catch (error) {
      console.log({ error })

      return {
        ok: false,
        errors: UNKNOWN_ERROR
      }
    }
  },
  async update(id: string, args: t.UpdateCommentArgs): Promise<t.UpdateCommentResponse> {
    try {
      const comment = await CommentModel.findById(id)
      if (comment === null) return setError('id', 'Comment not found')

      await comment.updateOne(args).exec()

      return { ok: true, data: { ...comment, ...args } }
    } catch (error) {
      console.log({ error })

      return {
        ok: false,
        errors: UNKNOWN_ERROR
      }
    }
  },
  async delete(id: string): Promise<boolean> {
    return await CommentModel.deleteOne({ _id: id })
      .exec()
      .then(() => true)
      .catch(() => false)
  }
}
