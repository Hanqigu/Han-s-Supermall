<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <!-- 用于偷天换日的tab-control，在视觉效果上让用户以为实现了吸顶的功能 -->
    <tab-control :titles="['流行', '新款', '精选']"
                 @tabClick="HomeTabClick"
                 ref="tabControl1"
                 class="tab-control"
                 v-show="isTabFixed"></tab-control>

    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @emitscroll="contentScroll"
            :pull-up-load="true"
            @emitpullingUp="loadMore">
      <home-swiper :banners="banners" @emitSwiperImageLoad="swiperImageLoad"></home-swiper>
        <recommend-view :recommends="recommends"></recommend-view>
        <feature-view></feature-view>
        <tab-control :titles="['流行', '新款', '精选']"
                     @tabClick="HomeTabClick"
                     ref="tabControl2"></tab-control>
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

  // common
  import {debounce} from 'common/utils';

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
        isShowBackTop: false,
        tabOffsetTop: 0,
        isTabFixed: false,
        saveY: 0,
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      },
    },
    destroyed() {
      console.log("Home destroyed");
    },
    activated() {
      // 这里之所以要刷新一次，是因为切换页面时回到home页面时有时候会莫名其妙的切换到首页顶部
      this.$refs.scroll.refresh();
      this.$refs.scroll.scrollTo(0, this.saveY, 0);
    },
    deactivated() {
      // console.log(this.$refs.scroll.getScrollY());
      this.saveY = this.$refs.scroll.getScrollY();
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
      const refresh = debounce(this.$refs.scroll.refresh, 500);

      // 1.监听GoodsListItem.vue文件中事件总线发射出的图片加载完成事件
      this.$bus.$on('itemImageLoad', () => {
        // console.log("事件总线示例");
        refresh();
      });

      // 2.为tabOffsetTop赋值
      // 所有组件都有一个属性$el:用于获取组件中的元素
      this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop;
      // console.log(this.$refs.tabControl.$el.offsetTop);
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
        this.$refs.tabControl1.currentIndex = index;
        // console.log(this.$refs.tabControl1.currentType);
        this.$refs.tabControl2.currentIndex = index;
        // console.log(this.$refs.tabControl2.currentType);
      },
      backClick() {
        this.$refs.scroll.scrollTo(0, 0);
      },
      contentScroll(position) {
        // 1.决定tabControl是否吸顶(position: fixed)
        this.isTabFixed = (-position.y) > this.tabOffsetTop;

        // 2.判断BackTop是否显示
        // console.log(position);
        this.isShowBackTop = position.y < -4900;
      },
      loadMore() {
        // console.log("上拉加载更多");
        this.methodsgetHomeGoods(this.currentType);
        // 对界面进行刷新
        this.$refs.scroll.refresh();
      },
      swiperImageLoad() {
        // 2.为tabOffsetTop赋值
        // 所有组件都有一个属性$el:用于获取组件中的元素
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
        // console.log(this.$refs.tabControl.$el.offsetTop);
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

          // 要想继续刷新更多页面，就必须有如下代码，用来完成上拉加载工作
          this.$refs.scroll.finishPullUp();
        });
      },
    },
  }
</script>

<style scoped>
  #home {
    /* padding-top: 44px; */
    /* vh -> viewport height */
    height: 100vh;
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;

    /* position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9; */
  }

  /* .fixed {
    position: fixed;
    left: 0;
    right: 0;
    top: 44px;
  } */

  .tab-control {
    position: relative;
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

