// es6只有export可以触发tree shaking机制 ,commonjs只有exports可以触发tree shaking机制
import Icon from './components/Icon/index'

export default function (Vue) {
  Vue.use(Icon)
}