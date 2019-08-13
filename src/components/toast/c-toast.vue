<template>
    <div class="toast-wrap" :class="getPosition">
        <div class="toast">
            <div class="message" ref="domMessage">
                <div v-if="enableHtml" class="content" v-html="$slots.default"></div>
                <slot v-else></slot>
            </div>
            <div class="line" ref="domLine" v-if="closeBtn"></div>
            <div class="btn" v-if="closeBtn" @click="execCloseBtn">{{closeBtn.text}}</div>
        </div>
    </div>
</template>

<script>
  export default {
    name: "c-toast",
    props: {
      autoClose: {
        type: Boolean,
        default: true
      },
      autoCloseDelay: {
        type: Number,
        default: 2
      },
      position: {
        type: String,
        default: 'top',
        validator: (val) => {
          if(!(['top', 'middle', 'bottom'].indexOf(val) > -1)){
            console.warn('传递的值只能包含在top, middle, bottom中')
            return false
          }
          return true
        }
      },
      closeBtn: {
        type: Object,
      },
      enableHtml:{
        type:Boolean,
        default:false
      }
    },
    computed:{
      getPosition(){
        console.log(this.position)
        return `position-${this.position}`
      }

    },
    mounted() {
      if (this.autoClose) {
        setTimeout(() => {
          this.close()
        }, this.autoCloseDelay * 1000)
      }
      this.$nextTick(()=>{
        if(this.$refs.domLine){
          this.$refs.domLine.style.height = this.$refs.domMessage.getBoundingClientRect().height+'px'
        }
      })

    },
    methods: {
      close() {
        this.$el.remove()
        // 触发自定义close事件，在toastPlugin.js中会将当前的toast实例赋值为null
        this.$emit('close')
        this.$destroy()

      },
      execCloseBtn(){
        this.close()
        if (this.closeBtn.callback) {
          this.closeBtn.callback()
        }

      }
    }

  }
</script>

<style scoped lang="scss">
    $font-size: 14px;
    $toast-min-height: 40px;
    $toast-bg: rgba(0, 0, 0, 0.75);
    .toast-wrap {
        position: fixed;
        left: 50%;
        transform: translateX(-50%);
        $animation-duration: 300ms;
        &.position-top {
            top: 0;
            .toast {
                border-top-left-radius: 0;
                border-top-right-radius: 0;
                animation: slide-down $animation-duration;
            }
        }
        &.position-bottom {
            bottom: 0;
            .toast {
                border-bottom-left-radius: 0;
                border-bottom-right-radius: 0;
                animation: slide-up $animation-duration;
            }
        }
        &.position-middle {
            top: 50%;
            transform: translateX(-50%) translateY(-50%);
            .toast {
                animation: fade-in $animation-duration;
            }
        }
    }

    .toast {
        font-size: $font-size;
        min-height: $toast-min-height;
        line-height: 1.8;
        display: flex;
        color: white;
        align-items: center;
        background: $toast-bg;
        border-radius: 4px;
        box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.50);
        padding: 0 16px;
        .message {
            padding: 8px 0;
        }
        .btn {
            padding-left: 16px;
            flex-shrink: 0;
            cursor: pointer;
        }
        .line {
            height: 100%;
            border-left: 1px solid #666;
            margin-left: 16px;
        }

    }
    @keyframes slide-down {
        0%{
            opacity: 0;
            transform: translateY(-100%);
        }
        100%{
            opacity: 1;
            transform: translateY(0%);
        }
    }
    @keyframes slide-up {
        0%{
            opacity: 0;
            transform: translateY(100%);
        }
        100%{
            opacity: 1;
            transform: translateY(0%);
        }
    }
    @keyframes fade-in {
        0%{
            opacity: 0;
        }
        100%{
            opacity: 1;
        }
    }
</style>