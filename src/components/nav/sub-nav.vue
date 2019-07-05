<template>
    <div class="sub-nav-wrap">
        <span class="sub-title" @click="onClick">
            <slot name="title"></slot>
        </span>
        <div class="sub-nav" v-show="open">
            <slot></slot>
        </div>
    </div>
</template>

<script>
  export default {
    name: "sub-nav",
    inject: ['root'],
    data() {
      return {
        open: false
      }
    },
    methods: {
      onClick() {
        this.open = !this.open
      }
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
        .sub-nav-wrap {
            .sub-title{
                font-size: $font-size;
            }
            .sub-nav {
                left: 100%;
                top: 0;

            }
        }
        .sub-nav .nav-item-wrap {
            color: $light-color;
            font-size: $font-size;
            &.active{
                background-color: $grey;
                color: $color;
                &::after{
                    display: none;
                }
            }
        }
    }


</style>