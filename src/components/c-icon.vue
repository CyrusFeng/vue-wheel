<template>
    <svg class="c-icon" @click="$emit('click')">
        <use :xlink:href="`#i-${name}`"></use>
    </svg>
</template>

<script>
  import '../svg'

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
    }
</style>