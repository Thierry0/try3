import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/main.css'

import { Amplify } from 'aws-amplify';
import AmplifyVue from '@aws-amplify/ui-vue'
import awsExports from './aws-exports';
Amplify.configure(awsExports);

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(AmplifyVue)

app.mount('#app')
