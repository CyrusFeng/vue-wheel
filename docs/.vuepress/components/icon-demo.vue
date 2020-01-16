<template>
    <div class="container toast-demo">
        <div class="wrap">
            <!--<h2>this.$toast</h2>-->
            <p>
                <strong>预览：</strong>
            </p>
            <div class="child-container">
                <c-icon name="upload" class="icon"></c-icon>
                <c-icon name="upload" width="30px" height="30px" class="icon"></c-icon>
                <c-icon name="upload" width="30px" height="30px" rotate="true" class="icon"></c-icon>
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
  import CIcon from '../../../src/components/icon/c-icon'

  Vue.use(toastPlugin)
  export default {
    name: "icon-demo",
    components:{
      'c-icon':CIcon
    },
    data() {
      return {
        code:`<c-icon name="upload"></c-icon>
<c-icon name="upload" width="30px" height="30px"></c-icon>
<c-icon name="upload" rotate="true" width="30px" height="30px"></c-icon>`,
      }
    },
  }
</script>

<style lang="scss">
    .container{
        font-size: 16px;
        .first{
            margin-bottom: 240px;
        }
        .wrap{
            p{
                margin: 0 !important;
                line-height: 1 !important;
            }
            .child-container{
                display: flex;
                justify-content: flex-start;
                align-items: center;
                .icon{
                    margin: 20px;
                }
            }

        }
    }
</style>