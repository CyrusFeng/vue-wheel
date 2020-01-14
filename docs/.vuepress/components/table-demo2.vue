<template>
    <div class="container">
        <p>
            <strong>服务端排序预览：</strong>
        </p>
        <div class="wrap">
            <c-table :columns.sync="columns"
                     :data-source.sync="dataSource"
                     :selected-table-items.sync="selectedTableItems"
                     :is-frontend-sort="isFrontendSort"
                     :loading="loading"
                     @backendOrder="getOrderedList($event)"
                     height="300">
                <template slot-scope="item">
                    <a @click="edit(item)">编辑</a>
                </template>
            </c-table>
        </div>
        <p>
            <strong>代码：</strong>
        </p>
        <pre><code>{{code}}</code></pre>
    </div>
</template>

<script>
  import CIcon from '../../../src/components/icon/c-icon'
  import CTable from '../../../src/components/table/c-table'

  export default {
    name: "table-demo",
    components: {
      'c-icon': CIcon,
      'c-table': CTable,
    },
    data() {
      return {
        code: `<c-table :data-source.sync="dataSource"
         :selected-table-items.sync="selectedTableItems"
         :columns.sync="columns"
         :is-frontend-sort="isFrontendSort"
         :loading="loading"
         @backendOrder="getOrderedList($event)"
         height="300">
    <template slot-scope="item">
        <a href="" @click="edit(item)">编辑</a>
    </template>
</c-table>

data() {
      return {
        columns: [
          { text: '姓名', field: 'name', openSort: true, sort: 'asc', width: 150 },
          { text: '分数', field: 'score', openSort: true, sort: 'asc', width: 150 },
        ],
        dataSource: [
          { id: 1, name: 'CyrusFeng', score: 100 },
          { id: 2, name: 'jack', score: 70 },
          { id: 3, name: 'zzz', score: 80 },
          { id: 4, name: 'frank', score: 80 },
          { id: 5, name: 'drank', score: 80 },
          { id: 6, name: 'hrank', score: 80 },
          { id: 7, name: 'brank', score: 81 },
          { id: 8, name: 'brank', score: 82 },
          { id: 9, name: 'trank', score: 83 },
          { id: 10, name: 'nrank', score: 84 },
          { id: 11, name: 'nrank', score: 85 },
          { id: 12, name: 'nrank', score: 75 },
          { id: 13, name: 'nrank', score: 76 },
          { id: 14, name: 'nrank', score: 77 },
        ],
        selectedTableItems: [],
        isFrontendSort: false,
        loading: false
      }
}

methods:{
  edit(item){
    console.log(item.item)
  },
  getOrderedList($event){
    alert(JSON.stringify($event))
    this.loading = true
    setTimeout(()=>{
        this.loading = false
    },1000)
  }
}`,
        columns: [
          { text: '姓名', field: 'name', openSort: true, sort: 'asc', width: 150 },
          { text: '分数', field: 'score', openSort: true, sort: 'asc', width: 150 },
        ],
        dataSource: [
          { id: 1, name: 'CyrusFeng', score: 100 },
          { id: 2, name: 'jack', score: 70 },
          { id: 3, name: 'zzz', score: 80 },
          { id: 4, name: 'frank', score: 80 },
          { id: 5, name: 'drank', score: 80 },
          { id: 6, name: 'hrank', score: 80 },
          { id: 7, name: 'brank', score: 81 },
          { id: 8, name: 'brank', score: 82 },
          { id: 9, name: 'trank', score: 83 },
          { id: 10, name: 'nrank', score: 84 },
          { id: 11, name: 'nrank', score: 85 },
          { id: 12, name: 'nrank', score: 75 },
          { id: 13, name: 'nrank', score: 76 },
          { id: 14, name: 'nrank', score: 77 },
        ],
        selectedTableItems: [],
        isFrontendSort: false,
        loading: false
      }
    },
    methods:{
      edit(item){
        console.log(item.item)
        alert(`您正在编辑的这条数据的分数为${item.item.score}`)
      },
      getOrderedList($event){
        alert(JSON.stringify($event))
        this.loading = true
        setTimeout(()=>{
            this.loading = false
        },1000)
      }
    }
  }
</script>

<style scoped lang="scss">
    .container {
        /*font-size: 16px;*/
        .wrap {
            font-size: 16px;
            table {
                margin: 0;
                td, th {
                    font-size: 16px;
                }
            }
        }
        pre {
            code {
                font-size: 14px;
            }
        }
    }
</style>