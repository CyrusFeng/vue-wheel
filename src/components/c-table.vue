<template>
    <div class="table-component-wrap" ref="tableComponentWrap">
        <div class="table-wrap" :style="{height:height+'px'}" ref="tableWrap">
            <table class="table" :class="{bordered,compact,striped}" ref="table">
                <thead>
                <tr>
                    <!--<th style="width:50px"></th>-->
                    <th style="width:50px"><input type="checkbox" @change="onChangeAllItems" ref="allChecked"
                               :checked="areAllItemsSelected">
                    </th>
                    <th style="width:50px" v-if="numberVisible">#</th>
                    <th :style="{width:column.width+'px'}" v-for="column in columns" :key="column.field">
                        <div class="wrapper">
                            <span>{{column.text}}</span>
                            <span class="sort-btns" @click="sort(column)" v-if="column.openSort">
                            <c-icon :class="{active:column.sort==='asc'}" name="asc"></c-icon>
                            <c-icon :class="{active:column.sort==='desc'}" name="desc"></c-icon>
                        </span>
                        </div>
                    </th>
                    <th style="width:50px"></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item,index) in dataSource" :key="item.id">
                    <!--<th style="width:50px">-->
                        <!--<c-icon class="expend-icon" name="right"></c-icon>-->
                    <!--</th>-->
                    <td style="width:50px"><input type="checkbox" @change="onChangeItem($event,item)"
                               :checked="selectedTableItems.filter((i)=>i.id===item.id).length>0"></td>
                    <td style="width:50px" v-if="numberVisible">{{index+1}}</td>
                    <template v-for="column in columns">
                        <td :style="{width:column.width+'px'}" :key="column.field">{{item[column.field]}}</td>
                    </template>
                    <td style="width:50px">
                        <slot :item="item"></slot>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <div class="loading-wrap" v-if="loading&&!isFrontendSort">
            <c-icon name="loading" class="loading"></c-icon>
        </div>
    </div>
</template>

<script>
  import CIcon from './c-icon'

  export default {
    name: "c-table",
    components: {
      'c-icon': CIcon
    },
    props: {
      selectedTableItems: {
        type: Array
      },
      columns: {
        type: Array,
        default: () => []
      },
      dataSource: {
        type: Array,
        default: () => [],
        validator(array) {
          return array.filter(item => item.id === undefined).length <= 0;
        }
      },
      //是否显示序号
      numberVisible: {
        type: Boolean,
        default: true
      },
      //边框
      bordered: {
        type: Boolean,
        default: true
      },
      //紧凑
      compact: {
        type: Boolean,
        default: true
      },
      //斑马线
      striped: {
        type: Boolean,
        default: true
      },
      isFrontendSort: {
        type: Boolean
      },
      loading: {
        type: Boolean
      },
      height: {
        type: [String, Number]
      }
    },
    data() {
      return {
        table2:null,
        onWindowResize:null
      }
    },
    computed: {
      areAllItemsSelected() {
        //判断是否全选
        //使用排序算法将数据按id排序，然后一一对比相同index的数据项是否相等
        let a = this.dataSource.map(item => item.id).sort()
        let b = this.selectedTableItems.map(item => item.id).sort()
        let equal = true

        if (this.selectedTableItems.length !== this.dataSource.length) {
          equal = false
        } else {
          for (let i = 0; i < a.length; i++) {
            if (a[i] !== b[i]) {
              equal = false
              break
            }
          }
        }
        return equal
      }
    },
    watch: {
      selectedTableItems() {

        if (this.selectedTableItems.length === this.dataSource.length) {
          this.$refs.allChecked.indeterminate = false
          // this.$refs.allChecked.checked = true
        } else if (this.selectedTableItems.length === 0) {
          this.$refs.allChecked.indeterminate = false
          // this.$refs.allChecked.checked = false
        } else {
          this.$refs.allChecked.indeterminate = true
        }
      },
      columns: {
        handler(newValue, oldValue) {
          if (this.isFrontendSort) {
            this.order(newValue)
          }
        },
        immediate: true
      }
    },
    mounted() {
      this.table2 = this.$refs.table.cloneNode(false)
      this.table2.classList.add('table-copy')
        let thead = this.$refs.table.children[0]
      let {height} = thead.getBoundingClientRect()
      this.$refs.tableWrap.style.marginTop = height +'px'
      this.$refs.tableWrap.style.height = this.height - height +'px'
      this.table2.appendChild(this.$refs.table.children[0])
        console.log(this.table2)
      this.$refs.tableComponentWrap.appendChild(this.table2)
      // this.updateTheadThWidth()
      // this.onWindowResize = ()=>{
      //   this.updateTheadThWidth()
      // }
      // window.addEventListener('resize',this.onWindowResize)
      // console.log(this.$scopedSlots)
    },
    beforeDestroy(){
      // window.removeEventListener('resize',this.onWindowResize)
      // this.table2.remove()
      // this.table2 = null
    },

    methods: {
      onChangeItem(e, item) {
        // console.log(e.target.checked)
        let copy = JSON.parse(JSON.stringify(this.selectedTableItems))
        let selected = e.target.checked
        if (selected) {
          copy.push(item)
        } else {
          copy = copy.filter(i => i.id !== item.id)
        }
        this.$emit('update:selectedTableItems', copy)
      },
      onChangeAllItems(e) {
        let selected = e.target.checked
        if (selected) {
          this.$emit('update:selectedTableItems', this.dataSource)
        } else {
          this.$emit('update:selectedTableItems', [])
        }
      },
      sort(column) {
        let copy = JSON.parse(JSON.stringify(this.columns))
        copy.forEach((item) => {
          if (item.field === column.field) {
            if (column.sort === 'asc') {
              item.sort = 'desc'
            } else if (column.sort === 'desc') {
              item.sort = 'normal'
            } else if (column.sort === 'normal') {
              item.sort = 'asc'
            }
          }
        })
        this.$emit('update:columns', copy)
        if (this.isFrontendSort) {
          this.order(copy)
        }
      },
      order(columns) {
        let copy = JSON.parse(JSON.stringify(this.dataSource))
        columns.forEach((column) => {
          if (column.openSort) {
            this.sortByKey(copy, column.field, column.sort)
          }
        })
        this.$emit('update:dataSource', copy)
        // this.dataSource = this.dataSource.sort((a,b)=>a-b)
      },
      sortByKey(array, key, order) {
        return array.sort((a, b) => {
          let x = a[key];
          let y = b[key];
          if (order === 'asc') {
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
          } else if (order === 'desc') {
            return ((x > y) ? -1 : ((x < y) ? 1 : 0));
          }
        });
      },
      // updateTheadThWidth(){
      //   let tableHead = Array.from(this.$refs.table.children).filter(item=>{
      //     return item.tagName.toLowerCase() === 'thead'
      //   })[0]
      //
      //   // let tableHead2 = Array.from(table2.children).filter(item=>item.tagName.toLowerCase() === 'thead')[0]
      //   let tableHead2
      //   Array.from(this.table2.children).map(node => {
      //     if (node.tagName.toLowerCase() !== 'thead') {
      //       node.remove()
      //     }else{
      //       tableHead2 = node
      //       // console.log(tableHead2)
      //     }
      //   })
      //
      //   Array.from(tableHead2.children[0].children).forEach((th,index)=>{
      //     if(index === Array.from(tableHead2.children[0].children).length-1){
      //       return
      //     }
      //     console.log(tableHead)
      //     th.style.width = tableHead.children[0].children[index].getBoundingClientRect().width +'px'
      //   })
      // }
    }
  }
