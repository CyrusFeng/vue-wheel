import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Demo from "./demo.vue";
import './reset.css'

Vue.config.productionTip = false

new Vue({
  router,
  render: function (h) { return h(Demo) }
}).$mount('#app')
