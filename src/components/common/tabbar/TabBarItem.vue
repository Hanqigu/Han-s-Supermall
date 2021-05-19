<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-activate"></slot></div>
    <div :style="activeStyle"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  props: {
    // 接收App.vue文件里的tab-bar-item的path(父传子)
    path: String,
    activeColor: {
      type: String,
      default: 'red',
    },
  },
  data() {
    return {
      // isActive: true
    }
  },
  computed: {
    isActive() {
      // 判断此时活跃的是哪一个组件
      return this.$route.path.indexOf(this.path) !== -1;
    },
    activeStyle() {
      // 判断组件是否活跃，如果活跃则给其加上color样式，不活跃则什么都不做
      return this.isActive ? {color: this.activeColor} : {};
    }
  },
  methods: {
    itemClick() {
      this.$router.replace(this.path);
    }
  },
}
</script>

<style>
  .tab-bar-item {
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
  }

  .tab-bar-item img {
    width: 24px;
    height: 24px;
    margin-top: 3px;
    vertical-align: middle;
    margin-bottom: 1px;
  }
</style>
