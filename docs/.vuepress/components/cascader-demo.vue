<template>
    <div class="container">
        <h2>层层获取数据</h2>
        <p>
            <strong>预览：</strong>
        </p>
        <div class="wrap">
            <div>
                <c-cascader :complete-source="completeSource" :load-data="loadData"></c-cascader>
            </div>
        </div>
        <p>
            <strong>代码：</strong>
        </p>
        <pre><code>{{code}}</code></pre>
    </div>

</template>

<script>
  import CIcon from '../../../src/components/c-icon'
  import CCascader from '../../../src/components/c-cascader'
  import db from '../../../tests/fixtrues/region'

  export default {
    name: "demo-cascader",
    components: {
      'c-icon': CIcon,
      'c-cascader': CCascader,
    },
    data() {
      return {
        completeSource: [],
        code: `<c-cascader :complete-source="completeSource" :load-data="loadData"></c-cascader>
created() {
  this.ajax(0).then((result) => {
    this.completeSource = result
  })
},
methods: {
  ajax(parentId = 0) {
    return new Promise((resolve, reject) => {
      //模拟ajax请求
      setTimeout(() => {
        let result = db.filter((item) => item.parentId === parentId)
        resolve(result)
      }, 1000)

    })
  },
  loadData(lastItem, callback) {
    this.ajax(lastItem.id).then(callback)
  },
}`
      }
    },
    created() {
      this.ajax(0).then((result) => {
        this.completeSource = result
      })
    },
    methods: {
      ajax(parentId = 0) {
        return new Promise((resolve, reject) => {
          //模拟ajax请求
          setTimeout(() => {
            let result = db.filter((item) => item.parentId === parentId)
            resolve(result)
          }, 1000)

        })
      },
      loadData(lastItem, callback) {
        this.ajax(lastItem.id).then(callback)
      },
    }
  }

</script>

<style scoped lang="scss">
    /*@import "../../../src/reset.css";*/
    .container {
        /*font-size: 16px;*/
    }

    .wrap {
        > * {
            margin-bottom: 100px;
        }

    }
    ul{
        margin: 0;
        padding: 0;
    }
</style>