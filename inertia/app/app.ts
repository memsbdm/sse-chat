import '../css/app.css'
// @ts-ignore
import { createInertiaApp } from '@inertiajs/svelte'
import { resolvePageComponent } from '@adonisjs/inertia/helpers'

const appName = import.meta.env.VITE_APP_NAME || 'AdonisJS'

createInertiaApp({
  progress: { color: '#5468FF' },
  // @ts-ignore
  title: (title) => `${title} - ${appName}`,
  // @ts-ignore
  resolve: (name) => {
    return resolvePageComponent(`../pages/${name}.svelte`, import.meta.glob('../pages/**/*.svelte'))
  },
  // @ts-ignore
  setup({ el, App, props }) {
    new App({ target: el, props, hydrate: true })
  },
})
