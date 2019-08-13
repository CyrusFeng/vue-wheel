<template>
    <div>
        <h2>支持设置是否自动播放、播放时间、播放顺序</h2>
        <p>
            <strong>预览：</strong>
        </p>
        <c-slides :selected.sync="selected" :reserve="reserve" :autoPlayDelay="2000" :autoPlay="true">
            <c-slides-item name="1">
                <div class="box">1</div>
            </c-slides-item>
            <c-slides-item name="2">
                <div class="box">2</div>
            </c-slides-item>
            <c-slides-item name="3">
                <div class="box">3</div>
            </c-slides-item>
        </c-slides>
        <p>
            <strong>代码：</strong>
        </p>
        <pre><code>{{code}}</code></pre>
    </div>
</template>

<script>
  import CIcon from '../../../src/components/c-icon'
  import CSlides from '../../../src/components/c-slides'
  import CSlidesItem from '../../../src/components/c-slides-item'
  export default {
    name: "slides-demo",
    components: {
      'c-icon': CIcon,
      'c-slides': CSlides,
      'c-slides-item': CSlidesItem
    },
    data() {
      return {
        selected: '1',
        reserve: false,
        code:`<c-slides :selected.sync="selected" :reserve="reserve" :autoPlayDelay="2000" :autoPlay="true">
    <c-slides-item name="1">
        <div class="box">1</div>
    </c-slides-item>
    <c-slides-item name="2">
        <div class="box">2</div>
    </c-slides-item>
    <c-slides-item name="3">
        <div class="box">3</div>
    </c-slides-item>
</c-slides>`
      }
    },
  }
</script>

<style lang="scss" scoped>
    * {
        /*font-size: 16px;*/
    }

    .box {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 300px;
        background-color: #666666;
    }
</style>