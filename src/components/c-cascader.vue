<template>
    <div>
        <div class="input-wrap">
            <input type="text" :value="result">
            <c-icon class="icon" name="cancel" @click="cancel"></c-icon>
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
  import Item from './c-cascader-item'
  import CIcon from './c-icon'

  export default {
    name: "g-cascader",
    components: {
      "g-cascader-item": Item,
      'c-icon':CIcon
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
    computed: {
      result() {
        return this.selectedData.map((item) => {
          return item.name
        }).join('-')
      }
    },
    methods: {
      cancel(){
        this.selectedData = []
      }
    },
    created() {

    }
  }
</script>

<style scoped lang="scss">
    @import "../style_var.scss";
    .input-wrap{
        display: inline-flex;
        align-items: center;
        min-width: 10em;
        border: 1px solid $border-color;
        border-radius: $border-radius;
        input {
            padding: 0.1rem;
            font-size: 0.12rem;
        }
    }

</style>