<template>
    <div class="wrapper" :class="{'picture-card':model==='picture-card'}">
        <!--<form :action="action" method="post" enctype="multipart/form-data" ref="form">-->
        <!--<input type="file" name="file">-->
        <!--<input type="submit" value="提交">-->
        <!--</form>-->
        <!--<img src="" alt="" ref="img">-->

        <div @click="onClickUpload" class="submit">
            <div class="style" v-if="model === 'ordinary'">
                <slot></slot>
                <slot name="tips"></slot>
            </div>
        </div>

        <div ref="temp" class="hidden"></div>

        <ol>
            <li v-for="(item,index) in fileList" :key="item.id" v-if="!item.removed">

                <div class="item-wrap" v-if="model === 'ordinary'">
                    <div class="loading" v-if="item.status === 0 && additional[index].loading">
                        <c-icon name="loading-solid" width="30px" height="30px" :rotate="true"></c-icon>
                    </div>
                    <div class="loading" v-if="item.status === 0 && !additional[index].loading">
                        <c-icon name="file" class="icon" :class="{'error':!additional[index].result}" width="30px"
                                height="30px"></c-icon>
                    </div>
                    <div class="img-wrap" v-if="item.status === 1">
                        <img :src="item.url" v-if="item.type.substring(0,item.type.indexOf('/')) === 'image'">
                        <c-icon class="icon" :class="{'error':!additional[index].result}" name="file" v-else></c-icon>
                    </div>
                    <div class="right">
                        <div class="desc">
                            <span>{{item.fileName || item.name}}</span>
                            <!--<span>{{item.type}}</span>-->
                            <span class="size">{{bytesToSize(item.size)}}</span>
                        </div>
                        <!--<div class="progress" v-if="additional[index].percent!==100">-->
                        <div class="progress">
                            <div class="c-progress-outer">
                                <div class="c-progress-inner">
                                    <div class="c-progress-bg" v-if="additional[index]"
                                         :style="{width: additional[index].percent+'%'}"
                                         :class="{'error':!(additional[index].result!==false)}"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <c-icon class="remove" name="remove" @click="doRemove(item)"></c-icon>
                </div>


                <div class="item-wrap" v-if="model === 'picture-card'">
                    <div class="img-wrap" v-if="!additional[index].loading">
                        <img :src="item.url" @load="imgLoaded(index)"
                             v-if="item.type.substring(0,item.type.indexOf('/')) === 'image'">
                        <c-icon class="icon" :class="{'error':!additional[index].result}" name="file" v-else></c-icon>
                        <!--<c-icon class="remove" name="remove" @click="doRemove(item)"></c-icon>-->
                    </div>
                    <div class="mask" v-if="item.status === 1">
                        <div class="control">
                            <c-icon name="eye" class="icon" width="20px" height="20px"
                                    @click="openPreview(item.url)"></c-icon>
                            <c-icon name="trash" @click="doRemove(item,index)" class="icon" width="20px"
                                    height="20px"></c-icon>
                        </div>
                    </div>
                    <div class="loading" v-if="(item.status === 0 && additional[index].result === undefined)">
                        <div class="desc">文件上传中</div>
                        <div class="progress"
                             v-if="additional[index].percent!==100 || additional[index].imgLoaded === false">
                            <div class="c-progress-outer">
                                <div class="c-progress-inner">
                                    <div class="c-progress-bg" v-if="additional[index]"
                                         :style="{width: additional[index].percent+'%'}"
                                         :class="{'error':!(additional[index].result!==false)}"></div>
                                </div>
                            </div>
                        </div>
                        <c-icon class="remove" name="remove" @click="doRemove(item)"></c-icon>
                    </div>
                </div>

            </li>
            <li class="picture-card" v-if="model==='picture-card' && allFileLenght<maxLength">
                <div @click="onClickUpload" class="submit">
                    <div class="style" v-if="model === 'picture-card'">
                        <div class="picture-btn">
                            <c-icon name="add" class="icon"></c-icon>
                            <div class="desc">upload</div>
                        </div>
                    </div>
                </div>

            </li>

        </ol>
        <div class="preview-wrap" v-show="previewVisible">
            <div class="img-wrap">
                <img :src="url" alt="" ref="previewImg" @load="imgVisibel = true">
                <c-icon name="loading" width="30px" height="30px" :rotate="true" v-if="!imgVisible"></c-icon>
            </div>
            <c-icon class="remove" name="remove"
                    @click="previewVisible = false"
                    width="20px" height="20px"></c-icon>
        </div>
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
      },
      model: {
        type: String,
        default: 'ordinary'
      },
      maxLength: {
        type: [Number, String],
        default: 0
      }
    },
    data() {
      return {
        methods: 'post',
        additional: [],
        removedFileIndexs: [],
        previewVisible: false,
        url: '',
        imgVisible: false,
        allFileLenght:0
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
          console.log(localFiles.length)

          //获取已上传文件数量与正准备上传文件数量之和
          let showNum = JSON.parse(JSON.stringify(this.fileList)).filter((item) => {
            return item.removed !== true
          }).length
          let fileListLength = showNum + localFiles.length
          let doingNum = this.fileList.length

          if (this.maxLength !== 0 && fileListLength <= this.maxLength) {
            this.allFileLenght = fileListLength

            for (let i = 0; i < localFiles.length; i++) {
              console.log(localFiles[i])
              let { name, type, size } = localFiles[i]
              console.log(name, type, size)
              // localFiles[i].name = `M${this.formatPart(Date.nows)}${Math.floor(Math.random() * 100000000)}_${this.formatAll(Date.now)}`
              // M${formatPart(Date.now)}${Math.floor(Math.random()*100000000)}_${formatAll(Date.now)}

              // 防止本地文件与已上传的文件重名
              let j = 1
              while (this.fileList.filter((item) => {
                return item.removed !== true
              }).filter((item) => item.name === name).length > 0) {

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
                this.$emit('update:fileList', [...this.fileList, {
                  name,
                  type,
                  size,
                  status: 0,
                  precent: 0,
                  removed: false
                }])
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


              // this.$set(copyToUpdateFile.percent,0)

              let obj = {
                name,
                percent: 0,
                loading: true,
                result: undefined,
                removed: false,
                imgLoaded: false
              }
              this.additional.push(obj)
              // let doingNum = this.fileList.length - localFiles.length
              // let doingNum = this.fileList.length
              let _this = this

              let CancelToken = axios.CancelToken;
              let source = CancelToken.source();
              console.log('-------')
              console.log(doingNum + i)
              console.log(_this.fileList.length)

              _this.additional[doingNum + i].source = source
              axios({
                method: 'post',
                url: this.action + '/upload',
                headers: {
                  'Content-Type': 'multipart/form-data; charset=UTF-8'
                },
                data: formData,
                onUploadProgress: function (progressEvent) { //原生获取上传进度的事件
                  // if(progressEvent.lengthComputable){
                  //   //属性lengthComputable主要表明总共需要完成的工作量和已经完成的工作是否可以被测量
                  //   //如果lengthComputable为false，就获取不到progressEvent.total和progressEvent.loaded
                  //   // callback1(progressEvent);
                  //   copyToUpdateFile.percent = progressEvent.loaded / progressEvent.total * 100 | 0
                  //     console.log(copyToUpdateFile.percent)
                  // }
                  let percent = progressEvent.loaded / progressEvent.total * 100 | 0

                  // if (_this.removedFileIndexs.length > 0) {
                  //   _this.removedFileIndexs.forEach((index) => {
                  //     if (i - 1 === index) {
                  //       _this.additional[doingNum + i - 1].percent = percent
                  //       _this.additional[doingNum + i - 1].loading = true
                  //     } else {
                  //       _this.additional[doingNum + i].percent = percent
                  //       _this.additional[doingNum + i].loading = true
                  //     }
                  //   })
                  // }
                  // else {
                  //   if (_this.additional[doingNum + i]) {
                  //     _this.additional[doingNum + i].percent = percent
                  //     _this.additional[doingNum + i].loading = true
                  //   }
                  // }

                  if (_this.additional[doingNum + i]) {
                    _this.additional[doingNum + i].percent = percent
                    _this.additional[doingNum + i].loading = true
                  }
                },
                cancelToken: source.token
              })
                .then((response) => {
                  // let backFile = JSON.parse(response.data)
                  let backFile = response.data
                  console.log(backFile)


                  // this.url = `http://47.240.0.229:3000/preview/${backFile.originalname}?type=${this.type}`
                  // let url = `${this.action}/preview/${backFile.originalname}?type=${this.type}`
                  let url = `${this.action}/preview/${backFile.filename}?type=${this.type}`

                  //通过名称找到刚才放进fileList中的本地文件
                  // console.log('父组件给子组件传的数组（子组件向父组件发送数据后）',this.fileList)

                  let toUpdateFile = this.fileList.filter((item) => item.name === name)[0]
                  // let toUpdateFile = { name, type, size, status: 0}
                  let copyToUpdateFile = JSON.parse(JSON.stringify(toUpdateFile))
                  let index = this.fileList.indexOf(toUpdateFile)
                  console.log('-------------------')
                  //拷贝一份本地文件对象并增加一些属性
                  // let copyToUpdateFile = JSON.parse(JSON.stringify(toUpdateFile))
                  copyToUpdateFile.url = url
                  copyToUpdateFile.id = backFile.filename
                  // copyToUpdateFile.status = backFile.status
                  copyToUpdateFile.status = 1
                  copyToUpdateFile.fieldname = backFile.fieldname
                  copyToUpdateFile.fileName = name
                  copyToUpdateFile.mimetype = backFile.mimetype
                  copyToUpdateFile.size = backFile.size

                  console.log('-------------------')
                  //拷贝一份已上传文件数组，在该拷贝数组中用新的本地文件对象替换之前的本地文件对象
                  let copyFileList = JSON.parse(JSON.stringify(this.fileList))
                  copyFileList.splice(index, 1, copyToUpdateFile)
                  console.log('-------------------')
                  this.$emit('update:fileList', copyFileList)
                  if (_this.additional[doingNum + i]) {
                    _this.additional[doingNum + i].loading = false
                    _this.additional[doingNum + i].result = true
                  }
                })
                .catch((error) => {
                  console.log(error)
                  if (error.message.indexOf('取消') === -1) {
                    // if (_this.removedFileIndexs.length > 0) {
                    //   _this.removedFileIndexs.forEach((index) => {
                    //     if (i - 1 === index) {
                    //       _this.additional[doingNum + i - 1].loading = false
                    //       _this.additional[doingNum + i - 1].result = false
                    //     } else {
                    //       _this.additional[doingNum + i].loading = false
                    //       _this.additional[doingNum + i].result = false
                    //     }
                    //   })
                    // }
                    // else {
                    //   if (_this.additional[doingNum + i]) {
                    //     _this.additional[doingNum + i].loading = false
                    //     _this.additional[doingNum + i].result = false
                    //   }
                    // }
                    if (_this.additional[doingNum + i]) {
                      _this.additional[doingNum + i].loading = false
                      _this.additional[doingNum + i].result = false
                    }
                  }
                  else {
                    // _this.removedFileIndexs.push(Number(error.message.substring(0, error.message.indexOf('取消'))))
                  }

                })

            }
          } else {
            alert(`最多只能上传${this.maxLength}个文件`)
          }


        })
        inputDom.click()
//在页面中移除input标签
        inputDom.remove()
      },
      doRemove(item) {

        let index = this.fileList.indexOf(item)
        console.log('-------------')
        console.log(index)
        console.log(item)
        //取消对应的ajax请求
        this.additional[index].source.cancel(`${index}取消`)


        // let copyFileList = JSON.parse(JSON.stringify(this.fileList))
        // copyFileList.splice(index, 1)
        // console.log('-------------------')
        let copyFileList = JSON.parse(JSON.stringify(this.fileList))
        copyFileList[index].removed = true
        this.$emit('update:fileList', copyFileList)
        // this.additional.splice(index, 1)
        this.additional[index].removed = true

        this.allFileLenght -= 1

      },
      openPreview(url) {
        this.previewVisible = true
        this.url = url
      },
      bytesToSize(bytes) {
        if (bytes === 0) return '0 B';
        let k = 1024;
        let sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        let i = Math.floor(Math.log(bytes) / Math.log(k));
        return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
      },
      imgLoaded(index) {
        return this.additional[index].imgLoaded = true
      }
    }
  }
