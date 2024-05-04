import type { HttpContext } from '@adonisjs/core/http'
import Chat from '#chat/models/chat'
import vine from '@vinejs/vine'

export default class ListChatsController {
  static validator = vine.compile(
    vine.object({
      page: vine.number().positive(),
      ignoredMessages: vine.array(vine.string()),
    })
  )

  render({ inertia }: HttpContext) {
    return inertia.render('chatroom')
  }

  async handle({ request, response }: HttpContext) {
    const { page, ignoredMessages } = await request.validateUsing(ListChatsController.validator)
    const messages = await Chat.query()
      .preload('user', (query) => query.select('username'))
      .orderBy('chats.created_at', 'desc')
      .whereNotIn('chats.id', ignoredMessages)
      .paginate(page, 20)

    return response.json(messages)
  }
}
