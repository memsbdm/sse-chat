import factory from '@adonisjs/lucid/factories'
import { type UserId } from '#auth/models/user'
import Chat from '#chat/models/chat'

export const ChatFactory = factory
  .define(Chat, async ({ faker }) => {
    return {
      message: faker.lorem.words({ min: 1, max: 10 }),
      userId: faker.string.uuid() as UserId,
    }
  })
  .build()
