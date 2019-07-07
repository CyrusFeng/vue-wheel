<template>
    <div class="nav-item-wrap" :class="{active}" @click="onClick">
        <slot></slot>
    </div>
</template>

<script>
  export default {
    name: "nav-item",
    inject:['root'],
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
</style>