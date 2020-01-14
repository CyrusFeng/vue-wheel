<template>
    <div class="wrapper" ref="wrapper">
        <div class="pop-wrapper" :class="[`position-${this.position}`,this.popClassName]" ref="popWrapper" v-if="showPop">
            <slot name="pop" :close="close"></slot>
        </div>
        <span ref="triggerWrap" class="btn">
            <slot></slot>
        </span>
    </div>
</template>

<script>
  export default {
    name: "c-popover",
    mounted(){
      console.log(this.eventType)
      if (this.eventType === 'click'){
        this.$refs.wrapper.addEventListener(this.eventType,this.addListener)
      }else if(this.eventType === 'hover'){

        this.$refs.wrapper.addEventListener('mouseenter',this.open)
        this.$refs.wrapper.addEventListener('mouseleave',this.close)
      }
    },
    data() {
      return {
        showPop: false
      }
    },
    // watch:{
    //   showPop:function (newx,old) {
    //     console.log(newx)
    //     console.log(old)
    //   },
    // },
    props: {
      position: {
        default: "top",
        validator(value) {
          return ['left', 'top', 'right', 'bottom'].indexOf(value) > -1
        }
      },
      eventType:{
        type:String,
        default: "click",
        validator(value) {
          return ['click', 'hover'].indexOf(value) > -1
        }
      },
      popClassName:{
        type:Array
      },
      container:{
        type:Element
      }
    },
    methods: {
      addListener(e) {
        if (this.$refs.triggerWrap.contains(e.target)) {
          if (this.showPop) {
            this.close()
          } else {
            this.open()
          }
        }
      },
      hiddenPop(e) {
        console.log(this.$refs.triggerWrap.contains(e.target))
        console.log(this.$refs.popWrapper.contains(e.target))
        console.log(e.target)
        if (this.$refs.triggerWrap.contains(e.target) || this.$refs.popWrapper.contains(e.target)) {
          console.log('什么都不做')
        } else {
          this.close()
        }
      },
      close() {
        this.showPop = false
        document.removeEventListener('click', this.hiddenPop)
        console.log('关闭，监听器消失')
      },
      open() {
        this.showPop = true
        document.addEventListener('click', this.hiddenPop)

        this.$nextTick(() => {
          if (this.container){
            this.container.appendChild(this.$refs.popWrapper)
          } else{
            document.body.appendChild(this.$refs.popWrapper)
            //将弹出层放在body中，以防用户在组件外使用overflow：hidden时弹出层被遮盖
          }


          let { width, height, top, left } = this.$refs.triggerWrap.getBoundingClientRect()
          let popHeight = this.$refs.popWrapper.getBoundingClientRect().height
          let positionTab = {
            top: {
              'top': top + window.scrollY,
              'left': left + window.scrollX
            },
            bottom: {
              'top': top + window.scrollY + height,
              'left': left + window.scrollX
            },
            right: {
              'top': top + window.scrollY + (height - popHeight)/2,
              'left': left + window.scrollX + width
            },
            left: {
              'top': top + window.scrollY + (height - popHeight)/2,
              'left': left + window.scrollX
            }
          }
          this.$refs.popWrapper.style.left = positionTab[this.position].left + 'px'
          this.$refs.popWrapper.style.top = positionTab[this.position].top + 'px'
        })
      }
    }
  }
</script>

<style scoped lang="scss">
    .wrapper {
        /*padding: 20px;*/
        /*margin: 50px;*/

        display: inline-block;
        vertical-align: middle;
        position: relative;
        /*border: 1px solid red;*/

        .position-left {
            //transform: translateX(-100%);
        }
        .position-right {
            //transform: translateY(-100%);
        }
    }

    .pop-wrapper {
        position: absolute;
        z-index: 10;
        /*bottom: 100%;*/
        /*left: 0;*/
        /*transform: translateY(-100%);*/
        /*font-size: 16px;*/
        /*border: 1px solid #333;*/
        border-radius: 4px;
        /*-webkit-filter: drop-shadow(0 1px 1px rgba(0,0,0,.5));*/
        filter: drop-shadow(0 1px 1px rgba(0,0,0,.1));
        background: #fff;
        padding: .5em 1em;
        max-width: 20em;
        word-break: break-all;

        /*background-color: #fff;*/
        background-clip: padding-box;
        /*border-radius: 4px;*/
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        font-family: "Chinese Quote", -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        font-size: 14px;
        font-variant: tabular-nums;
        line-height: 1.5;
        color: rgba(0, 0, 0, 0.65);

        &::after, &::before {
            content: '';
            display: block;
            width: 0;
            height: 0;
            border: 10px solid transparent;
            position: absolute;
            /*box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);*/
        }
        &.position-top {
            transform: translateY(-100%);
            margin-top: -10px;
            &::after, &::before {
                left: 10px;
            }
            &::before {
                border-bottom: none;
                /*border-top-color: black;*/
                top: 100%;
            }
            &::after {
                border-bottom: none;
                border-top-color: white;
                top: calc(100% - 1px);
            }
        }
        &.position-bottom {
            /*transform: translateY(100%);*/
            margin-top: 10px;
            &::before, &::after {
                left: 10px;
            }
            &::before {
                border-top: none;

                /*border-bottom-color: black;*/
                bottom: 100%;
            }
            &::after {
                border-top: none;

                border-bottom-color: white;
                bottom: calc(100% - 1px);
            }
        }
        &.position-left {
            transform: translateX(-100%);
            margin-left: -10px;
            &::before, &::after {
                transform: translateY(-50%);
                top: 50%;
            }
            &::before {
                /*border-left-color: black;*/
                border-right: none;
                left: 100%;
            }
            &::after {
                border-left-color: white;
                border-right: none;
                left: calc(100% - 1px);
            }
        }
        &.position-right {
            margin-left: 10px;
            &::before, &::after {
                transform: translateY(-50%);
                top: 50%;
            }
            &::before {
                /*border-right-color: black;*/
                border-left: none;
                right: 100%;
            }
            &::after {
                border-right-color: white;
                border-left: none;
                right: calc(100% - 1px);
            }
        }
    }

    .btn {
        /*display: inline-block;*/
        /*border: 1px solid red;*/

        font-size: 14px;
        height: 32px;
        /*padding: 0 1em;*/
        border-radius: 4px;
        /*border: 1px solid #999;*/
        background: #fff;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        vertical-align: middle;
    }

</style>