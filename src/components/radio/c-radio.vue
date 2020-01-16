<template>
    <div class="x-radio" :class="{vertical}">
        <x-option v-for="(option,index) in options" :key="option.value" :option="option" :index="index" :current.sync="current" class="margin"></x-option>
    </div>
</template>
<script>
  import xOption from './c-option.vue'
  export default {
    name: "c-radio",
    components: { xOption },
    props: {
      options: { type: Array, required: true },
      vertical: { type: Boolean, default: false },
      defaultIndex: [Number,String]
    },
    data() {
      return {
        current: 0
      }
    },
    watch: {
      current(val) {
        if (val > -1) {
          this.$emit('value-change', this.options[val].value)
        }
      }
    },
    created() {
      this.defaultIndex || this.defaultIndex === 0 ? this.current = this.defaultIndex : ''
    }
  }
</script>
<style scoped lang="scss">
    .x-radio {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        &.vertical {
            flex-direction: column;
            align-items: flex-start;
            .margin{
                /*margin-top: 5px;*/
                margin-bottom: 5px;
            }
        }
    }
</style>