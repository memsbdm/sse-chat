import User from '#auth/models/user'
import { StoreUserDto } from '#auth/controllers/register_controller'

export class UserRepository {
  async verifyCredentials(uid: string, password: string) {
    try {
      const user = await User.verifyCredentials(uid, password)
      return user
    } catch (e) {
      return null
    }
  }

  store(user: StoreUserDto) {
    return User.create(user)
  }
}
