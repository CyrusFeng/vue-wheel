<template>
    <div class="container">
        <div class="wrap">
            <c-popover position="left" event-type="click">
                弹出
                <template slot="pop">
                    弹出内容
                </template>
            </c-popover>
            <c-popover position="top" event-type="hover">
                弹出
                <template slot="pop">
                    弹出内容
                </template>
            </c-popover>
            <c-popover position="right" event-type="click">
                弹出
                <template slot="pop">
                    弹出内容
                </template>
            </c-popover>
            <c-popover position="bottom" event-type="hover">
                弹出
                <template slot="pop">
                    弹出内容
                </template>
            </c-popover>
        </div>
        <pre><code>{{code}}</code></pre>
    </div>
</template>

<script>
  import CPopover from '../../../src/components/c-popover'
  export default {
    name: "popover-demo",
    components: {
      'c-popover': CPopover,
    },
    data() {
      return {
        code:`<c-popover position="left" event-type="click">
   弹出
    <template slot="pop">
        弹出内容
    </template>
</c-popover>
<c-popover position="top" event-type="hover">
    弹出
    <template slot="pop">
        弹出内容
    </template>
</c-popover>
<c-popover position="right" event-type="click">
    弹出
    <template slot="pop">
        弹出内容
    </template>
</c-popover>
<c-popover position="bottom" event-type="hover">
    弹出
    <template slot="pop">
        弹出内容
    </template>
</c-popover>`,
      }
    },
  }
</script>

<style scoped>
    .container{
        font-size: 16px;
    }
    * {
        font-size: 16px;
    }
</style>