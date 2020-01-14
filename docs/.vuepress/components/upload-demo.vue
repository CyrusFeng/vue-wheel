<template>
    <div class="container">
        <!--<h2>支持设置弹出位置、触发事件</h2>-->
        <p>
            <strong>预览：</strong>
        </p>
        <div class="wrap">
            <c-uploader action="http://47.240.0.229:3000" name="file" :fileList.sync="fileList" max-length="3">
                <c-button name="upload">upload</c-button>
            </c-uploader>
        </div>
        <p>
            <strong>代码：</strong>
        </p>
        <pre><code>{{code}}</code></pre>
    </div>
</template>

<script>
  import CUpload from '../../../src/components/uploader/c-uploader'
  import CButton from '../../../src/components/button/c-button'
  import CIcon from '../../../src/components/icon/c-icon'
  export default {
    name: "upload-demo",
    components: {
      'c-uploader': CUpload,
      'c-button': CButton,
      'c-icon': CIcon,
    },
    data() {
      return {
        code:`<c-uploader action="http://47.240.0.229:3000"
    name="file"
    :fileList.sync="fileList"
    max-length="3">
  <c-button name="upload"></c-button>
</c-uploader>`,
        fileList: [],
      }
    },
  }
</script>

<style scoped lang="scss">
    .container{
        /*font-size: 16px;*/
    }
    code{
        font-size: 14px;
    }
</style>