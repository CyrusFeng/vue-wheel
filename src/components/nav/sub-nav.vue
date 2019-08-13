<template>
    <div class="sub-nav-wrap" :class="{active,vertical}" v-click-outside="close">
        <p class="sub-title" @click="onClick">
            <slot name="title"></slot>
            <span class="icon-wrap" :class="{open}">
                <c-icon class="icon" name="right"></c-icon>
                <!--<c-icon v-else class="icon" name="right"></c-icon>-->
            </span>
        </p>
        <template v-if="vertical">
            <transition @after-enter="afterEnter" @enter="enter" @leave="leave" @after-leave="afterLeave">
                <div class="sub-nav" v-show="open">
                    <slot></slot>
                </div>
            </transition>
        </template>
        <div v-else class="sub-nav" v-show="open">
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
    inject: ['root', 'vertical'],
    directives: {
      ClickOutside
    },
    components: {
      'c-icon': CIcon
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
    computed: {
      active() {
        console.log('active', this.root.selectedItemNameArr.indexOf(this.name) > -1)
        return this.root.selectedItemNameArr.indexOf(this.name) > -1 ? true : false
      }
    },
    methods: {
      onClick() {
        this.open = !this.open
      },
      close() {
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
      },

      enter(el, done) {
        let {height} = el.getBoundingClientRect()
        console.log(height)
        el.style.height = 0
        el.getBoundingClientRect()
        el.style.height = `${height}px`
        el.addEventListener('transitionend',()=>{
          done()
        })
      },
      afterEnter(el){
        el.style.height = 'auto'
      },
      leave(el, done) {
        let {height} = el.getBoundingClientRect()
        el.style.height = `${height}px`
        el.getBoundingClientRect() //让浏览器计算元素宽高等属性值，迫使其不会合并上下两个赋值语句
        el.style.height = 0
        el.addEventListener('transitionend',()=>{
          done()
        })
        // done()
      },
      afterLeave(el) {
        el.style.height = 'auto'
      }
    },
    beforeDestroy() {
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
            font-size: $font-size;
            margin: 0 !important;
            line-height: normal !important;
            > .icon-wrap {
                display: none;
            }
        }
        .sub-nav {
            margin-top: 1px;
            position: absolute;
            left: 0;
            top: 100%;
            /*min-width: 8em;*/
            white-space: nowrap;
            /*background-color: #fff;*/
            box-shadow: 0 0 3px fade_out(black, 0.8);
            border-radius: $border-radius;
            transition: height .3s;
        }
        &:not(.vertical){
            &.active {
                /*width: 100%;*/
                &::after {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    border-bottom: 2px solid $blue;
                }
            }
        }
        &.vertical{
            &.active {
                color: $blue;
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

        .sub-nav .sub-nav-wrap {
            .sub-title {
                display: flex;
                justify-content: space-between;
                align-items: center;
                .icon-wrap {
                    display: inline-flex !important;
                    justify-content: center;
                    align-items: center;
                    transition: transform 0.3s;
                    &.open {
                        transform: rotate(90deg);
                    }
                }
            }
            &.active {
                &::after {
                    display: none;
                }
            }
        }
        &.vertical {
            width: 100%;
            .sub-nav {
                margin-left: 0.5em;
                margin-top: 1px;
                position: static;
                left: 0;
                top: 100%;
                white-space: nowrap;
                box-shadow: none;
                border-radius: 0;
                overflow: hidden;

                /*<!--border-top: 1px solid $grey;-->*/

            }
            &.active {
                width: 100%;
            }
        }
    }

    /*.fade-enter-active, .fade-leave-active {*/
    /*transition: opacity .3s;*/
    /*}*/
    /*.fade-enter, .fade-leave-to !* .fade-leave-active below version 2.1.8 *! {*/
    /*opacity: 0;*/
    /*}*/

</style>