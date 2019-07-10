<template>
    <div class="table-wrap">
        <table class="table" :class="{bordered,compact,striped}">
            <thead>
            <tr>
                <th><input type="checkbox" @change="onChangeAllItems" ref="allChecked"></th>
                <th v-if="numberVisible">#</th>
                <th v-for="column in columns" :key="column.field">{{column.text}}</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item,index in dataSource" :key="item.id">
                <td><input type="checkbox" @change="onChangeItem($event,item)"
                           :checked="selectedTableItems.filter((i)=>i.id===item.id).length>0"></td>
                <td v-if="numberVisible">{{index+1}}</td>
                <template v-for="column in columns">
                    <td :key="column.field">{{item[column.field]}}</td>
                </template>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
  export default {
    name: "c-table",
    props: {
      selectedTableItems: {
        type: Array
      },
      columns: {
        type: Array
      },
      dataSource: {
        type: Array,
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
      }
    },
    data() {
      return {}
    },
    watch: {
      selectedTableItems() {

        if (this.selectedTableItems.length === this.dataSource.length) {
          this.$refs.allChecked.indeterminate = false
          this.$refs.allChecked.checked = true
        } else if(this.selectedTableItems.length === 0){
          this.$refs.allChecked.indeterminate = false
          this.$refs.allChecked.checked = false
        }else{
          this.$refs.allChecked.indeterminate = true
        }
      }
    },
    methods: {
      onChangeItem(e, item) {
        // console.log(e.target.checked)
        let copy = JSON.parse(JSON.stringify(this.selectedTableItems))
        let selected = e.target.checked
        if (selected) {
          copy.push(item)
        } else {
          copy = copy.filter(i=>i.id !== item.id)
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
      }
    }
  }
</script>

<style scoped lang="scss">
    @import '../style_var';

    $darkgrey: darken($grey, 10%);
    $lightgrey: lighten($grey, 10%);
    .table {
        margin: 20px;
        width: calc(100% - 40px);
        /*display: block;*/
        /*border: 1px solid red;*/
        border-collapse: collapse;
        /*border-spacing: 0;*/
        td, th {
            padding: 8px;
            text-align: left;
            border-bottom: 1px solid $darkgrey;
        }

        &.bordered {
            border: 1px solid $darkgrey;
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
    }
</style>