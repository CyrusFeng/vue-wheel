<template>
    <div class="container toast-demo">
        <div class="wrap">
            <h2>this.$toast</h2>
            <p>
                <strong>预览：</strong>
            </p>
            <div>
                <button @click="$toast('点击弹出提示')">上方弹出</button>
                <button @click="$toast('点击弹出提示', {position:'middle'})">中间弹出</button>
                <button @click="$toast('点击弹出提示', {position:'bottom'})">下方弹出</button>
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
  Vue.use(toastPlugin)
  export default {
    name: "toast-demo",
    data() {
      return {
        code:`.toast-wrap{
    z-index: 100;
}
<button @click="$toast('点击弹出提示')">上方弹出</button>
<button @click="$toast('点击弹出提示', {position:'middle'})">中间弹出</button>
<button @click="$toast('点击弹出提示', {position:'bottom'})">下方弹出</button>`,
      }
    },
  }
</script>

<style lang="scss">
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
        z-index: 100 !important;
    }
</style>