import { createApp } from '../lib/guoba-mini-vue.esm.js'
import { App } from './App.js'

const rootContainer = document.querySelector('#app')
const app = createApp(App)
window.app = app
app.mount(rootContainer)
