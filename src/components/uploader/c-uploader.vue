<template>
    <div class="wrapper">
        <!--<form :action="action" method="post" enctype="multipart/form-data" ref="form">-->
        <!--<input type="file" name="file">-->
        <!--<input type="submit" value="提交">-->
        <!--</form>-->
        <!--<img src="" alt="" ref="img">-->

        <div @click="onClickUpload" class="submit">
            <div class="style">
                <!--<c-icon class="icon" name="cancel"></c-icon>-->
                <slot></slot>
                <slot name="tips"></slot>
            </div>
        </div>
        <div ref="temp" class="hidden"></div>
        <ol>
            <li v-for="item in fileList" :key="item.id">
                <div class="item-wrap">
                    <div class="loading" v-if="item.status === 0">
                        <i class="icon"></i>
                    </div>
                    <div class="img-wrap" v-if="item.status === 1">
                        <img :src="item.url" v-if="item.type.substring(0,item.type.indexOf('/')) === 'image'">
                        <img src="../../assets/zanwushuju.png" v-else>
                    </div>
                    <div class="desc" v-if="item.status === 1">
                        <span>{{item.name}}</span>
                        <!--<span>{{item.type}}</span>-->
                        <span>{{item.size}}字节</span>
                    </div>
                    <c-icon class="remove" name="remove" @click="doRemove(item)"></c-icon>

                </div>
                <!--<div class="item-wrap">-->
                <!--<div class="img-wrap" v-if="item.type.substring(0,item.type.indexOf('/')) !== 'image'">-->
                <!--<img :src="item.url">-->
                <!--<i class="icon" @click="doRemove(item)" v-if="!flag"></i>-->
                <!--</div>-->
                <!--<div class="desc">-->
                <!--<span>{{item.name}}</span>-->
                <!--<span>{{item.type}}</span>-->
                <!--<span>{{item.size}}</span>-->
                <!--</div>-->
                <!--</div>-->
            </li>
        </ol>
    </div>
</template>

