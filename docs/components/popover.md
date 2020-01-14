---
sidebarDepth: 2
---
# popover

## 需求演示

- 点击/鼠标移入元素，弹出气泡式的卡片浮层

<ClientOnly>
  <popover-demo></popover-demo>
</ClientOnly>

## API
| 参数   | 说明   | 类型  | 可选值 |
| -------- | -------- | ------- | ------ |
| event-type | 触发方式 | String | 'click', 'hover'  |
| position     | 弹出层位置	 | String  | 'left', 'top', 'right', 'bottom'    |

## 实现思路

- 通过插槽实现自定义触发按钮
- 为了防止弹出层被父元素overflow:hidden属性覆盖，需要将弹出层基于body定位，具体位置通过getBoundingClientRect函数获取插槽dom的信息计算
- 通过contains函数判断鼠标点击元素是否在弹出层或插槽按钮内，以此为依据打开关闭弹出层