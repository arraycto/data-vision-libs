<template>
  <div id="container" :ref="refName">
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
      default: () => ({})
    }
  },
  setup(ctx) {
    const refName = 'container'
    const width = ref(0)
    const height = ref(0)
    const originalWidth = ref(0)
    const originalHeight = ref(0)
    let context, dom
    const ready = ref(false)

    const initSize = () => {
      return new Promise((resolve => {
        nextTick(() => {
          // 容器的真实尺寸（大屏的大小）
          if (ctx.options && ctx.options.height && ctx.options.width) {
            height.value = ctx.options.height
            width.value = ctx.options.width
          } else {
            height.value = dom.clientHeight
            width.value = dom.clientWidth
          }
          // 当前视口的尺寸
          if (!originalWidth.value || !originalHeight.value) {
            originalWidth.value = window.screen.width
            originalHeight.value = window.screen.height
          }
          resolve()
        })
      }))
    }

    const updateSize = () => {
      // 优先设置为用户传入宽高，然后才是当前视口的宽高
      if (width.value && height.value) {
        dom.style.width = `${width.value}px`
        dom.style.height = `${height.value}px`
      } else {
        dom.style.width = `${originalWidth.value}px`
        dom.style.height = `${originalHeight.value}px`
      }
    }

    const updateScale = () => {
      // 真实的视口尺寸
      const currentWidth = document.body.clientWidth
      const currentHeight = document.body.clientHeight
      // 容器最终的宽高
      const realWidth = width.value || originalWidth.value
      const realHeight = height.value || originalHeight.value
      const widthScale = currentWidth / realWidth
      const heightScale = currentHeight / realHeight
      dom.style.transform = `scale(${widthScale}, ${heightScale})`
    }

    const onResize = async () => {
      await initSize()
      updateScale()
    }

    onMounted(async () => {
      ready.value = false
      context = getCurrentInstance().ctx
      dom = context.$refs[refName]
      await initSize()
      updateSize()
      updateScale()
      // debounce是为了防止连续触发
      window.addEventListener('resize', debounce(500, onResize))
      ready.value = true
    })

    onUnmounted(() => {
      window.removeEventListener('resize', debounce(500, onResize))
    })

    return {
      refName,
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
  background: yellow;
}
</style>
