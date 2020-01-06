<template>
    <div class="nav-item" @click="emitEvent" :class="activeClass">
        <slot></slot>
    </div>
</template>

<script>
  export default {
    name: "c-tabs-nav-item",
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
    computed: {
      activeClass() {
        return {
          active: this.active
        }
      }
    },
    mounted() {
      if (this.eventBus){
        this.eventBus.$on('changeTab', (val, vm) => {
          this.active = val === this.name;
        })
      }
    },
    methods: {
      emitEvent() {
        this.eventBus.$emit('changeTab', this.name,this)
      }
    }
  }
</script>

<style scoped lang="scss">
    @import "../../style_var.scss";
    $blue: #1890ff;
    $disabled-text-color: grey;
    .nav-item {
        flex-shrink: 0;
        padding: 0 1em;
        cursor: pointer;
        height: 100%;
        display: flex;
        align-items: center;
        &.active {
            color: $blue;
            font-weight: bold;
        }
        &.disabled {
            color: $disabled-text-color;
            cursor: not-allowed;
        }
    }
</style>