<template>
  <div id="container" ref="container">
    <template v-if="ready">
      <slot></slot>
    </template>
  </div>
</template>

<script>
import {ref, getCurrentInstance, onMounted, onUnmounted, nextTick} from 'vue'
import {debounce} from "../../utils";

export default {
  name: "Container",
  props: {
    options: {
      type: Object,
      default: () => ({
        width: 3840,
        height: 2160
      })
    }
  },
  setup(ctx) {
    let context, dom, domObserver
    const ready = ref(false) // 宽高设置完毕再渲染内容
    const width = ref(0)
    const height = ref(0)
    const originalWidth = ref(0)
    const originalHeight = ref(0)

    onMounted(async () => {
      context = getCurrentInstance().ctx
      dom = context.$refs['container']
      await initSize()
      initConfig()
      setScale()
      bindDomResizeCallback(onResize)
      ready.value = true
    })

    onUnmounted(() => {
      unbindDomResizeCallback()
    })

    const initSize = () => {
      return new Promise(resolve => {
        nextTick(() => {
          // 容器的期望尺寸（大屏的大小）
          if (ctx.options && ctx.options.height && ctx.options.width) {
            width.value = ctx.options.width
            height.value = ctx.options.height
          } else {
            width.value = dom.clientWidth
            height.value = dom.clientHeight
          }
          // 当前视口的尺寸
          if (!originalWidth.value || !originalHeight.value) {
            originalWidth.value = window.screen.width
            originalHeight.value = window.screen.height
          }
          resolve()
        })
      })
    }

    const initConfig = () => {
      // 优先设置为用户传入宽高，然后才是当前视口的宽高
      if (width.value && height.value) {
        dom.style.width = `${width.value}px`
        dom.style.height = `${height.value}px`
      } else {
        dom.style.width = `${originalWidth.value}px`
        dom.style.height = `${originalHeight.value}px`
      }
    }

    const setScale = () => {
      // 当前的内容尺寸
      const currentWidth = document.body.clientWidth
      const currentHeight = document.body.clientHeight
      // 期望的内容尺寸
      const realWidth = width.value || originalWidth.value
      const realHeight = height.value || originalHeight.value
      // 设置缩放比
      dom.style.transform = `scale(${currentWidth / realWidth}, ${currentHeight / realHeight})`
    }

    const onResize = async () => {
      await initSize()
      setScale()
    }

    const bindDomResizeCallback = (callback) => {
      const MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver
      domObserver = new MutationObserver(callback)
      domObserver.observe(dom, {attributes: true, attributeFilter: ['style'], attributeOldValue: true})
      window.addEventListener('resize', debounce(500, callback)) // debounce是为了防止连续触发
    }

    const unbindDomResizeCallback = () => {
      domObserver.disconnect()
      domObserver.takeRecords()
      domObserver = null
      window.removeEventListener('resize', debounce(500, onResize))
    }

    return {
      ready
    }
  }
};
</script>

<style lang="scss" scoped>
#container {
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
  z-index: 999;
  transform-origin: left top;
}
</style>
