// es6只有export可以触发tree shaking机制 ,commonjs只有exports可以触发tree shaking机制
import IconUsing from './components/IconUsing/index'
import IconLoading from "./components/IconLoading/index";
import FlyBox from "./components/FlyBox/index";
import Container from "./components/Container/index";

export default function (Vue) {
  Vue.use(IconUsing)
  Vue.use(IconLoading)
  Vue.use(FlyBox)
  Vue.use(Container)
}
