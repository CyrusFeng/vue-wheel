<template>
    <div @click="emitEvent" :class="activeClass" v-show="active">
        <slot></slot>
    </div>
</template>

<script>
  export default {
    name: "g-tabs-content-item",
    inject: ['eventBus'],
    data() {
      return {
        active: false
      }
    },
    props: {
      name: {
        type: String,
        required: true
      }
    },
    computed:{
      activeClass(){
        return {
          active:this.active
        }
      }
    },
    mounted() {
      if (this.eventBus){
        this.eventBus.$on('changeTab', (val) => {
          this.active = val === this.name;
        })
      }
    },
    methods: {
      emitEvent() {
        this.eventBus.$emit('changeTab', this.name)
      }
    }
  }
</script>

<style scoped>
    .active{
        /*background-color: blue;*/
    }
</style>