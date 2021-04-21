const path = require('path')
const resolve = require('rollup-plugin-node-resolve') // 可以将第三方模块打包进项目里，这样即使不安装第三方模块也能使用
const commonjs = require('rollup-plugin-commonjs') // 可以将commonjs模块打包
const babel = require('rollup-plugin-babel') // 将es6语法转es5
const json = require('rollup-plugin-json') // 打包json文件
const vue = require('rollup-plugin-vue') // 打包vue文件
const postcss = require('rollup-plugin-postcss') // 支持css预处理
const {terser} = require('rollup-plugin-terser') // 打包压缩

const inputPath = path.resolve(__dirname, './src/index.js') // 入口地址
const outputUmdPath = path.resolve(__dirname, './dist/datav.js') // 输出地址 - umd模块
const outputEsPath = path.resolve(__dirname, './dist/datav.es.js') // 输出地址 - es模块

module.exports = {
  input: inputPath,
  output: [
    {
      file: outputUmdPath,
      name: 'DataV', // 模块名称
      format: 'umd', // 输出的模块协议
      globals: {
        'vue': 'vue'
      }
    },
    {
      file: outputEsPath,
      name: 'DataV', // 模块名称
      format: 'es', // 输出的es6模块协议
      globals: {
        'vue': 'vue'
      }
    }
  ],
  plugins: [
    resolve(),
    commonjs(),
    babel({
      exclude: 'node_modules/**',
      runtimeHelpers: true,
      plugins: [
        ['@babel/transform-runtime', {
          regenerator: true
        }]
      ]
    }),
    json(),
    vue(),
    postcss({
      plugins: []
    }),
    terser(),
  ],
  external: ['vue', 'echarts'] // 外部引用模块，即使有resolve插件也会被引入到外部，不会打包进入
}
