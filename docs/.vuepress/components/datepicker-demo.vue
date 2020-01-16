<template>
    <div class="container toast-demo">
        <div class="wrap">
            <!--<h2>this.$toast</h2>-->
            <p>
                <strong>预览：</strong>
            </p>
            <div class="child-container">
                <c-datepicker @update:value="value=$event" :value="value"></c-datepicker>
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
  import CDatepicker from '../../../src/components/datepicker/c-datepicker'

  export default {
    name: "icon-demo",
    components:{
      'c-datepicker':CDatepicker
    },
    data() {
      return {
        code:`<c-datepicker @update:value="value=$event" :value="value"></c-datepicker>`,
        value: new Date(),
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
                margin-top: 20px;
            }

        }
    }
</style>