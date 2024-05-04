import { inject } from '@adonisjs/core'
import { ChatRepository } from '#chat/repositories/chat_repository'
import { StoreChatDto } from '#chat/controllers/store_chat_controller'

@inject()
export class ChatService {
  constructor(private repository: ChatRepository) {}

  create(chat: StoreChatDto) {
    return this.repository.store(chat)
  }
}
