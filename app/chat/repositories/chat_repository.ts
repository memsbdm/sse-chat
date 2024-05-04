import { StoreChatDto } from '#chat/controllers/store_chat_controller'
import Chat from '#chat/models/chat'

export class ChatRepository {
  store(chat: StoreChatDto) {
    return Chat.create(chat)
  }
}
