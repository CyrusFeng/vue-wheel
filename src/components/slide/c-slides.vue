<template>
    <div class="c-slides"
         @mouseenter="onMouseenter"
         @mouseleave="onMouseleave"
         @touchstart="onTouchStart"
         @touchmove="onTouchMove"
         @touchend="onTouchEnd">
        <div class="c-slides-window">
            <div class="c-slides-wrapper">
                <slot></slot>
            </div>
        </div>
        <div class="dot-wrap">
            <span @click="sendSelectedName(selectedIndex-1)">
                <c-icon name="left" class="icon"></c-icon>
            </span>
            <span v-for="n in childrenLength"
                  :class="{'active':selectedIndex===n-1}"
                  @click="sendSelectedName(n-1)" :data-index="n-1">{{n}}</span>
            <span @click="sendSelectedName(selectedIndex+1)">
                <c-icon name="right" class="icon"></c-icon>
            </span>

        </div>
    </div>
</template>

<script>
  import CIcon from '../icon/c-icon'

  export default {
    name: "c-slides",
    components: {
      'c-icon': CIcon
    },
    props: {
      //被选中子元素的name（非props中的name）
      selected: {
        type: String
      },
      autoPlay: {
        type: Boolean,
        default: true
      },
      autoPlayDelay:{
        type:Number,
        default:1500
      },
      reserve: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        //子元素name值数组
        names: [],
        childrenLength: 0,
        perIndex: 0,
        timer: null,
        startTouch: null,
        endTouch: null
      }
    },
    computed: {
      //获取被选中子元素的name在name数组中的index
      selectedIndex() {
        return this.names.indexOf(this.getSelected())
      },
      //name为c-slides-item的子元素数组
      items(){
        // vm.$options.name  获取实例中$option中的name值
        return this.$children.filter((vm)=>{return vm.$options.name==='c-slides-item'})
      }
    },
    watch: {
      selected() {
        console.log(this.perIndex)
        console.log(this.selectedIndex)
        //this.selectedIndex 这个计算属性依赖于this.getSelected()函数的返回值，
        // 在watch监听到selected变化时，也就是说sendSelectedName发出的单项数据流就改变了selected后，
        // 影响了this.getSelected()函数的返回值，所以计算属性this.selectedIndex此时也发生了变化
        // perIndex和selectedIndex也就是上一个显示的子元素的index值和当前将要显示的子元素的index值
        this.updateChildren()
      },
    },
    mounted() {

      this.childrenLength = this.items.length

      //vm.name 获取实例props中的name值
      this.names = this.items.map((vm) => {
        return vm.name
      })
      this.updateChildren()
      this.triggerAutoPlay()

    },
    methods: {
      //获取被选择子元素的name值 （非props中的name属性）
      getSelected() {
        let first = this.items[0]
        return this.selected || first.name
      },
      updateChildren() {
        this.items.forEach((vm) => {
          // console.log(vm)
          let reserve = this.selectedIndex >= this.perIndex ? false : true
          if (this.timer) {
            if (this.selectedIndex === 0 && this.perIndex === this.items.length - 1) {
              reserve = false
            }
            if (this.selectedIndex === this.items.length - 1 && this.perIndex === 0) {
              reserve = true
            }
          }
          vm.reserve = reserve
          //当reserve被修改时，子组件依赖于reserve的状态还未更新 所以要在更新完后再改变被选择项（触发动画）
          this.$nextTick(() => {
            //被选中的子元素的selected值会被修改成当前组件中更新的selected，在子组件中会判断子组件内部的selected值和name值是否相同，相同则显示这个子组件
            vm.selected = this.getSelected()
          })
        })
      },
      triggerAutoPlay() {
        if(!this.autoPlay){return}
        if (this.timer) {
          return
        }
        let run = () => {
          let index = this.names.indexOf(this.getSelected())
          let newIndex = index + 1

          this.sendSelectedName(newIndex)
          this.timer = setTimeout(run, this.autoPlayDelay)
        }
        this.timer = setTimeout(run, this.autoPlayDelay)
      },
      //触发变化的函数，将被选的子组件name以单项数据流形式更新到当前组件的selected中，
      // 当前组件通过watch监听selected的变化调用updateChildren更新视图
      sendSelectedName(index) {
        if (index === -1) {
          index = this.items.length - 1
        }
        if (index === this.items.length) {
          index = 0
        }
        //此时的selectedIndex是触发sendSelectedName前的index值 perIndex就代表'之前的index'
        this.perIndex = this.selectedIndex
        //单项数据流 更新被选name 触发updateChildren
        this.$emit('update:selected', this.names[index])
      },
      pause() {
        clearTimeout(this.timer)
        this.timer = null
      },
      onMouseenter() {
        this.pause()
      },
      onMouseleave() {
        this.triggerAutoPlay()
      },
      onTouchStart(e) {
        this.pause()
        this.startTouch = e.touches[0]
        console.log('onTouchStart')
      },
      onTouchEnd(e) {
        this.endTouch = e.changedTouches[0]
        let x1 = this.startTouch.clientX
        let y1 = this.startTouch.clientY
        let x2 = this.endTouch.clientX
        let y2 = this.endTouch.clientY

        let distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
        let deltaY = Math.abs(y2 - y1)
        if (distance / deltaY > 2) {
          if (this.endTouch.clientX > this.startTouch.clientX) {
            console.log('向右')
            console.log(this.selectedIndex + 1);
            this.sendSelectedName(this.selectedIndex - 1)
          }
          if (this.endTouch.clientX < this.startTouch.clientX) {
            console.log('向左')
            this.sendSelectedName(this.selectedIndex + 1)

          }
        }

        this.$nextTick(() => {
          this.triggerAutoPlay()
        })
        console.log('onTouchEnd')
      },
      onTouchMove() {
        console.log('onTouchMove')
      }
    },

  }
</script>

<style scoped lang="scss">
    @import "../../style_var";
    .c-slides {
        margin: 40px;
        display: block;
        .c-slides-window {
            width: 100%;
            overflow: hidden;
            .c-slides-wrapper {
                position: relative;
                > * {
                    /*width: 100%;*/
                }
            }
        }
        .dot-wrap {
            padding: 4px 0;
            display: flex;
            justify-content: center;
            align-items: center;
            span {
                margin-right: 1em;
                display: inline-flex;
                justify-content: center;
                align-items: center;
                border-radius: 50%;
                width: 1.5em;
                height: 1.5em;
                font-size: 12px;
                background-color: #ccc;
                &.active {
                    color: #fff;
                    &:hover {
                        cursor: default;
                    }
                }
                &:hover {
                    cursor: pointer;
                }
            }

        }
    }
</style>