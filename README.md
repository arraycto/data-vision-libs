# 数据可视化 - 图表组件库

> 本项目为数据可视化之图表组件库，主要用于配合[数据可视化 - 外卖业务数据大屏](https://github.com/MrEnvision/data-vision-screen)使用，具体详见：[课程官网](http://www.youbaobao.xyz/datav-docs/) + [个人笔记](https://github.com/MrEnvision/data-vision-libs)。
>
> TIP：更多内容详见[数据可视化专题](https://github.com/MrEnvision/data-vision)！！！

## 0. 组件介绍

- [IconUsing](./src/components/IconUsing/IconUsing.vue) - Icon使用组件
- [IconLoading](./src/components/IconLoading/IconLoading.vue) - 加载Icon组件
- [Container](./src/components/Container/Container.vue) - 自适应宽高容器组件
- [FlyBox](./src/components/FlyBox/FlyBox.vue) - 飞线盒子组件
- [CountTo](./src/components/CountTo/CountTo.vue) - 数字滚动组件（来自[vue-count-to](https://www.npmjs.com/package/vue-count-to)）

## 1. rollup配置

>rollup.js是Javascript的ES模块打包器，我们熟知的Vue、React等诸多知名框架或类库都通过rollup.js进行打包。与Webpack偏向于应用打包的定位不同，rollup.js更专注于Javascript类库打包（虽然rollup.js也可以提供资源打包，但显然这不是它的强项）。

- 前置：[基础知识](https://www.imooc.com/article/264075) [rollup基础插件](https://www.imooc.com/article/264076)
- 第一篇：[10分钟快速入门rollup.js](https://www.imooc.com/article/262083)
- 第二篇：[10分钟快速进阶rollup.js](https://www.imooc.com/article/263597)
- 第三篇：[10分钟快速精通rollup.js](https://www.imooc.com/article/264074)

## 2. npm发布

> 具体详见 [npm发布教程](https://github.com/MrEnvision/Front-end_learning_notes/blob/master/topics/npm-package.md)。

在本地开发的时候，为了避免每次都publish npm包然后安装调试，可以采用 [npm link](https://docs.npmjs.com/cli/v7/commands/npm-link) 方式。

**本地包调试**

- 在npm包文件夹下：

```shell
$ npm link
```

- 在调用npm包的项目文件下，注意pkg的名字为package.json中的名字，而不是文件夹的名字：

```shell
$ npm link [<@scope>/]<pkg>[@<version>]
```

**本地包解除link**

- 在调用npm包的项目文件下：

```shell
$ npm unlink --no-save [<@scope>/]<pkg>[@<version>]
```

- 在npm包文件夹下：

```shell
$ npm unlink
```

注意！！！不要忘记在 package.json 中配置其他项目调用该包时调用的文件：

```json
{
	"main": "dist/datav.js"
}
```



------

如果发现本项目有错误，欢迎提交 issues 指正，也可联系邮箱[EnvisionShen@gmail.com](mailto:EnvisionShen@gmail.com)。