<script>
  import axios from 'axios'
  import CIcon from '../icon/c-icon'

  export default {
    name: "c-uploader",
    components: {
      'c-icon': CIcon
    },
    props: {
      action: {
        type: String,
      },
      name: {
        type: String
      },
      fileList: {
        type: Array,
      }
    },
    data() {
      return {
        methods: 'post'
      }
    },
    mounted() {
      // let form = this.$refs.form
      // form.addEventListener('submit',(e)=>{
      //   e.preventDefault()
      //   let formData = new FormData()
      //   formData.append(this.name,form[this.name].files[0])
      //
      //   let xhr = new XMLHttpRequest()
      //   xhr.open('POST',this.action)
      //   xhr.onload = ()=>{
      //     console.log(xhr.response)
      //     // this.$refs.img.src = `http://127.0.0.1:3000/preview/${xhr.response}`
      //     this.$refs.img.src = `http://47.240.0.229:3000/preview/${xhr.response}`
      //   }
      //   xhr.send(formData)
      // })
    },
    methods: {
      onClickUpload() {
        //创建input标签
        let inputDom = document.createElement('input')
        inputDom.type = 'file'
        inputDom.multiple = true
        this.$refs.temp.appendChild(inputDom)

        //监听input的change事件
        inputDom.addEventListener('change', () => {

          let localFiles = inputDom.files

          for (let i = 0; i < localFiles.length; i++) {
            console.log(localFiles[i])
            let { name, type, size } = localFiles[i]
            console.log(name, type, size)
            // localFiles[i].name = `M${this.formatPart(Date.nows)}${Math.floor(Math.random() * 100000000)}_${this.formatAll(Date.now)}`
            // M${formatPart(Date.now)}${Math.floor(Math.random()*100000000)}_${formatAll(Date.now)}

            // 防止本地文件与已上传的文件重名
            let j = 1
            while (this.fileList.filter((item) => item.name === name).length > 0) {

              let dotindex = name.indexOf('.')

              let firstHalf = name.substring(0, dotindex)
              let secondHalf = name.substring(dotindex)
              let num = `(${j})`
              name = firstHalf + num + secondHalf
              j++
            }

            //给本地文件增加status属性，并且暂时将本地文件放入已上传文件列表中，
            //获取到已上传的文件后,再将这个文件替换掉，目的是通过status字段显示正在上传的状态
            //注：此时的name可能是一个新的name
            // console.log('父组件给子组件传的数组（开始）',JSON.stringify(this.fileList))
            setTimeout(() => {
              this.$emit('update:fileList', [...this.fileList, { name, type, size, status: 0 }])
            }, 0)


            let formData = new FormData()
            formData.append(this.name, localFiles[i])

            // ajax上传本地文件到服务器
            // let xhr = new XMLHttpRequest()
            // // xhr.open(this.method, this.action + '?type=' + this.type)
            // xhr.open(this.method, this.action)
            // xhr.onload = () => {
            //   // console.log('-------------------')
            //   // console.log(xhr.response)
            //   let backFile = JSON.parse(xhr.response)
            //
            //   // let obj = {}
            //   // obj.file = backFile.newPath+'/'+backFile.originalname
            //   // obj.fileName = backFile.originalname.substring(0,backFile.originalname.lastIndexOf('.'))
            //   // obj.fileType = backFile.originalname.substring(backFile.originalname.lastIndexOf('.')+1,backFile.originalname.length)
            //   // obj.fileSize = backFile.size
            //   //
            //   // setTimeout(()=>{
            //   //   this.$emit('update:fileParam', obj)
            //   // },0)
            //
            //   // this.url = `http://47.240.0.229:3000/preview/${backFile.originalname}?type=${this.type}`
            //   this.url = `http://127.0.0.1:3000/preview/${backFile.originalname}?type=${this.type}`
            //
            //   //通过名称找到刚才放进fileList中的本地文件
            //   // console.log('父组件给子组件传的数组（子组件向父组件发送数据后）',this.fileList)
            //   let toUpdateFile = this.fileList.filter((item) => item.name === name)[0]
            //
            //   let index = this.fileList.indexOf(toUpdateFile)
            //   console.log('-------------------')
            //   //拷贝一份本地文件对象并增加一些属性
            //   let copyToUpdateFile = JSON.parse(JSON.stringify(toUpdateFile))
            //   copyToUpdateFile.url = this.url
            //   copyToUpdateFile.id = backFile.id
            //   copyToUpdateFile.status = backFile.status
            //   copyToUpdateFile.file = backFile.file
            //   copyToUpdateFile.fileName = backFile.fileName
            //   copyToUpdateFile.fileType = backFile.fileType
            //   copyToUpdateFile.fileSize = backFile.fileSize
            //
            //   console.log('-------------------')
            //   //拷贝一份已上传文件数组，在该拷贝数组中用新的本地文件对象替换之前的本地文件对象
            //   let copyFileList = JSON.parse(JSON.stringify(this.fileList))
            //   copyFileList.splice(index, 1, copyToUpdateFile)
            //   console.log('-------------------')
            //   this.$emit('update:fileList', copyFileList)
            //
            // }
            // xhr.send(formData)


            axios({
              method: 'post',
              url: this.action + '/upload',
              headers: {
                'Content-Type': 'multipart/form-data; charset=UTF-8'
              },
              data: formData
            }).then((response) => {
              console.log(response.data)
              // let backFile = JSON.parse(response.data)
              let backFile = response.data


              // this.url = `http://47.240.0.229:3000/preview/${backFile.originalname}?type=${this.type}`
              // let url = `${this.action}/preview/${backFile.originalname}?type=${this.type}`
              let url = `${this.action}/preview/${backFile.filename}?type=${this.type}`

              //通过名称找到刚才放进fileList中的本地文件
              // console.log('父组件给子组件传的数组（子组件向父组件发送数据后）',this.fileList)
              let toUpdateFile = this.fileList.filter((item) => item.name === name)[0]

              let index = this.fileList.indexOf(toUpdateFile)
              console.log('-------------------')
              //拷贝一份本地文件对象并增加一些属性
              let copyToUpdateFile = JSON.parse(JSON.stringify(toUpdateFile))
              copyToUpdateFile.url = url
              copyToUpdateFile.id = backFile.id
              // copyToUpdateFile.status = backFile.status
              copyToUpdateFile.status = 1
              copyToUpdateFile.file = backFile.file
              copyToUpdateFile.fileName = backFile.fileName
              copyToUpdateFile.fileType = backFile.fileType
              copyToUpdateFile.fileSize = backFile.fileSize

              console.log('-------------------')
              //拷贝一份已上传文件数组，在该拷贝数组中用新的本地文件对象替换之前的本地文件对象
              let copyFileList = JSON.parse(JSON.stringify(this.fileList))
              copyFileList.splice(index, 1, copyToUpdateFile)
              console.log('-------------------')
              this.$emit('update:fileList', copyFileList)
            })

          }


        })
        inputDom.click()
//在页面中移除input标签
        inputDom.remove()
      },
      doRemove(item){
        let index = this.fileList.indexOf(item)
        let copyFileList = JSON.parse(JSON.stringify(this.fileList))
        copyFileList.splice(index, 1)
        console.log('-------------------')
        this.$emit('update:fileList', copyFileList)
      }
    }
  }
</script>

<style scoped lang="scss">
    .wrapper{
        padding: 42px 24px 50px;
    }
    .item-wrap {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding: 8px;
        border-radius: 4px;
        border: 1px solid #d9d9d9;
        /*height: 66px;*/
        position: relative;
        margin-top: 8px;
        font-size: 14px;
        .img-wrap {
            width: 48px;
            height: 48px;
            display: block;
            overflow: hidden;
            display: inline-flex;
            justify-content: center;
            align-items: center;
            img {
                /*width: 100%;*/
                /*height: 100%;*/
                max-width: 100%;
                max-height: 100%;
            }
        }
        .desc {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            /*margin: 0 0 0 8px;*/
            line-height: 44px;
            transition: all 0.3s;
            padding-left: 10px;
            /*padding-right: 8px;*/
            max-width: 100%;
            display: inline-block;
            box-sizing: border-box;
            font-size: 14px;
            span {
                margin-right: 8px;
            }
        }
        .remove{
            position: absolute;
            right: 8px;
            top: 8px;
            line-height: 1;
            opacity: 1;
        }
    }
</style>