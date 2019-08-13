<template>
    <div class="container">
        <div class="wrap">
            <c-pagination :totalPage="totalPage" :currentPage="currentPage" @update:currentPage="getCurrentPage"></c-pagination>
        </div>
        <pre><code>{{code}}</code></pre>
    </div>
</template>

<script>
  import CPagination from '../../../src/components/pagination'


  export default {
    name: "pagination",
    components: {
      'c-pagination': CPagination,
    },
    data() {
      return {
        code: `<c-pagination :totalPage="totalPage" :currentPage="currentPage" @update:currentPage="getCurrentPage"></c-pagination>`,
        currentPage:1,
        totalPage:10,
      }
    },
    methods:{
      getCurrentPage($event){
        this.currentPage = $event
      }
    },
  }
</script>

<style scoped lang="scss">
.container{
    font-size: 16px;
}
* {
    font-size: 16px;
}
</style>