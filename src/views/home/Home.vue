<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <recommend-view :recommends="recommends"></recommend-view>
    <feature-view></feature-view>
    <tab-control class="tab-control"
                  :titles="['流行', '新款', '精选']"
                  @tabClick="HomeTabClick"></tab-control>
    <goods-list :goods="showGoods"></goods-list>

    <ul>
      <li>占据空格</li>
      <li>占据空格</li>
      <li>占据空格</li>
      <li>占据空格</li>
      <li>占据空格</li>
      <li>占据空格</li>
      <li>占据空格</li>
      <li>占据空格</li>
      <li>占据空格</li>
      <li>占据空格</li>
      <li>占据空格</li>
      <li>占据空格</li>
      <li>占据空格</li>
      <li>占据空格</li>
      <li>占据空格</li>
      <li>占据空格</li>
      <li>占据空格</li>
      <li>占据空格</li>
      <li>占据空格</li>
      <li>占据空格</li>
      <li>占据空格</li>
      <li>占据空格</li>
      <li>占据空格</li>
      <li>占据空格</li>
      <li>占据空格</li>
      <li>占据空格</li>
      <li>占据空格</li>
      <li>占据空格</li>
      <li>占据空格</li>
      <li>占据空格</li>
      <li>占据空格</li>
      <li>占据空格</li>
      <li>占据空格</li>
      <li>占据空格</li>
      <li>占据空格</li>
      <li>占据空格</li>
      <li>占据空格</li>
      <li>占据空格</li>
      <li>占据空格</li>
      <li>占据空格</li>
      <li>占据空格</li>
      <li>占据空格</li>
    </ul>
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
        });
      },
    },
  }
</script>

<style>
  #home {
    padding-top: 44px;
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
</style>
