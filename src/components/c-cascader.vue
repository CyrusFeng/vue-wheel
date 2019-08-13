<template>
    <div class="cascader-wrap" ref="cascader" v-click-outside="close">
        <!--<div class="input-wrap" @click.stop="toggle">-->
        <div class="input-wrap" @click="toggle">
            <!--<input type="text" :value="result">-->
            <span>{{result || '&nbsp;'}}</span>
            <c-icon class="icon" name="cancel" @click="cancel" v-if="result"></c-icon>
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
  import ClickOutside from '../click-outside'
  import {removeListener} from '../click-outside'

  export default {
    name: "g-cascader",
    components: {
      "g-cascader-item": Item,
      'c-icon':CIcon
    },
    directives:{
      ClickOutside
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
        // this.$nextTick(()=>{
        //   document.addEventListener('click',this.onClickDocument)
        // })
      },
      close () {
        // console.log('xxxx')
        this.popoverVisible = false
        // document.removeEventListener('click',this.onClickDocument)
      },
      // onClickDocument(e){
      //   console.log('e.target',e.target)
      //   // console.log('x',this.$options.name)
      //   let cascader = this.$refs.cascader
      //   if(cascader === e.target||cascader.contains(e.target)){
      //     return
      //   }
      //   this.close()
      // }
    },
    created() {

    },
    beforeDestroy(){
      removeListener()
    }
  }
</script>

<style scoped lang="scss">
    @import "../style_var.scss";

    .cascader-wrap{
        display: inline-block;
        vertical-align: top;
        font-size: 16px;
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
        span{
            display: inline-flex;
            min-width: 12em;
            background: #fff;
            height: 32px;
            align-items: center;
            padding: 0 1em;
            /*border: 1px solid #999;*/
            border-radius: 4px;
        }
        .icon{
            margin-right: 12px;
        }
    }

</style>