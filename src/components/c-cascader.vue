<template>
    <div class="cascader-wrap" ref="cascader">
        <div class="input-wrap" @click.stop="toggle">
            <input type="text" :value="result">
            <c-icon class="icon" name="cancel" @click="cancel"></c-icon>
        </div>
        <div class="popover" v-if="popoverVisible">
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
        level: 0,
        popoverVisible: false,
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
      },
      toggle () {
        if (this.popoverVisible === true) {
          this.close()
        } else {
          this.open()
        }
      },
      open () {
        this.popoverVisible = true
        this.$nextTick(()=>{
          document.addEventListener('click',this.onClickDocument)
        })
      },
      close () {
        console.log('xxxx')
        this.popoverVisible = false
        document.removeEventListener('click',this.onClickDocument)
      },
      onClickDocument(e){
        console.log('e.target',e.target)
        // console.log('x',this.$options.name)
        let cascader = this.$refs.cascader
        if(cascader === e.target||cascader.contains(e.target)){
          return
        }
        this.close()
      }
    },
    created() {

    }
  }
</script>

<style scoped lang="scss">
    @import "../style_var.scss";
    .cascader-wrap{
        display: inline-block;
    }
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