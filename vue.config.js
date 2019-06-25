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
    config.module
      .rule("svg")
      .exclude.add(resolve("src/icons"))
      .end();
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]"
      })
      .end();
  }
};
