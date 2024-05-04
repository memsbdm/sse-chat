import type { HttpContext } from '@adonisjs/core/http'
import { SseService } from '#core/services/sse_service'
import { inject } from '@adonisjs/core'

@inject()
export default class JoinChatController {
  constructor(private sseService: SseService) {}

  async handle({ auth, response }: HttpContext) {
    const data = {
      username: auth.user!.username,
      eventType: 'info',
      eventDetail: 'join',
    }

    this.sseService.update('/chat', data, true)
    return response.redirect().back()
  }
}
