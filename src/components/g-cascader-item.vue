<template>
    <div class="item-wrap">
        <div class="left">
            <!--{{level}}-->
            <ul>
                <li v-for="item in source" @click="choose(item)">
                    <span>{{item.name}}</span>
                    <i class="icon"></i>
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
  export default {
    name: "g-cascader-item",
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
    methods: {
      choose(item) {
        let copy = JSON.parse(JSON.stringify(this.selectedData))
        //如果不拷贝，在下面获取children后 会将数据添加到该引用中，再次点击该项，则不会触发loaddata
        // copy[this.level] = item
        copy[this.level] = JSON.parse(JSON.stringify(item))
        copy.splice(this.level + 1)

        let callback = (result) => {
          this.$set(copy[copy.length - 1], 'children', result)
        }
        //最后一项非叶子节点且没有children属性时才会执行loaddata
        if (!copy[copy.length - 1].isLeaf && !copy[copy.length - 1].children) {
          if(this.loadData){
            this.loadData(copy[copy.length - 1], callback)
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

<style scoped>
.item-wrap{
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
}
</style>