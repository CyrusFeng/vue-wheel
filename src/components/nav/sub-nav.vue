<template>
    <div class="sub-nav-wrap">
        <span>
            <slot name="title"></slot>
        </span>
        <div class="sub-nav">
            <slot></slot>
        </div>
    </div>
</template>

<script>
  export default {
    name: "sub-nav",
    inject:['root'],
  }
</script>

<style scoped lang="scss">
    .sub-nav-wrap {
        position: relative;
        padding: 6px 10px;

        .sub-nav{
            position: absolute;
            left: 0;
            top: 100%;
            border: 1px solid #000;
            white-space: nowrap;
        }
    }
</style>