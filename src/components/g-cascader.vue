<template>
    <div>
        <div class="input-wrap">
            <input type="text" :value="result">
            <i class="icon"></i>
        </div>
        <div class="popover">
            <g-cascader-item :load-data="loadData"
                             :source="completeSource"
                             :level="level"
                             :selected-data="selectedData"
                             @update:selectedData="selectedData = $event"></g-cascader-item>
        </div>
    </div>

</template>

<script>
  import Item from './g-cascader-item'

  export default {
    name: "g-cascader",
    components: {
      "g-cascader-item": Item
    },
    props: {
      completeSource: {
        type: Array
      },
      loadData: {
        type: Function
      }
    },
    data() {
      return {
        selectedData: [],
        level: 0
      }
    },
    computed:{
      result(){
        return this.selectedData.map((item)=>{
          return item.name
        }).join('-')
      }
    },
    methods: {},
    created() {

    }
  }
</script>

<style scoped>
input{
    padding: 0.1rem;
    font-size: 0.12rem;
}
</style>