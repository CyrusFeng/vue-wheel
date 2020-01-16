---
sidebarDepth: 2
---
# radio

## 需求演示
- 点击切换选项
- 可设置纵向显示
- 可设置默认选项

<ClientOnly>
  <radio-demo></radio-demo>
</ClientOnly>

## API

| 参数   | 说明   | 类型  | 默认值 |
| -------- | -------- | ------- | ------ |
| options  | 数据源 | Array  | 必传  |
| vertical  | 是否垂直显示 | Boolean  | false  |
| defaultIndex  | 默认的index值 | Number  | 无  |
| value-change  |  选择时触发的事件 | Funtion  | 无   |


## 实现逻辑
- 使用`<transition name="fill-fade"></transition>`实现选中项内部圆点淡出淡出效果

