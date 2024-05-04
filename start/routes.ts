/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
const ListChatsController = () => import('#chat/controllers/list_chats_controller')
const LogoutController = () => import('#auth/controllers/logout_controller')
const RegisterController = () => import('#auth/controllers/register_controller')
const LoginController = () => import('#auth/controllers/login_controller')

router.on('/').renderInertia('home', { version: 6 }).middleware(middleware.auth())

/*
 * Auth routes
 */

router
  .group(() => {
    router.get('/login', [LoginController, 'render'])
    router.post('/auth/login', [LoginController])
    router.get('/register', [RegisterController, 'render'])
    router.post('/auth/register', [RegisterController])
  })
  .middleware(middleware.guest())

router.delete('/auth/logout', [LogoutController]).middleware(middleware.auth())

/*
 * Chat routes
 */

router
  .group(() => {
    router.get('/chatroom', [ListChatsController, 'render'])
    router.post('/fetch', [ListChatsController])
  })
  .middleware(middleware.auth())
