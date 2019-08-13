import Vue from 'vue'
import App from './App.vue'
import Demo from "./demo.vue";
import './reset.css';
// import './icons'
import toastPlugin from './components/toast/toastPlugin'
Vue.use(toastPlugin)


Vue.config.productionTip = false

new Vue({
  render: function (h) { return h(Demo) }
}).$mount('#app')
