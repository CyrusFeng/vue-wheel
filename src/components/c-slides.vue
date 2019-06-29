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
            <span v-for="n in childrenLength"
                  :class="{'active':selectedIndex===n-1}" @click="sendSelectedName(n-1)">{{n}}</span>
        </div>
    </div>
</template>

<script>
  export default {
    name: "g-slides",
    props: {
      selected: {
        type: String
      },
      autoPlay: {
        type: Boolean,
        default: true
      },
      reserve: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        names: [],
        childrenLength: 0,
        perIndex: 0,
        timer: null,
        startTouch:null,
        endTouch:null
      }
    },
    computed: {
      selectedIndex() {
        return this.names.indexOf(this.getSelected())
      }
    },
    mounted() {
      this.childrenLength = this.$children.length

      // this.$children.forEach((vm) => {
      //   vm.reserve = this.reserve
      // })
      this.names = this.$children.map((vm) => {
        return vm.name
      })
      this.updateChildren()
      // this.triggerAutoPlay()


      // let first = this.$children[0]
      // let second = this.$children[1]
      // first.visible = true
      // setTimeout(() => {
      //   first.visible = false
      //   second.visible = true
      // }, 1000)
    },
    methods: {
      getSelected() {
        let first = this.$children[0]
        return this.selected || first.name
      },
      updateChildren() {
        this.$children.forEach((vm) => {
          // console.log(vm)
          let reserve = this.selectedIndex >= this.perIndex ? false : true
          if (this.timer) {
            if (this.selectedIndex === 0 && this.perIndex === this.$children.length - 1) {
              reserve = false
            }
            if (this.selectedIndex === this.$children.length - 1 && this.perIndex === 0) {
              reserve = true
            }
          }
          vm.reserve = reserve
          //当reserve被修改时，子组件依赖于reserve的状态还未更新 所以要在更新完后再改变被选择项（触发动画）
          this.$nextTick(() => {
            vm.selected = this.getSelected()
          })
        })
      },
      triggerAutoPlay() {
        if (this.timer) {
          return
        }
        // let index = this.names.indexOf(this.getSelected())
        // setInterval(()=>{
        //   if(index===names.length-1){index=-1}
        //   this.$emit('update:selected',names[index+1])
        //   index++
        // },1000)
        // 正序
        // let run = ()=>{
        //   if(index===this.names.length-1){index=-1}
        //   this.sendSelectedName(index+1)
        //   // this.$emit('update:selected',this.names[index+1])
        //   index++
        //   this.timer = setTimeout(run,2000)
        // }
        // 倒序
        // let run = () => {
        //   index--
        //   if (index === -1) {
        //     index = this.names.length - 1
        //   }
        //   this.$emit('update:selected', this.names[index])
        //   setTimeout(run, 1000)
        // }
        let run = () => {
          let index = this.names.indexOf(this.getSelected())
          let newIndex = index + 1

          this.sendSelectedName(newIndex)
          this.timer = setTimeout(run,2000)
        }
        this.timer = setTimeout(run, 2000)
      },
      sendSelectedName(index) {
        if(index===-1){index = this.$children.length - 1}
        if(index===this.$children.length){index = 0}
        this.perIndex = this.selectedIndex
        this.$emit('update:selected', this.names[index])
        console.log('index',index)
        console.log('this.names[index]',this.names[index])
      },
      pause() {
        clearTimeout(this.timer)
        this.timer = null
      },
      onMouseenter(){
        this.pause()
      },
      onMouseleave(){
        this.triggerAutoPlay()
      },
      onTouchStart(e){
        this.pause()
        this.startTouch = e.touches[0]
        console.log('onTouchStart')
      },
      onTouchEnd(e){
        this.endTouch = e.changedTouches[0]
        let x1 = this.startTouch.clientX
        let y1 = this.startTouch.clientY
        let x2 = this.endTouch.clientX
        let y2 = this.endTouch.clientY

        let distance = Math.sqrt(Math.pow(x2-x1,2)+Math.pow(y2-y1,2))
        let deltaY = Math.abs(y2-y1)
        if(distance/deltaY>2){
          if(this.endTouch.clientX > this.startTouch.clientX){
            console.log('向右')
            console.log(this.selectedIndex + 1);
            this.sendSelectedName(this.selectedIndex-1)
          }
          if(this.endTouch.clientX < this.startTouch.clientX){
            console.log('向左')
            this.sendSelectedName(this.selectedIndex+1)

          }
        }

        this.$nextTick(()=>{
          // this.triggerAutoPlay()
        })
        console.log('onTouchEnd')
      },
      onTouchMove(){
        console.log('onTouchMove')
      }
    },
    watch: {
      selected() {
        console.log(this.perIndex)
        this.updateChildren()
        console.log(this.selectedIndex)

      },
      // reserve(){
      //   this.$children.forEach((vm) => {
      //     vm.reserve = this.reserve
      //   })
      // }
    }
  }
</script>

<style scoped lang="scss">
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
            span{
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
                    &:hover{
                        cursor: default;
                    }
                }
                &:hover{
                    cursor: pointer;
                }
            }

        }
    }
</style>