import './assets/main.css'
import '@mdi/font/css/materialdesignicons.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { auth0 } from '@/api/auth'

import App from './App.vue'
import router from './router'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { md3 } from 'vuetify/blueprints'

import PrimeVue from 'primevue/config'

const app = createApp(App)

app.use(PrimeVue);

app.use(createVuetify({
    components,
    directives,
    blueprint: md3
}));

app.use(auth0);

app.use(createPinia())
app.use(router)

app.mount('#app')
