import { createApp } from 'vue'
import router from './router'
import App from './App.vue'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min'

const app = createApp(App)
app.use(router)
app.mount('#app')// implementasikan pada element engan id app
