---
sidebarDepth: 2
---
# upload

## 需求演示

- 上传一个或一些文件
- 展示上传的进度
- 控制上传数量
- 按照不同形式展示文件列表
- model为ordinary时显示上传文件的名称和体积
- model为ordinary时可自定义上传按钮
- model为picture-card时上传成功后可预览

<ClientOnly>
  <upload-demo></upload-demo>
  <upload-demo2></upload-demo2>
</ClientOnly>

## API
| 参数   | 说明   | 类型  | 默认值 |
| -------- | -------- | ------- | ------ |
| action | 上传的地址 | String | 必填  |
| name     | 发到后台的文件参数名	 | String  | 必填    |
| fileList     | 已经上传的文件列表 | Array  | []    |
| model | 上传列表的样式，支持两种基本样式 ordinary 和 picture-card | String | 默认值：ordinary  |
| maxLength    | 可上传数量 | String,Number  | 0   |


## 实现思路

- 通过插槽实现自定义上传按钮
- 点击按钮动态创建input,监听change事件
- 使用new FormData() 保存数据，将name和file对应起来
- 通过单向数据流更新fileList
- 使用ajax的onUploadProgress回调获取上传进度
- 后端使用nodejs编写，nodejs中间件监听请求。前端跨域发送复杂请求，所以监听post请求的同时需要监听option预检请求。部署到云服务器，使用pm2守护进程

