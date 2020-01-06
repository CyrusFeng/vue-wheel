<template>
    <div class="c-rate">
        <span 
            class="c-rate-item" 
            :class="['c-rate-item',{'c-rate-active':n<=current}]"
            v-for="n in total" :key="n" @click="onClick($event,n)" 
            :style="{
                'height':size+'px',
                'width':size+'px',
                'marginRight':spacing+'px',
                'backgroundImage':n<=current?checkedIcon:uncheckedIcon,
            }">
        </span>
    </div>
</template>
<script>
  // 'backgroundImage':n<=current?`url(${checkedIcon})`:`url(${uncheckedIcon})`,
  // 'backgroundImage':n<=current?`url(${checkedIcon})`:`url('../assets/star_active.png')`


  export default {
    name:'c-rate',
    props: {
        total:{
            type:[String,Number],
            default:5
        },
        value:{
            type:[String, Number],
            default:3
        },
        size:{
            type:[String,Number],
            default:25
        },
        uncheckedIcon:{
            type:String,
            default:null
        },
        checkedIcon:{
            type:String,
            default:null
        },
        readOnly:{
            type:Boolean,
            default: false
        },
        spacing:{
            type:[String,Number],
            default: 20
        },
    },
    data() {
        return {
            current: 0,
        };
    },
    created(){
        this.current = this.value;
    },
    methods: {
        onClick($event,idx){
            if(this.readOnly){
                this.$emit('input',this.current);
                this.$emit('click',this.current);
            }else{
              console.log('idx',idx)
              if(this.current === idx){
                this.current = idx-1
              }else{
                this.current = idx;
              }
              this.$emit('input',this.current);
              this.$emit('click',this.current);
            }
        }
    }
}
</script>
<style lang="scss" scoped>
    .c-rate {
        padding: 0.12rem 0 0.16rem 0;
        display: flex;
        justify-content: center;
        background: #fff;
        .c-rate-item {
            display: inline-block;
            vertical-align: bottom;
            width: 30px;
            height: 30px;
            margin-right: 15px;
            background-image: url("../../assets/star.png");
            background-size: cover;
            &:last-child {
                margin-right: 0 !important;
            }
            &.c-rate-active {
                background-image: url("../../assets/star_active.png");
            }
        }
    }
</style>
