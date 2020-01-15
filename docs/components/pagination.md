---
sidebarDepth: 2
---
# pagination

## 需求演示

- 默认展示第一页、最后一页、当前页、当前页-1、当前页-2、当前页+1、当前页+2，其余用...代替

<ClientOnly>
  <pagination-demo></pagination-demo>
</ClientOnly>


## API

| 参数   | 说明   | 类型  | 默认值 |
| -------- | -------- | ------- | ------ |
| totalPage  | 总页数 | Number  | 必传  |
| currentPage     | 当前页码 | Number  |  必传    |
| hideIfOnePage     | 是否显示边框 | Boolean  | true     |

## 实现的逻辑
- 展示数据放在pages数组中，pages数组是依赖于currentPage和totalPage的计算属性，当currentPage改变时，通过一系列数组方法返回需要的pages数组。核心方法：reduce