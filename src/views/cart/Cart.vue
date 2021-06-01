<template>
  <div class="cart">
    <!-- 导航 -->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>

    <!-- 商品列表 -->
    <scroll class="content" ref="scroll">
      <cart-list></cart-list>
    </scroll>

    <!-- 底部汇总 -->
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar';
  import Scroll from 'components/common/scroll/Scroll';

  import CartList from './childComps/CartList';

  import {mapGetters} from 'vuex';

  export default {
    name: 'Cart',
    components: {
      NavBar,
      Scroll,
      CartList,
    },
    computed: {
      // 辅助函数仅仅是将store中的getter映射到局部计算属性
      // 两种语法
      // ...mapGetters(['cartLength', 'cartList',]),
      ...mapGetters({
        length: 'cartLength',
      }),
    },
    activated() {
      this.$refs.scroll.refresh();
    },
  }
</script>

<style scoped>
  .cart {
    height: 100vh;
    position: relative;
  }

  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
  }

  .content {
    /* height: 100%; */
    overflow: hidden;
    /* margin-top: 44px; */
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>
