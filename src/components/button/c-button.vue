<template>
    <button class="c-btn c-btn-default">
        <!--<i data-v-c91678b8="" class="anticon anticon-upload"></i>-->
        <c-icon :name="name"></c-icon>
        <span>upload</span>
    </button>
</template>

<script>
  export default {
    name: "c-button",
    props: {
      name: {
        type: String
      }
    }
  }
</script>

<style scoped lang="scss">
    .c-btn{
        display: inline-flex;
        justify-content: center;
        align-items: center;
        line-height: 1.499;
        /*display: inline-block;*/
        font-weight: 400;
        text-align: center;
        touch-action: manipulation;
        cursor: pointer;
        background-image: none;
        border: 1px solid #d9d9d9;
        white-space: nowrap;
        padding: 0 15px;
        font-size: 14px;
        border-radius: 4px;
        height: 32px;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
        position: relative;
        box-shadow: 0 2px 0 rgba(0, 0, 0, 0.015);
        color: rgba(0, 0, 0, 0.65);
        background-color: #fff;
        outline:none;
        &:hover,&:focus{
            text-decoration: none;
            color: #40a9ff;
            background-color: #fff;
            border-color: #40a9ff;
        }
        span{
           margin-left: 8px;
        }
    }
</style>