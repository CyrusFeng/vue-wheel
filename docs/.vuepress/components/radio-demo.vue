<template>
    <div class="container toast-demo">
        <div class="wrap">
            <!--<h2>this.$toast</h2>-->
            <p>
                <strong>预览：</strong>
            </p>
            <div class="child-container">
                <div class="item">
                    <div class="header">默认</div>
                    <c-radio :options="options" @value-change="radioOnChange($event)"></c-radio>
                </div>
                <div class="item">
                    <div class="header">添加初始值</div>
                    <c-radio :options="options" @value-change="radioOnChange($event)" :default-index="1"></c-radio>
                </div>
                <div class="item">
                    <div class="header">纵向</div>
                    <c-radio :options="options" @value-change="radioOnChange($event)" :vertical="true"></c-radio>
                </div>
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
  import CRadio from '../../../src/components/radio/c-radio'

  export default {
    name: "radio-demo",
    components:{
      'c-radio':CRadio
    },
    data() {
      return {
        code:`<c-radio :options="options" @value-change="radioOnChange($event)"></c-radio>
<c-radio :options="options" @value-change="radioOnChange($event)" :default-index="1"></c-radio>
<c-radio :options="options" @value-change="radioOnChange($event)" :vertical="true"></c-radio>
options: [
  { label: '完成', value: 1 },
  { label: '未完成', value: 0 },
],
methods:{
  radioOnChange(e) {
    console.log(e)
  }
}`,
        options: [
          { label: '完成', value: 1 },
          { label: '未完成', value: 0 },
        ],
      }
    },
    methods:{
      radioOnChange(e) {
        console.log(e)
      },
    }
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
                margin-top: 20px;
                .item{
                    margin-bottom: 10px;
                    .header{
                        font-size: 16px;
                        margin-bottom: 8px;
                    }
                }
            }

        }
    }
</style>