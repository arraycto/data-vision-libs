import path from 'path'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import babel from '@rollup/plugin-babel'
import json from '@rollup/plugin-json'
import vue from 'rollup-plugin-vue'
import postcss from 'rollup-plugin-postcss'

const inputPath = path.resolve(__dirname, './src/index.js') // 入口地址
const outputUmdPath = path.resolve(__dirname, './dist/datav.js') // 输出地址 - umd模块
const outputEsPath = path.resolve(__dirname, './dist/datav.es.js') // 输出地址 - es模块

const config = {
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
    // 打包vue文件
    vue(),
    // 可以将第三方模块打包进项目里，这样即使不安装第三方模块也能使用
    resolve({preferBuiltins: true}),
    // 可以将commonjs模块打包
    commonjs(),
    // 将es6语法转es5
    babel({
      exclude: 'node_modules/**',
      babelHelpers: 'runtime',
      plugins: [
        ['@babel/transform-runtime', {
          regenerator: true
        }]
      ]
    }),
    // 打包json文件
    json(),
    // 支持css预处理
    postcss({
      plugins: []
    })
  ],
  external: ['vue', 'echarts'] // 外部引用模块，即使有resolve插件也会被引入到外部，不会打包进入
}

export default config
