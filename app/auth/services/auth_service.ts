import { inject } from '@adonisjs/core'
import { UserRepository } from '#auth/repositories/user_repository'

@inject()
export class AuthService {
  constructor(private repository: UserRepository) {}

  async attempt(email: string, password: string) {
    return this.repository.verifyCredentials(email, password)
  }
}