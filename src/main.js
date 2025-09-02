import { createApp } from 'vue/dist/vue.esm-bundler'
import App from './App.vue'
import './style.css'

// Create and mount the Vue application
const app = createApp(App)

// Global error handler for production
app.config.errorHandler = (err, vm, info) => {
  console.error('Vue error:', err, info)
  // In production, you might want to send this to a logging service
}

app.mount('#app')
