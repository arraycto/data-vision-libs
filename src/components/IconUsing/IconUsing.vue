<template>
  <div class="icon-wrapper" :style="{...style}">
    <svg class="icon">
      <use :href="iconName"></use>
    </svg>
  </div>
</template>

<script>
export default {
  name: "IconUsing",
  props: {
    name: {
      type: String,
      default: ''
    },
    style: {
      type: Object,
      default: () => ({})
    }
  },
  setup(ctx) {
    const iconName = `#${ctx.name}`
    return {
      iconName
    }
  }
};
</script>

<style lang="scss" scoped>
.icon-wrapper {
  display: inline-block;
}

.icon {
  width: 100%;
  height: 100%;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
