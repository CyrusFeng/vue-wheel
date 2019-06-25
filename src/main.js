import Vue from 'vue'
import App from './App.vue'
import Demo from "./demo.vue";
import './reset.css'
import './icons'
// import './svg/cancel.svg'

Vue.config.productionTip = false

new Vue({
  render: function (h) { return h(Demo) }
}).$mount('#app')
