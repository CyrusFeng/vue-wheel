<template>
    <div class="container toast-demo">
        <div class="wrap">
            <!--<h2>支持设置关闭按钮和html</h2>-->
            <p>
                <strong>预览：</strong>
            </p>
            <div>
                <c-button @click.native="showToast('点击弹出提示','top')">上方弹出</c-button>
                <c-button @click.native="showToast('点击弹出提示','middle')">中间弹出</c-button>
                <c-button @click.native="showToast('点击弹出提示','bottom')">底部弹出</c-button>
            </div>
        </div>
        <p>
            <strong>代码：</strong>
        </p>
        <pre><code>{{code}}</code></pre>
    </div>
</template>

<script>
  import Vue from 'vue'
  import toastPlugin from '../../../src/components/toast/toastPlugin'
  import CButton from '../../../src/components/button/c-button'

  Vue.use(toastPlugin)
  export default {
    name: "toast-demo",
    components:{
      'c-button':CButton
    },
    data() {
      return {
        code:`<c-button @click.native="showToast('点击弹出提示','top')">上方弹出</c-button>
<c-button @click.native="showToast('点击弹出提示','middle')">中间弹出</c-button>
<c-button @click.native="showToast('点击弹出提示','bottom')">底部弹出</c-button>
methods:{
  showToast(text,position){
    this.$toast('<i style="font-weight: bold">'+text+'</i>',{
      autoClose:false,
      // autoCloseDelay:5,
      position:position,
      closeBtn:{
        text:'关闭',
        callback:()=>{
          console.log('关闭toast')
        }
      },
      enableHtml:true
    })
  }
}`,
      }
    },
    methods:{
      showToast(text,position){
        this.$toast('<i style="font-weight: bold">'+text+'</i>',{
          autoClose:false,
          // autoCloseDelay:5,
          position:position,
          closeBtn:{
            text:'关闭',
            callback:()=>{
              console.log('关闭toast')
            }
          },
          enableHtml:true
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
    .container.toast-demo{
        /*font-size: 16px;*/
        .wrap{
            font-size: 16px;
        }
        pre{
            code{
                font-size: 14px;
            }
        }
    }
    .toast-wrap{
        z-index: 100;
    }
</style>