import factory from '@adonisjs/lucid/factories'
import User from '#auth/models/user'
import { ChatFactory } from '#database/factories/chat_factory'

export const UserFactory = factory
  .define(User, async ({ faker }) => {
    return {
      username: faker.person.firstName(),
      email: faker.internet.email().toLowerCase(),
      password: '12345678',
    }
  })
  .relation('chats', () => ChatFactory)
  .build()
