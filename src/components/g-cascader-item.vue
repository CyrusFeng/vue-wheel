<template>
    <div class="item-wrap">
        <div class="left">
            <!--{{level}}-->
            <ul>
                <li v-for="item in source" @click="choose(item)">
                    <span>{{item.name}}</span>
                    <!--直接传入完整数据，数据项无id 所以要在id存在的情况下才显示loading效果-->
                    <template v-if="item.id && loadingItem.id === item.id">
                        <c-icon name="loading" v-if="!item.isLeaf" class="icon loading"></c-icon>
                    </template>
                    <template v-else>
                        <c-icon name="right" v-if="!item.isLeaf" class="icon"></c-icon>
                    </template>
                </li>
            </ul>
        </div>
        <div class="right" v-if="selectedData[level] && selectedData[level].children">
            <g-cascader-item :load-data="loadData"
                             :level="level+1"
                             :source="selectedData[level].children"
                             :selected-data="selectedData"
                             @update:selectedData="transmit"></g-cascader-item>
        </div>
    </div>
</template>

<script>
    import CIcon from './c-icon'
  export default {
    name: "g-cascader-item",
    components:{
      'c-icon':CIcon
    },
    props: {
      source: {
        type: Array
      },
      selectedData: {
        type: Array
      },
      level: {
        type: Number
      },
      loadData: {
        type: Function
      }
    },
    data(){
      return {
        loadingItem:{},
        timer:null
      }
    },
    methods: {
      choose(item) {
        let copy = JSON.parse(JSON.stringify(this.selectedData))
        //如果不拷贝，在下面获取children后 会将数据添加到该引用中，再次点击该项，则不会触发loaddata
        // copy[this.level] = item
        copy[this.level] = JSON.parse(JSON.stringify(item))
        copy.splice(this.level + 1)

        let callback = (result) => {
          //数据加载完成后会调用该回调函数 此时清空loadingItem
          this.loadingItem = {}
          this.$set(copy[copy.length - 1], 'children', result)
        }
        //最后一项非叶子节点且没有children属性时才会执行loaddata
        if (!copy[copy.length - 1].isLeaf && !copy[copy.length - 1].children) {
          if(this.loadData){
            //将被点击的item赋值给loadingItem
            this.loadingItem = copy[copy.length - 1]
            //函数防抖
            clearTimeout(this.timer)
            this.timer = setTimeout(() => {
              this.loadData(copy[copy.length - 1], callback)
            }, 1000)

          }
        }

        this.$emit('update:selectedData', copy)
      },
      //嵌套的子组件发送数据时用此函数进行数据传递
      transmit($event) {
        this.$emit('update:selectedData', $event)
      },
    }
  }
</script>

<style scoped lang="scss">
    @import "../style_var.scss";

    .item-wrap{
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    /*height: 100%;*/
    height: 200px;
    .left{
        height: 100%;
        padding: 0.3em 0;
        overflow: auto;
        li{
            padding: .5em 1em;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            white-space: nowrap;
            &:hover {
                background: $grey;
            }
            span{
                padding: 0.3em 1em;
                display: flex;
                align-items: center;
                min-width: 5em;
                margin-right: 1em;
                user-select: none;
            }
            .icon{
                margin-left: 1em;
                &.loading{
                    animation: spin 1s infinite linear;
                }
            }
        }

    }
    .right{
        height: 100%;
        border-left: 1px solid $border-color-light;
    }
}
</style>