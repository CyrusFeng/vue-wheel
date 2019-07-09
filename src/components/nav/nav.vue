<template>
    <div>
        <!--<div><span style="font-size:12px">{{selectedItemNameArr}}</span></div>-->
        <div class="c-nav-wrap" :class="{vertical}">
            <slot></slot>
        </div>
    </div>

</template>

<script>
  export default {
    name: "nav",
    provide(){
      return {
        root:this,
        vertical:this.vertical
      }
    },
    props: {
      activeItems: {
        type: Array,
        default: () => []
      },
      multiple:{
        type:Boolean,
        default:false
      },
      vertical:{
        type:Boolean,
        default:false
      }
    },
    data(){
      return {
        navItems:[],
        selectedItemNameArr:[]
      }
    },
    mounted() {
      this.updateItemStatus()
      this.addListenerToChildren()
    },
    updated(){
      this.updateItemStatus()
    },
    // computed: {
    //   navItems() {
    //     return this.$children.filter((vm) => {
    //       return vm.$options.name === 'nav-item'
    //     })
    //   }
    // },
    methods:{
      updateItemStatus(){
        this.navItems.forEach((vm) => {
          if (this.activeItems.indexOf(vm.name) > -1) {
            vm.active = true
          } else {
            vm.active = false
          }
        })
      },
      addListenerToChildren(){
        this.navItems.forEach((vm) => {
          vm.$on('add:selected', (name) => {
            if(this.multiple){
              if (this.activeItems.indexOf(name) < 0) {
                console.log('')

                let copy = JSON.parse(JSON.stringify(this.activeItems))
                copy.push(name)
                this.$emit('update:activeItems', copy)
              }
            }else{
              this.$emit('update:activeItems', [name])
            }
          })
        })
      },
      //子组件created时会调用该方法
      addItem(vm){
        this.navItems.push(vm)
      }
    }
  }
</script>

<style scoped lang="scss">
    @import '../../style_var';
    .c-nav-wrap {
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        border-bottom: 1px solid $grey;
        font-size: 0;
        cursor: default;
        user-select: none;
        &.vertical{
            flex-direction: column;
            border: 1px solid $grey;
            > .nav-item-wrap{
              width: 100%;
            }
        }

    }

</style>