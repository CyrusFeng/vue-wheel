import Vue from 'vue'
import App from './App.vue'
import Demo from "./demo.vue";
import './reset.css';
// import './icons'
import toastPlugin from './components/toast/toastPlugin'
import cascader from './components/cascader/index'
import datepicker from './components/datepicker/index'
import icon from './components/icon/index'
import button from './components/button/index'
import input from './components/input/index'
import nav from './components/nav/index'
import pagination from './components/pagination/index'
import popover from './components/popover/index'
import radio from './components/radio/index'
import rate from './components/rate/index'
import slide from './components/slide/index'
import tabObj from './components/tab/index'
import table from './components/table/index'
import uploader from './components/uploader/index'
Vue.use(toastPlugin)
Vue.use(cascader)
Vue.use(datepicker)
Vue.use(icon)
Vue.use(button)
Vue.use(input)
Vue.use(nav)
Vue.use(pagination)
Vue.use(popover)
Vue.use(radio)
Vue.use(rate)
Vue.use(slide.Slides)
Vue.use(slide.SlidesItem)
Vue.use(tabObj.Tabs)
Vue.use(tabObj.TabsContent)
Vue.use(tabObj.TabsContentItem)
Vue.use(tabObj.TabsNav)
Vue.use(tabObj.TabsItem)
Vue.use(table)
Vue.use(uploader)


Vue.config.productionTip = false

new Vue({
  render: function (h) { return h(Demo) }
}).$mount('#app')
