import type { HttpContext } from '@adonisjs/core/http'
import { AuthService } from '#auth/services/auth_service'
import { inject } from '@adonisjs/core'
import vine from '@vinejs/vine'
import { SseService } from '#core/services/sse_service'

export type StoreUserDto = {
  username: string
  email: string
  password: string
}

@inject()
export default class RegisterController {
  static validator = vine.compile(
    vine.object({
      username: vine
        .string()
        .minLength(4)
        .maxLength(32)
        .unique(async (db, value) => {
          const response = await db.from('users').select().where('username', value)
          return response.length === 0
        }),
      email: vine
        .string()
        .email()
        .unique(async (db, value) => {
          const response = await db.from('users').select().where('email', value)
          return response.length === 0
        }),
      password: vine.string().minLength(8).confirmed({
        confirmationField: 'passwordConfirmation',
      }),
    })
  )

  constructor(
    private authService: AuthService,
    private sseService: SseService
  ) {}

  render({ inertia }: HttpContext) {
    return inertia.render('auth/register')
  }

  async handle({ auth, request, response }: HttpContext) {
    const payload = await request.validateUsing(RegisterController.validator)
    const user = await this.authService.register(payload)
    await auth.use('web').login(user)

    const token = await this.sseService.computeToken({
      mercure: { subscribe: ['/chat'] },
    })

    return response
      .plainCookie('mercureAuthorization', token, { encode: false })
      .redirect()
      .toPath('/')
  }
}