</script>

<style scoped lang="scss">
    .wrapper {
        width: 100%;
        padding: 42px 24px 50px;
        font-size: 0;

        .hidden {
            /*float: left;*/
            /*order: 1;*/
        }

        .item-wrap {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            padding: 8px;
            border-radius: 4px;
            border: 1px solid #d9d9d9;
            height: 66px;
            position: relative;
            margin-top: 8px;
            font-size: 14px;
            .loading {
                width: 48px;
                height: 48px;
                display: flex;
                justify-content: center;
                align-items: center;
                .error {
                    color: #f5222d !important;
                }
            }
            .img-wrap {
                width: 48px;
                height: 48px;
                /*display: block;*/
                overflow: hidden;
                display: inline-flex;
                justify-content: center;
                align-items: center;
                .icon {
                    width: 60%;
                    height: 60%;
                    color: #1890ff;
                    /*max-width: 100%;*/
                    /*max-height: 100%;*/
                    &.error {
                        color: #f5222d !important;
                    }
                }
            }
            .right {
                padding-left: 10px;
                flex: 1;
                .desc {
                    margin-bottom: 6px;

                    /*margin: 0 0 0 8px;*/
                    /*line-height: 44px;*/
                    transition: all 0.3s;
                    /*padding-right: 8px;*/
                    max-width: 100%;
                    display: inline-flex;
                    justify-content: flex-start;
                    align-items: flex-end;
                    box-sizing: border-box;
                    font-size: 14px;
                    span {
                        display: inline-block;
                        max-width: 300px;
                        margin-right: 8px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        line-height: 1.5;
                        &.size {
                            font-size: 12px;
                            color: #999;
                        }
                    }
                }
                .progress {
                    .c-progress-outer {
                        display: inline-block;
                        width: 100%;
                        margin-right: 0;
                        padding-right: 20px;
                        .c-progress-inner {
                            position: relative;
                            display: inline-block;
                            width: 100%;
                            height: 8px;
                            overflow: hidden;
                            vertical-align: middle;
                            background-color: #f5f5f5;
                            border-radius: 100px;
                            .c-progress-bg {
                                width: 0;
                                height: 100%;
                                position: relative;
                                background-color: #1890ff;
                                border-radius: 100px;
                                transition: all 0.4s cubic-bezier(0.08, 0.82, 0.17, 1) 0s;
                                &.error {
                                    background-color: #f5222d;
                                }
                            }
                        }
                    }
                }
            }
            .remove {
                position: absolute;
                right: 8px;
                top: 8px;
                line-height: 1;
                opacity: 1;
            }
        }

        .preview-wrap {
            position: fixed;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            z-index: 1000;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: rgba(0, 0, 0, 0.65);
            .img-wrap {
                padding: 24px;
                width: 600px;
                height: 600px;
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
            .remove {
                position: absolute;
                right: 20px;
                top: 20px;
            }
        }
        &.picture-card {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            flex-wrap: wrap;

            .submit {
                order: 3;
                float: left;
            }
            ol {
                display: inline-flex;
                justify-content: flex-start;
                align-items: center;
                order: 2;
                flex-wrap: wrap;
                li {
                    display: inline-flex;
                    .item-wrap {
                        margin: 0 8px 8px 0;
                        padding: 8px;
                        display: inline-flex;
                        width: 104px;
                        height: 104px;
                        border-radius: 4px;
                        border: 1px solid #d9d9d9;
                        position: relative;
                        box-sizing: content-box;
                        .img-wrap {
                            width: 104px;
                            height: 104px;
                            /*display: block;*/
                            overflow: hidden;
                            display: inline-flex;
                            justify-content: center;
                            align-items: center;
                            img {
                                max-width: 100%;
                                max-height: 100%;
                            }
                            .icon {
                                width: 50%;
                                height: 50%;
                                color: #1890ff;
                                /*max-width: 100%;*/
                                /*max-height: 100%;*/
                            }
                        }
                        .mask {
                            position: absolute;
                            top: 0;
                            left: 0;
                            width: 100%;
                            height: 100%;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            background-color: rgba(101, 101, 101, 0.4);
                            color: #ffffff;
                            opacity: 0;
                            transition: opacity 0.3s;
                            &:hover {
                                opacity: 1;
                            }
                            .icon {
                                margin-right: 10px;
                                color: #fff;
                                opacity: 0.7;
                                transition: opacity 0.3s;
                                &:hover {
                                    opacity: 1;
                                }
                                &:last-child {
                                    margin-right: 0;
                                }
                            }

                        }
                        .loading {
                            width: 100%;
                            height: 100%;
                            display: flex;
                            justify-content: flex-start;
                            align-items: flex-start;
                            flex-direction: column;
                            .desc {
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                                /*margin: 0 0 0 8px;*/
                                line-height: 44px;
                                transition: all 0.3s;
                                /*padding-right: 8px;*/
                                max-width: 100%;
                                display: inline-block;
                                box-sizing: border-box;
                                font-size: 14px;
                                span {
                                    margin-right: 8px;
                                }
                            }
                            .progress {
                                width: 100%;
                                height: 6px;
                                .c-progress-outer {
                                    display: inline-block;
                                    width: 100%;
                                    height: 100%;
                                    margin-right: 0;
                                    padding-right: 0;
                                    .c-progress-inner {
                                        position: relative;
                                        display: inline-block;
                                        width: 100%;
                                        height: 100%;
                                        overflow: hidden;
                                        vertical-align: middle;
                                        background-color: #f5f5f5;
                                        border-radius: 100px;
                                        .c-progress-bg {
                                            width: 0;
                                            height: 100%;
                                            position: relative;
                                            background-color: #1890ff;
                                            border-radius: 100px;
                                            transition: all 0.4s cubic-bezier(0.08, 0.82, 0.17, 1) 0s;
                                            &.error {
                                                background-color: #f5222d;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    .style {
                        margin-right: 8px;
                        margin-bottom: 8px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        border: 1px dashed #d9d9d9;
                        width: 120px;
                        height: 120px;
                        border-radius: 4px;
                        background-color: #fafafa;
                        text-align: center;
                        cursor: pointer;
                        transition: border-color 0.3s ease;
                        user-select: none;
                        .picture-btn {
                            display: flex;
                            flex-direction: column;
                            justify-content: center;
                            align-items: center;
                            .desc {
                                margin-top: 8px;
                                color: #666;
                                font-size: 14px;
                            }
                            .icon {
                                width: 32px;
                                height: 32px;
                                color: #999;
                            }
                        }
                    }
                }

            }
        }
    }

</style>