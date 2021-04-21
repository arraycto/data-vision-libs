<template>
  <div class="fly-box-container" ref="flyBox" style="background-color: gray">
    <svg :width="width" :height="height">
      <defs>
        <path
            :id="pathId"
            :d="path"
            fill="none"
        ></path>
        <radialGradient
            :id="radialGradientId"
            cx="50%"
            cy="50%"
            fx="100%"
            fy="50%"
            r="50%"
        >
          <stop offset="0%" stop-color="#fff" stop-opacity="1"></stop>
          <stop offset="100%" stop-color="#fff" stop-opacity="0"></stop>
        </radialGradient>
        <mask :id="maskId">
          <circle
              :r="radius"
              cx="0"
              cy="0"
              :fill="`url(#${radialGradientId})`"
          >
            <animateMotion
                :dur="duration"
                :path="path"
                rotate="auto"
                repeatCount="indefinite"
            >
            </animateMotion>
          </circle>
        </mask>
      </defs>
      <use
          :href="`#${pathId}`"
          stroke-width="1"
          :stroke="lineColor"
      ></use>
      <use
          :href="`#${pathId}`"
          stroke-width="3"
          :stroke="starColor"
          :mask="`url(#${maskId})`"
      ></use>
    </svg>
    <div class="fly-box-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import {ref, onMounted, getCurrentInstance, computed} from 'vue'
// 引入uuid主要是为了解决"当调用多个组件时如果id为一致时，则显示一样了，因此需要借助uuid来使得id唯一"
import {v4 as uuidv4} from 'uuid'

export default {
  name: "FlyBox",
  props: {
    duration: {
      type: [Number, String],
      default: 3
    },
    lineColor: {
      type: String,
      default: '#235fa7'
    },
    starColor: {
      type: String,
      default: '#4fd2dd'
    },
    starLength: {
      type: [Number, String]
    }
  },
  setup(ctx) {
    const width = ref(0)
    const height = ref(0)
    const radius = ref(0)
    const path = computed(() => `M 5 5 L  ${width.value - 5} 5 L  ${width.value - 5}  ${height.value - 5} L 5  ${height.value - 5} Z`)
    const duration = computed(() => `${ctx.duration}s`)

    const uuid = uuidv4()
    const pathId = `fly-box-${uuid}`
    const radialGradientId = `fly-box-gradient-${uuid}`
    const maskId = `fly-box-mask-${uuid}`

    // 主要是用于自适应大小
    const init = () => {
      const instance = getCurrentInstance()
      const dom = instance.ctx.$refs.flyBox
      width.value = dom.clientWidth
      height.value = dom.clientHeight
      radius.value = instance.ctx.starLength ? Number(instance.ctx.starLength) : Math.min(width.value, height.value) / 2
    }
    onMounted(() => {
      init()
    })
    return {
      width,
      height,
      path,
      duration,
      radius,
      pathId,
      radialGradientId,
      maskId
    }
  }
};
</script>

<style lang="scss" scoped>
.fly-box-container {
  position: relative;
  width: 100%;
  height: 100%;

  svg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .fly-box-content {
    width: 100%;
    height: 100%;
    padding: 5px;
    box-sizing: border-box;
  }
}
</style>
