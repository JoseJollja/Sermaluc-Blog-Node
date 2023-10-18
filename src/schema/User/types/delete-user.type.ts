export interface DeleteUser {
  id: string
}

export class DeleteUserInput implements DeleteUser {
  id: string

  constructor({ id }: DeleteUser) {
    this.id = id
  }
}
