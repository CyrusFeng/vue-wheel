<template>
    <transition name="slide">
        <div class="c-slides-item" v-if="visible" :class="{reserve}">
            <slot></slot>
        </div>
    </transition>

</template>

<script>
  export default {
    name: "c-slides-item",
    props:{
      name:{
        type:String
      }
    },
    data() {
      return {
        selected:'',
        reserve:false
      }
    },
    computed:{
      visible(){
        return this.selected === this.name
      }
    }
  }
</script>

<style scoped>
    .c-slides-item {

    }
    .slide-leave-active{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
    .slide-enter-active, .slide-leave-active {
        transition: all 1s;
    }

    .slide-enter {
        transform: translateX(100%);
        opacity: 0;
    }
    .slide-enter.reserve {
        transform: translateX(-100%);
        opacity: 0;
    }

    .slide-leave-to {
        transform: translateX(-100%) scale(0.5);
        opacity: 0;
    }
    .slide-leave-to.reserve{
        transform: translateX(100%) scale(0.5);
        opacity: 0;
    }
</style>