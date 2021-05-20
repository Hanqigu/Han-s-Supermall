<template>
  <div class="nav-bar">
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
  export default {
    name: "NavBar",
  }
</script>

<style>
  .nav-bar {
    display: flex;
    height: 44px;
    line-height: 44px;
    text-align: center;
    /* 下面这个属性主要是为了给导航栏下面添加一个灰色阴影间隔 */
    box-shadow: 0 1px 1px rgba(100, 100, 100, .1);
  }

  .left {
    width: 60px;
  }

  .right {
    width: 60px;
  }

  .center {
    /* 这个属性指占据剩余所有剩余空间(即left和right占据完之后) */
    flex: 1;
  }
</style>
