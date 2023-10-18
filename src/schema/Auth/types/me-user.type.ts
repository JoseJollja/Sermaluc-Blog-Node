import { withErrorsResponse } from '@src/generic-types'

import type IUser from '@src/schema/User/user.interface'

export class MeResponse extends withErrorsResponse<IUser> {}
