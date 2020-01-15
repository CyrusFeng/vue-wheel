---
sidebarDepth: 2
---
# toast

## 需求演示

- 编辑弹出内容
- 出现的位置
- 设置自动关闭

<ClientOnly>
  <toast-demo></toast-demo>
</ClientOnly>


- 点击关闭
- 关闭回调函数

<ClientOnly>
  <toast-demo2></toast-demo2>
</ClientOnly>

## API

| 参数   | 说明   | 类型  | 默认值 |
| -------- | -------- | ------- | ------ |
| position  | 出现的位置 | String  | top  |
| enableHtml  |  是否可以传入html | Boolean  | false   |
| autoClose  | 是否自动关闭 | Boolean | true  |
| autoClose  | 是否自动关闭 | Number | 2 |
| closeButton   | 关闭及回调 | obj  | 无默认值，数据格式:{text: '关闭', callback: ()=>{}}  |

## 实现逻辑
- 根据toast组件应有的功能，选择使用插件方式开发，将$toast方法挂载到Vue实例上。使用Vue.use()即可直接引用。
- 通过Vue.extend注册组件，再调用new方法创建这个组件的实例，new的同时就可以通过给propsData赋值的方式给组件传参了。