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
        this.$emit('add:selected',this.name)
      }
    },
    created(){
      this.root.addItem(this)
    }

  }
</script>

<style scoped lang="scss">
.nav-item-wrap{
    padding: 6px 10px;
    &.active{
        background-color: red;
    }
}
</style>