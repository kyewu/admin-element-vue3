import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import '@unocss/reset/tailwind.css'
import 'virtual:uno.css'
import 'virtual:svg-icons-register'
import 'element-plus/theme-chalk/dark/css-vars.css'
import '@/assets/style.scss' // import after element-plus

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
