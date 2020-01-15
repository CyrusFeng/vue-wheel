<template>
    <div class="container">
        <!--<h2>支持设置当前页、总页数、省略显示</h2>-->
        <p>
            <strong>预览：</strong>
        </p>
        <div class="wrap">
            <c-pagination :totalPage="totalPage" :currentPage.sync="currentPage"></c-pagination>
        </div>
        <p>
            <strong>代码：</strong>
        </p>
        <pre><code>{{code}}</code></pre>
    </div>
</template>

<script>
  import CPagination from '../../../src/components/pagination/c-pagination'


  export default {
    name: "pagination",
    components: {
      'c-pagination': CPagination,
    },
    data() {
      return {
        code: `<c-pagination :totalPage="totalPage" :currentPage.sync="currentPage"></c-pagination>`,
        currentPage: 1,
        totalPage: 10,
      }
    },
    methods: {
      getCurrentPage($event) {
        this.currentPage = $event
      }
    },
  }
</script>

<style scoped lang="scss">
    .container {
        /*font-size: 16px;*/
    }
</style>