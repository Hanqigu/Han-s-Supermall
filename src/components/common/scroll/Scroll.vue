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
      probeType: {
        type: Number,
        default: 0,
      },
      // 让用户自己决定是否要上拉加载更多页面
      pullUpLoad: {
        type: Boolean,
        default: false,
      },
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
        pullUpLoad: this.pullUpLoad,
      });

      // 2.监听滚动的区域
      this.scroll.on('scroll', position => {
        // console.log(position);
        this.$emit('emitscroll', position);
      });

      // 3.监听上拉事件
      this.scroll.on('pullingUp', () => {
        // console.log("上拉加载更多");
        this.$emit('emitpullingUp');
      });
    },
    methods: {
      scrollTo(x, y, time = 1000) {
        this.scroll.scrollTo(x, y, time);
        // this.scroll && this.scroll.scrollTo && this.scroll.scrollTo(x, y, time);
      },
      finishPullUp() {
        this.scroll.finishPullUp();
      },
      refresh() {
        this.scroll.refresh();
        // this.scroll && this.scroll.scrollTo && this.scroll.refresh();
      },
    },
  }
</script>

<style>

</style>
