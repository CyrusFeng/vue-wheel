import Toast from './c-toast'

// 声明一个当前的toast变量，用于控制toast在页面上被重复生成的情况
let currentToast = null

export default {
  install(Vue, options) {

    Vue.prototype.$toast = function (message, propsOptions) {

      // 如果当前存在toast实例，先关闭此实例
      // 关闭方法中会触发一个自定义close事件，将currentToast赋值为null
      if (currentToast) {
        currentToast.close()
      }
      let ToastConstructor = Vue.extend(Toast)
      let toast = new ToastConstructor({
        propsData: propsOptions
      })

      //给默认插槽赋值需要在$mount()之前
      toast.$slots.default = message
      toast.$mount()
      document.body.appendChild(toast.$el)

      toast.$on('close', () => {
        currentToast = null
      })

      currentToast = toast

    }
  }
}
