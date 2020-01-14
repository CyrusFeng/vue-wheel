---
sidebarDepth: 2
---
# slides

## 需求演示

- 自动播放
- 鼠标进入停止播放，鼠标离开继续播放
- 点击第按钮显示对应图片
- 设置自动播放间隔
- 图片进入、离开有渐显效果

<ClientOnly>
  <slides-demo></slides-demo>
</ClientOnly>

## API
- c-slides

| 参数   | 说明   | 类型  | 值 |
| -------- | -------- | ------- | ------ |
| selected  | 当前子元素的name值 | String  | 必填,对应c-slides-item的name值  |
| autoPlay     | 是否自动播放 | Boolean  | true     |
| autoPlayDelay | 播放下一张的间隔时间（毫秒） | Number | 1500  |
| reserve | 自动播放顺序（正序或倒序） | Boolean | false  |

- c-slides-item

| 参数   | 说明   | 类型  | 值 |
| -------- | -------- | ------- | ------ |
| name | 图的名字 | String | 必填(任意字符串) |

## 实现的逻辑
- 通过单项数据流改变c-slides的selected值
- c-slides监听selected的变化，调用updateChildren函数更新子组件内部的selected，子组件内部通过判断selected值和name值是否相等来显示和隐藏自身
- 使用 transition 实现图片显示和隐藏的渐显动画
- 在父组件的一些函数中使用子组件实例对象获取其本身的组件名和data值等