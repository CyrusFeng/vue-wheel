<template>
    <div class="container">
        <!--<h2>支持设置弹出位置、触发事件</h2>-->
        <p>
            <strong>预览：</strong>
        </p>
        <div class="wrap">
            <c-popover position="left" event-type="click" style="margin: 50px">
                <c-button>点击弹出</c-button>
                <template slot="pop">
                    弹出内容
                </template>
            </c-popover>
            <c-popover position="right" event-type="click">
                <c-button>点击弹出</c-button>
                <template slot="pop">
                    弹出内容
                </template>
            </c-popover>
            <br>
            <c-popover position="top" event-type="hover" style="margin: 50px">
                <c-button>hover弹出</c-button>
                <template slot="pop">
                    弹出内容
                </template>
            </c-popover>
            <c-popover position="bottom" event-type="hover">
                <c-button>hover弹出</c-button>
                <template slot="pop">
                    弹出内容
                </template>
            </c-popover>
        </div>
        <p>
            <strong>代码：</strong>
        </p>
        <pre><code>{{code}}</code></pre>
    </div>
</template>

<script>
  import CPopover from '../../../src/components/popover/c-popover'
  import CButton from '../../../src/components/button/c-button'
  export default {
    name: "popover-demo",
    components: {
      'c-popover': CPopover,
      'c-button': CButton,
    },
    data() {
      return {
        code:`<c-popover position="left" event-type="click">
   <c-button>点击弹出</c-button>
    <template slot="pop">
        弹出内容
    </template>
</c-popover>
<c-popover position="top" event-type="hover">
    <c-button>hover弹出</c-button>
    <template slot="pop">
        弹出内容
    </template>
</c-popover>
<c-popover position="right" event-type="click">
    <c-button>点击弹出</c-button>
    <template slot="pop">
        点击弹出内容
    </template>
</c-popover>
<c-popover position="bottom" event-type="hover">
    <c-button>hover弹出</c-button>
    <template slot="pop">
        hover弹出内容
    </template>
</c-popover>`,
      }
    },
  }
</script>

<style scoped lang="scss">
    .container{
        /*font-size: 16px;*/
    }
    code{
        font-size: 14px;
    }
</style>