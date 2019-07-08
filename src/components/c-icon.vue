<template>
    <svg class="c-icon" @click="$emit('click')">
        <use :xlink:href="`#icon-${name}`"></use>
        <!--<use :xlink:href="`#i-${name}`"></use>-->
    </svg>
</template>

<script>
  import '../svgALi'
  // import '../icons/svg';
  export default {
    name: "c-icon",
    props: {
      name: {
        type: String
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
</style>