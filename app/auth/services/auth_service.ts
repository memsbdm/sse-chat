import { inject } from '@adonisjs/core'
import { UserRepository } from '#auth/repositories/user_repository'
import { StoreUserDto } from '#auth/controllers/register_controller'

@inject()
export class AuthService {
  constructor(private repository: UserRepository) {}

  attempt(uid: string, password: string) {
    return this.repository.verifyCredentials(uid, password)
  }

  register(user: StoreUserDto) {
    return this.repository.store(user)
  }
}
