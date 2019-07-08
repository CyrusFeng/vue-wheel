<template>
    <div class="sub-nav-wrap" :class="{active}" v-click-outside="close">
        <p class="sub-title" @click="onClick">
            <slot name="title"></slot>
            <span class="icon-wrap" :class="{open}">
                <c-icon class="icon" name="right"></c-icon>
                <!--<c-icon v-else class="icon" name="right"></c-icon>-->
            </span>
        </p>
        <div class="sub-nav" v-show="open">
            <slot></slot>
        </div>
    </div>
</template>

<script>
  import ClickOutside from '../../click-outside'
  import {removeListener} from '../../click-outside'
  import CIcon from '../c-icon'
  export default {
    name: "sub-nav",
    inject: ['root'],
    directives:{
      ClickOutside
    },
    components:{
      'c-icon':CIcon
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
        .sub-title {
            display: block;
            padding: 10px 20px;
            > .icon-wrap{
                display: none;
            }
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
        .sub-nav .sub-nav-wrap{
            .sub-title{
                display: flex;
                justify-content: space-between;
                align-items: center;
                .icon-wrap{
                    display: inline-flex !important;
                    justify-content: center;
                    align-items: center;
                    transition: transform 0.3s;
                    &.open{
                        transform: rotate(180deg);
                    }
                }
            }
            &.active {
                &::after {
                    display: none;
                }
            }
        }
    }


</style>