import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'

import './assets/main.css'

const app = createApp(App)
app.use(createPinia())

import router from './router/router'
app.use(router)

app.mount('#app')
