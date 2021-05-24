<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll';

  export default {
    name: "Scroll",
    props: {
      // 让用户自己决定是否要实时监听滑动位置
      probeType: Number,
      default: 0,
    },
    data() {
      return {
        scroll: null,
      };
    },
    mounted() {
      // 1.创建Better-Scroll对象
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true,
        // 要想实时监听滑动位置，就必须加probeType
        probeType: this.probeType,
      });

      // 2.监听滚动的区域
      this.scroll.on('scroll', position => {
        // console.log(position);
        this.$emit('emitscroll', position);
      });
    },
    methods: {
      scrollTo(x, y, time = 1000) {
        this.scroll.scrollTo(x, y, time);
      }
    },
  }
</script>

<style>

</style>
