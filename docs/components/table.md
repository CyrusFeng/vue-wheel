---
sidebarDepth: 2
---
# table

## 需求演示

- 固定表头
- 前端排序
- 服务端排序
- 设置表格高度
- 全选
- 编辑
- 是否缩略模式、是否显示斑马线、是否显示边框、是否显示序号


<ClientOnly>
  <table-demo></table-demo>
  <table-demo2></table-demo2>
</ClientOnly>


## API

| 参数   | 说明   | 类型  | 默认值 |
| -------- | -------- | ------- | ------ |
| numberVisible  | 是否显示序号 | Boolean  | true  |
| bordered     | 是否显示边框 | Boolean  | true     |
| compact | 是否缩略显示 | Boolean | true  |
| striped | 是否显示斑马线 | Boolean | true  |
| isFrontendSort | 是否前端排序 | Boolean | true  |
| height | 表格高度 | Number | 无  |

## 实现的逻辑
- 通过单项数据流改变columns和selectedTableItems等数据，组件内部监听columns变化来进行前端或后端排序、通过selectedTableItems展示被选项
- 将表格的表头通过append函数添加到新的table标签中，再将这个新table标签绝对定位到原表格表头的位置实现表头固定
- 通过作用域插槽将组件内部数据暴露出来，实现对数据的操作功能
- 后端排序模式下，将当前每列的排序方式以对象数组形式传递到getOrderedList函数(用户自定义请求)