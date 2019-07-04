<template>
    <div class="nav-item-wrap" :class="{active}" @click="onClick">
        <slot></slot>
    </div>
</template>

<script>
  export default {
    name: "nav-item",
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
        this.$emit('add:selected',this.name)
      }
    }
  }
</script>

<style scoped lang="scss">
.nav-item-wrap{
    &.active{
        background-color: red;
    }
}
</style>