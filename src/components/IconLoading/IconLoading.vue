<template>
  <div class="icon-loading-container">
    <svg :height="height" :width="width" viewBox="0 0 50 50" preserveAspectRatio="xMidYMid meet">
      <circle
          cx="25"
          cy="25"
          r="22"
          fill="none"
          stroke-width="3"
          :stroke="outsideColor"
          stroke-dasharray="34"
          stroke-linecap="round"
      >
        <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 25 25"
            to="360 25 25"
            :dur="`${duration}s`"
            repeatCount="indefinite"
        />
        <animate
            attributeName="stroke"
            :values="`${outsideColor};${insideColor};${outsideColor}`"
            :dur="`${duration*2}s`"
            repeatCount="indefinite"
        />
      </circle>
      <circle
          cx="25"
          cy="25"
          r="12"
          fill="none"
          stroke-width="3"
          :stroke="insideColor"
          stroke-dasharray="19"
          stroke-linecap="round"
      >
        <animateTransform
            attributeName="transform"
            type="rotate"
            from="360 25 25"
            to="0 25 25"
            :dur="`${duration}s`"
            repeatCount="indefinite"
        />
        <animate
            attributeName="stroke"
            :values="`${insideColor};${outsideColor};${insideColor}`"
            :dur="`${duration*2}s`"
            repeatCount="indefinite"
        />
      </circle>
    </svg>
    <div class="loading-content">
     <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: "IconLoading",
  props: {
    width: {
      type: [Number, String],
      default: 50
    },
    height: {
      type: [Number, String],
      default: 50
    },
    outsideColor: {
      type: String,
      default: '#3be6cb'
    },
    insideColor: {
      type: String,
      default: '#02bcfe'
    },
    duration: {
      type: [Number, String],
      default: 2
    },
  }
};
</script>

<style lang="scss" scoped></style>
