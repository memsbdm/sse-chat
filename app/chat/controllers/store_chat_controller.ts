import type { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'
import { type UserId } from '#auth/models/user'
import { SseService } from '#core/services/sse_service'
import { ChatService } from '#chat/services/chat_service'
import { inject } from '@adonisjs/core'

export type StoreChatDto = {
  message: string
  userId: UserId
}

@inject()
export default class StoreChatController {
  constructor(
    private sseService: SseService,
    private chatService: ChatService
  ) {}
  static validator = vine.compile(
    vine.object({
      message: vine.string().minLength(1),
    })
  )

  async handle({ auth, request, response }: HttpContext) {
    const { message } = await request.validateUsing(StoreChatController.validator)
    const payload = { message, userId: auth.user!.id }
    const createdChat = await this.chatService.create(payload)
    const data = {
      ...payload,
      id: createdChat.id,
      username: auth.user!.username,
      createdAt: createdChat.createdAt.toString(),
      eventType: 'message',
    }

    this.sseService.update('/chat', data, true)
    return response.redirect().back()
  }
}
