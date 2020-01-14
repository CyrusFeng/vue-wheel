// // ./vue.config.js
// 'use strict'
// const path = require('path')
//
// function resolve(dir) {
//   return path.join(__dirname, dir)
// }
//
// module.exports = {
//   publicPath: process.env.NODE_ENV === "production" ? "/vue-svg" : "/",
//   chainWebpack: config => {
//     config.module
//       .rule('svg')
//       .exclude.add(resolve('src/icons'))
//       .end()
//     config.module
//       .rule('icons')
//       .test(/\.svg$/)
//       .include.add(resolve('src/icons'))
//       .end()
//       .use('svg-sprite-loader')
//       .loader('svg-sprite-loader')
//       .options({
//         symbolId: 'icon-[name]'
//       })
//       .end()
//   }
// };



// const path = require('path')
//
// function resolve(dir) {
//   return path.join(__dirname, '.', dir)
// }
//
// module.exports = {
//   chainWebpack: config => {
//     config.module
//       .rule('svg')
//       .exclude
//       .add(resolve('src/icons'))
//       .end()
//     config.module
//       .rule('icons')
//       .test(/\.svg$/)
//       .include
//       .add(resolve('src/icons'))
//       .end()
//       .use('svg-sprite-loader')
//       .loader('svg-sprite-loader')
//       .options({
//         symbolId: 'icons-[name]'
//       })
//       .end()
//   }
// }



// const path = require('path')
//
// function resolve(dir) {
//   return path.join(__dirname, '.', dir)
// }
//
// module.exports = {
//   chainWebpack: config => {
//     config.module.rules.delete("svg"); //重点:删除默认配置中处理svg,
//     //const svgRule = config.module.rule('svg')
//     //svgRule.uses.clear()
//     config.module
//       .rule('svg-sprite-loader')
//       .test(/\.svg$/)
//       .include
//       .add(resolve('src/icons')) //处理svg目录
//       .end()
//       .use('svg-sprite-loader')
//       .loader('svg-sprite-loader')
//       .options({
//         symbolId: 'icon-[name]'
//       })
//   },
//   configureWebpack: () => ({
//     // resolve: {
//     //   alias: require('./alias.config').webpack
//     // }
//     // module: {
//     //   rules: [{
//     //     test: /\.svg$/,
//     //     use: [{
//     //       loader: "svg-sprite-loader",
//     //       options: {
//     //         symbolId: 'icon-[name]'
//     //       }
//     //     }]
//     //   }]
//     // }
//   })
// }


"use strict";
const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/vue-svg" : "/",
  chainWebpack: config => {
    // config.module
    //   .rule("svg")
    //   .exclude.add(resolve("src/icons/svg"))
    //   .end();
    // config.module
    //   .rule("icons")
    //   .test(/\.svg$/)
    //   .include.add(resolve("src/icons/svg"))
    //   .end()
    //   .use("svg-sprite-loader")
    //   .loader("svg-sprite-loader")
    //   .options({
    //     symbolId: "icon-[name]"
    //   })
    //   .end();

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
  },
  css:{
    loaderOptions:{
      sass:{
        includePaths:[path.join(__dirname,'style')],
        // data:`@import "${path.join(__dirname,'style')}";`
      }
    }
  }
};

// module.exports = {
//   chainWebpack: (config) => {
//     const svgRule = config.module.rule('svg');
//
//     svgRule.uses.clear();
//
//     svgRule
//       .use('babel-loader')
//       .loader('babel-loader')
//       .end()
//       .use('vue-svg-loader')
//       .loader('vue-svg-loader');
//   },
// };
