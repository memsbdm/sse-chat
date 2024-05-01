import User from '#auth/models/user'

export class UserRepository {
  async verifyCredentials(email: string, password: string) {
    try {
      const user = await User.verifyCredentials(email, password)
      return user
    } catch (e) {
      return null
    }
  }
}
