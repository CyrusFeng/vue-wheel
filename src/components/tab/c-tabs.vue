<template>
    <div class="tabs">
        <slot></slot>
    </div>
</template>

<script>
  import Vue from 'vue'

  export default {
    name: "g-tabs",
    data() {
      return {
        eventBus: new Vue()
      }
    },
    props: {
      selected: {
        type: String,
        required: true
      }
    },
    provide() {
      return {
        eventBus: this.eventBus
      }
    },
    mounted() {
      if (this.$children.length === 0){
        console && console.warn && console.warn('应该传入一个组件')
      }
      this.eventBus.$on('changeTab', (val) => {
        this.$emit('update:selected', val)
      })
      this.$children.forEach((vm)=>{
        if (vm.$options.name === 'g-tab-nav'){
          vm.$children.forEach((childVM)=>{
            if(childVM.$options.name === 'g-tab-nav-item' && childVM.name === this.selected){
              this.eventBus.$emit('changeTab', this.selected,childVM)
            }
          })
        }
      })

    },
  }
</script>

<style scoped>

</style>