</script>

<style scoped lang="scss">
    @import '../style_var';

    $darkgrey: darken($grey, 10%);
    $lightgrey: lighten($grey, 10%);
    .table-component-wrap{
        margin: 0 20px;
        position: relative;
        overflow: auto;
    }
    .table-wrap {
        overflow: auto;
        table {
            /*width: 100%;*/
            /*display: block;*/
            /*border: 1px solid red;*/
            border-collapse: collapse;
            /*border-spacing: 0;*/
            overflow: auto;
            background: #fff;
            td, th {
                padding: 8px;
                text-align: left;
                border-bottom: 1px solid $darkgrey;
            }

            &.bordered {
                /* border: 1px solid $darkgrey; */
                td, th {
                    border: 1px solid $darkgrey;
                }
            }
            &.compact {
                td, th {
                    padding: 4px;
                }
            }
            &.striped {
                tbody {
                    > tr {
                        &:nth-child(even) {
                            background: #eee;
                            /*background: red;*/

                        }
                        &:nth-child(odd) {
                            background-color: #fff;

                        }
                    }
                }
            }
            .wrapper {
                display: inline-flex;
                /*justify-content: center;*/
                align-items: center;
                span:first-child {
                    padding-right: 6px;
                }
                .sort-btns {
                    display: inline-flex;
                    flex-direction: column;
                    cursor: pointer;
                    svg {
                        width: 10px;
                        height: 10px;
                        fill: $grey;
                        &.active {
                            fill: $blue
                        }
                    }
                }
            }

        }
    }
    table {
        /*width: 100%;*/
        /*display: block;*/
        /*border: 1px solid red;*/
        border-collapse: collapse;
        /*border-spacing: 0;*/
        overflow: auto;
        background-color: #fff;
        td, th {
            padding: 8px;
            text-align: left;
            border-bottom: 1px solid $darkgrey;
        }

        &.bordered {
            /*border: 1px solid $darkgrey;*/
            td, th {
                border: 1px solid $darkgrey;
            }
        }
        &.compact {
            td, th {
                padding: 4px;
            }
        }
        &.striped {
            tbody {
                > tr {
                    &:nth-child(even) {
                        background: #eee;
                        /*background: red;*/

                    }
                    &:nth-child(odd) {
                        background-color: #fff;

                    }
                }
            }
        }
        .wrapper {
            display: inline-flex;
            /*justify-content: center;*/
            align-items: center;
            span:first-child {
                padding-right: 6px;
            }
            .sort-btns {
                display: inline-flex;
                flex-direction: column;
                cursor: pointer;
                svg {
                    width: 10px;
                    height: 10px;
                    fill: $grey;
                    &.active {
                        fill: $blue
                    }
                }
            }
        }

    }
    .table-copy {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
    }
    .loading-wrap {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(0, 0, 0, 0.2);
        .loading {
            /*animation: spin 1s infinite linear;*/
            @include spin;
        }
    }
    .expend-icon{
        width: 10px;
        height: 10px;
    }
</style>