---
sidebarDepth: 2
---
# icon

## 需求演示
- 支持本地svg，完全离线化使用，不需要从 CDN 下载字体文件
- 支持iconfont.cn 项目在线生成的 js 地址（需手动在组件内部更改）
- 根据name值展示不同图标
- 可设置宽高
- 支持旋转

<ClientOnly>
  <icon-demo></icon-demo>
</ClientOnly>


## API

| 参数   | 说明   | 类型  | 默认值 |
| -------- | -------- | ------- | ------ |
| name  | svg名称 | String  | 无  |
| width  |  宽 | Number,String  | 无   |
| height  | 高 | Number,String | 无  |
| rotate  | 是否有旋转动画 | Boolean | false |

## 实现逻辑
- 使用本地svg需要配置webpack

```
chainWebpack: config => {
    const svgRule = config.module.rule('svg');
    // 清除已有的所有 loader。
    // 如果你不这样做，接下来的 loader 会附加在该规则现有的 loader 之后。
    svgRule.uses.clear();
    svgRule
      .test(/\.svg$/)
      .include.add(path.resolve(__dirname, './src/icons/svg'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      });
}
```
