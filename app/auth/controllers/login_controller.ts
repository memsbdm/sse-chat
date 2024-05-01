import type { HttpContext } from '@adonisjs/core/http'
import { AuthService } from '#auth/services/auth_service'
import { inject } from '@adonisjs/core'

@inject()
export default class LoginController {
  constructor(private authService: AuthService) {}

  render({ inertia }: HttpContext) {
    return inertia.render('auth/login')
  }

  async handle({ auth, request, response, session }: HttpContext) {
    const { uid, password } = request.all()
    const user = await this.authService.attempt(uid, password)

    if (!user) {
      session.flash('errors.auth', 'Invalid credentials')
      session.flashAll()
      return response.redirect().back()
    }

    await auth.use('web').login(user)

    return response.redirect().toPath('/')
  }
}
