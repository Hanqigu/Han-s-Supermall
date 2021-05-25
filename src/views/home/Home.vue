<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>

    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @emitscroll="contentScroll"
            :pull-up-load="true"
            @emitpullingUp="loadMore">
      <home-swiper :banners="banners"></home-swiper>
        <recommend-view :recommends="recommends"></recommend-view>
        <feature-view></feature-view>
        <tab-control class="tab-control"
                    :titles="['流行', '新款', '精选']"
                    @tabClick="HomeTabClick"></tab-control>
        <goods-list :goods="showGoods"></goods-list>
    </scroll>

    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
  // childComps
  import HomeSwiper from './childComps/HomeSwiper';
  import RecommendView from './childComps/RecommendView';
  import FeatureView from './childComps/FeatureView';

  // components
  import NavBar from 'components/common/navbar/NavBar';
  import TabControl from 'components/content/tabControl/TabControl';
  import GoodsList from 'components/content/goods/GoodsList';
  import Scroll from 'components/common/scroll/Scroll';
  import BackTop from 'components/content/backTop/BackTop';

  // network
  import {getHomeMultidata, getHomeGoods} from 'network/home';

  export default {
    name: 'Home',
    components: {
      HomeSwiper,
      RecommendView,
      FeatureView,
      NavBar,
      TabControl,
      GoodsList,
      Scroll,
      BackTop,
    },
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []},
        },
        currentType: 'pop',
        isShowBackTop: false
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      },
    },
    created() {
      // 1.请求多个数据
      this.methodsgetHomeMultidata();

      // 2.请求商品数据
      this.methodsgetHomeGoods('pop');
      this.methodsgetHomeGoods('new');
      this.methodsgetHomeGoods('sell');
    },
    mouted() {
      // 结合防抖动
      const refresh = this.debounce(this.$refs.scroll.refresh, 500);

      // 3.监听GoodsListItem.vue文件中事件总线发射出的图片加载完成事件
      this.$bus.$on('itemImageLoad', () => {
        // console.log("事件总线示例");
        refresh();
      });
    },
    methods: {
      /**
       * 事件监听相关的方法
       */
      HomeTabClick(index) {
        // console.log(index);
        switch(index) {
          case 0:
            this.currentType = 'pop';
            break;
          case 1:
            this.currentType = 'new';
            break;
          case 2:
            this.currentType = 'sell';
            break;
        };
      },
      backClick() {
        this.$refs.scroll.scrollTo(0, 0);
      },
      contentScroll(position) {
        // console.log(position);
        this.isShowBackTop = position.y < -4900;
      },
      loadMore() {
        // console.log("上拉加载更多");
        this.methodsgetHomeGoods(this.currentType);
        // 对界面进行刷新
        this.$refs.scroll.refresh();
      },
      // 刷新频繁的防抖函数处理
      debounce(func, delay = 500) {
        let timer = null;
        return function(...args) {
          if(timer) {
            clearTimeout(timer);
            timer = setTimeout(() => {
              func.apply(this, args);
            }, delay);
          }
        };
      },

      /**
       * 网络请求相关方法
       */
      methodsgetHomeMultidata() {
        getHomeMultidata().then(res => {
          // console.log(res);
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        });
      },
      methodsgetHomeGoods(type) {
          const page = this.goods[type].page+1;
          getHomeGoods(type, page).then(res => {
          // console.log(res);
          // 将请求到的服务器res里的list数据push进数据结构goods
          this.goods[type].list.push(...(res.data.list));
          this.goods[type].page += 1;

          // 要想继续刷新更多页面，就必须有如下代码
          this.$refs.scroll.finishPullUp();
        });
      },
    },
  }
</script>

<style scoped>
  #home {
    padding-top: 44px;
    /* vh -> viewport height */
    height: 100vh;
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;

    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }

  .tab-control {
    position: sticky;
    top: 44px;
    z-index: 9;
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

