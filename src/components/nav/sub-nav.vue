<template>
    <div class="sub-nav-wrap" :class="{active}" v-click-outside="close">
        <span class="sub-title" @click="onClick">
            <slot name="title"></slot>
        </span>
        <div class="sub-nav" v-show="open">
            <slot></slot>
        </div>
    </div>
</template>

<script>
  import ClickOutside from '../../click-outside'
  import {removeListener} from '../../click-outside'
  export default {
    name: "sub-nav",
    inject: ['root'],
    directives:{
      ClickOutside
    },
    props: {
      name: {
        type: String
      }
    },
    data() {
      return {
        open: false,
      }
    },
    computed:{
      active(){
        console.log('active',this.root.selectedItemNameArr.indexOf(this.name)>-1)
        return this.root.selectedItemNameArr.indexOf(this.name)>-1?true:false
      }
    },
    methods: {
      onClick() {
        this.open = !this.open
      },
      close(){
        this.open = false
      },
      updateSelectedItemNameArr() {
        // this.active = true
        this.root.selectedItemNameArr.unshift(this.name)

        if (this.$parent.updateSelectedItemNameArr) {
          this.$parent.updateSelectedItemNameArr()
        } else {
          // this.root.selectedItemNameArr.length = 0
        }
      }
    },
    beforeDestroy(){
      removeListener()
    }
  }
</script>

<style scoped lang="scss">
    @import '../../style_var';

    .sub-nav-wrap {
        position: relative;
        span {
            display: block;
            padding: 10px 20px;
        }
        .sub-nav {
            margin-top: 1px;
            position: absolute;
            left: 0;
            top: 100%;
            min-width: 8em;
            white-space: nowrap;
            background-color: #fff;
            box-shadow: 0 0 3px fade_out(black, 0.8);
            border-radius: $border-radius;
        }
        &.active {
            &::after {
                content: '';
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                border-bottom: 2px solid $blue;
            }
        }
        .sub-nav-wrap {
            .sub-title {
                font-size: $font-size;
                color: $light-color;
            }
            .sub-nav {
                left: 100%;
                top: 0;

            }
        }
        .sub-nav .nav-item-wrap {
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
    }


</style>