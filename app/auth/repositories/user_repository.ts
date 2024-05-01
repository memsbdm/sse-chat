import User from '#auth/models/user'

export class UserRepository {
  async verifyCredentials(uid: string, password: string) {
    try {
      const user = await User.verifyCredentials(uid, password)
      return user
    } catch (e) {
      return null
    }
  }
}
