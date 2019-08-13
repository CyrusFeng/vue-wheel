<template>
    <div class="container">
        <h2>支持固定表头、多选、可设置前端排序或服务端排序</h2>
        <p>
            <strong>预览：</strong>
        </p>
        <div class="wrap">
            <c-table :columns="columns"
                     :data-source.sync="dataSource"
                     :selected-table-items.sync="selectedTableItems"
                     :columns.sync="columns"
                     @update:columns="order"
                     :is-frontend-sort="isFrontendSort"
                     :loading="loading"
                     height="300">
                <template slot-scope="item">
                    <a href="" @click="edit(item)">编辑</a>
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
  import CIcon from '../../../src/components/c-icon'
  import CTable from '../../../src/components/c-table'
  export default {
    name: "table-demo",
    components: {
      'c-icon': CIcon,
      'c-table': CTable,
    },
    data() {
      return {
        code:`<c-table :columns="columns"
         :data-source.sync="dataSource"
         :selected-table-items.sync="selectedTableItems"
         :columns.sync="columns"
         @update:columns="order"
         :is-frontend-sort="isFrontendSort"
         :loading="loading"
         height="300">
    <template slot-scope="item">
        {{item}}
        <a href="" @click="edit(item)">编辑</a>
    </template>
</c-table>`,
        columns: [
          { text: '姓名', field: 'name', openSort: true, sort: 'asc' ,width:150},
          { text: '分数', field: 'score', openSort: true, sort: 'asc' ,width:150},
        ],
        dataSource: [
          { id: 1, name: 'CyrusFeng', score: 100 },
          { id: 2, name: 'jack', score: 70 },
          { id: 3, name: 'zzz', score: 80 },
          { id: 4, name: 'frank', score: 80 },
          { id: 5, name: 'drank', score: 80 },
          { id: 6, name: 'hrank', score: 80 },
          { id: 7, name: 'brank', score: 80 },
          { id: 8, name: 'brank', score: 80 },
          { id: 9, name: 'trank', score: 80 },
          { id: 10, name: 'nrank', score: 80 },
          { id: 11, name: 'nrank', score: 80 },
          { id: 12, name: 'nrank', score: 80 },
          { id: 13, name: 'nrank', score: 80 },
          { id: 14, name: 'nrank', score: 80 },
        ],
        selectedTableItems: [],
        isFrontendSort: true,
        loading:false
      }
    },
  }
</script>

<style scoped lang="scss">
    .container{
        /*font-size: 16px;*/
        .wrap{
            font-size: 16px;
            table{
                margin: 0;
                td,th{
                    font-size: 16px;
                }
            }
        }
        pre{
            code{
                font-size: 14px;
            }
        }
    }
</style>