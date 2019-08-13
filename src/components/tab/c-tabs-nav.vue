<template>
    <div class="nav" ref="tabNav">
        <slot></slot>
        <div class="line" ref="line"></div>
        <div class="extra">
            <slot name="extra"></slot>
        </div>
    </div>
</template>

<script>
  export default {
    name: "g-tab-nav",
    inject:['eventBus'],
    mounted(){
      this.eventBus.$on('changeTab',(val,vm)=>{
        if(vm){
          let navLeft = this.$refs.tabNav.getBoundingClientRect().left;
          console.log(vm.$el.getBoundingClientRect())
          let {width,left} = vm.$el.getBoundingClientRect()
          this.$refs.line.style.width = width+'px'
          this.$refs.line.style.left = left-navLeft + 'px'
        }
      })
    }
  }
</script>

<style scoped lang="scss">
    @import "../../style_var.scss";
    $tab-height: 40px;
    $blue: #1890ff;
    $border-color: #ddd;
    .nav{
        display: flex;
        height: $tab-height;
        justify-content: flex-start;
        position: relative;
        border-bottom: 1px solid $border-color;
        .line {
            position: absolute;
            bottom: -1px;
            border-bottom: 1px solid $blue;
            transition: all 350ms;
        }
        .extra{
            margin-left: auto;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0 1em;
        }
    }
</style>