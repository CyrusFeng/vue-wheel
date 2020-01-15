---
sidebarDepth: 2
---
# cascader

## 需求演示

- 数据一次性全部请求后，当选中某一级时，展示下一级数据

<ClientOnly>
  <cascader-demo2></cascader-demo2>
</ClientOnly>


## 需求演示

- 当选中某一级时，动态加载下一级数据

<ClientOnly>
  <cascader-demo></cascader-demo>
</ClientOnly>

## API
- c-cascader


| 参数   | 说明   | 类型  | 默认值 |
| -------- | -------- | ------- | ------ |
| complete-source | 数据源 | Array | 必填  |
| load-data     | 当需要动态加载数据时，自定义的次级列表查询函数 | Function  | 无，参数为id 和 回调函数  |

- c-cascader-item

| 参数   | 说明   | 类型  | 默认值 |
| -------- | -------- | ------- | ------ |
| selectedData | 选中的内容 | Array | []  |
| load-data    | 次级列表查询函数 | Function  | 参数为id 和 回调函数，需要返回一个promise对象   |
| level    | 当前子组件层级 | Number  |  0 |
| source    | 当前子组件层级 | 需要展示的数据  | [] |

## 实现逻辑
- 拟定好数据源的数据结构，展示全部数据时逐级展示，使用动态加载模式时将数据拼凑为定好的数据结构即可
- 为了让使用者可以自定义请求函数，所以组件需要暴露load-data接口，当我们在子组件完成加载下一级的逻辑后，将即将被请求的下一级数据id和组件内部的回调函数传给load-data
- 点击组件外部使弹出层消失是一个通用的dom操作，所以将这个功能封装为一个Vue的自定义指令


