<template>
    <svg class="c-icon" :class="{rotate}" @click="$emit('click')" :style="{width,height}">
        <use :xlink:href="`#icon-${name}`"></use>
        <!--<use :xlink:href="`#i-${name}`"></use>-->
    </svg>
</template>

<script>
  // import '../../svgALi'
  import '../../aaaaaa'
  // import 'http://at.alicdn.com/t/font_987168_g21was43nsb.js'
  // import '../../icons/index';
  export default {
    name: "c-icon",
    props: {
      name: {
        type: String
      },
      width:{
        type:[Number,String]
      },
      height:{
        type:[Number,String]
      },
      rotate:{
        type:Boolean
      },
      scriptUrl:{
        type:String
      }

    }
  }
</script>

<style scoped lang="scss">
    .c-icon {
        width: 1em;
        height: 1em;
        fill: currentColor; /* 关键 */
        /*fill: red;*/
        overflow: hidden;
    }
    .rotate{
        animation: rotate 1s linear infinite;
    }
    @keyframes rotate{
        from{transform: rotate(0deg)}
        to{transform: rotate(359deg)}
    }
</style>