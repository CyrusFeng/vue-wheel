<template>
    <div class="nav-item-wrap" :class="{active,vertical}" @click="onClick">
        <slot></slot>
    </div>
</template>

<script>
  export default {
    name: "c-nav-item",
    inject:['root','vertical'],
    props:{
      name:{
        type:String
      }
    },
    data(){
      return{
        active:false
      }
    },
    methods:{
      onClick(){
        this.root.selectedItemNameArr = []
        this.$parent.updateSelectedItemNameArr && this.$parent.updateSelectedItemNameArr()
        this.$emit('add:selected',this.name)
      }
    },
    created(){
      this.root.addItem(this)
    }

  }
</script>

<style scoped lang="scss">
    @import '../../style_var';
.nav-item-wrap{
    padding: 10px 20px;
    position: relative;
    font-size: $font-size;
    /*<!--color: $light-color;-->*/
    &:not(.vertical){
        &.active{
            &::after{
                content: '';
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                border-bottom: 2px solid $blue;
            }
        }
    }
    &.vertical{
        &.active{
            color: $blue;
        }
    }
    a{
        color: inherit;
        text-decoration: none !important;
        font-weight: normal;
    }
}
    .c-nav-wrap .sub-nav-wrap .nav-item-wrap {
        color: $light-color;
        font-size: $font-size;
        &.active {
            background-color: $grey;
            color: $color;
            &::after {
                display: none;
            }
        }
    }
    .c-nav-wrap .sub-nav-wrap .nav-item-wrap.vertical {
        color: $light-color;
        font-size: $font-size;
        &.active {
            background-color: #fff;
            color: $blue;
            &::after {
                display: none;
            }
        }
    }
</style>