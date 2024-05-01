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
const LoginController = () => import('#auth/controllers/login_controller')

/*
 * Auth routes
 */

router
  .group(() => {
    router.get('/login', [LoginController, 'render'])
    router.post('/auth/login', [LoginController])
  })
  .middleware(middleware.guest())

/*
 * Chat routes
 */

router.on('/').renderInertia('home', { version: 6 }).middleware(middleware.auth())
