import Vue from 'vue'
import './cube-ui'
import App from './App.vue'

import '@/assets/css/border.css'
import '@/assets/css/common.css'

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
