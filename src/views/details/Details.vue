<template>
  <div id="details">
    <details-nav-bar class="details-nav" @detailsTitleClick="titleClick"></details-nav-bar>
    <scroll class="content" ref="scroll">
      <details-swiper :top-images="topImages"></details-swiper>
      <details-base-info :goods="totalGoods"></details-base-info>
      <details-shop-info :shop="totalShop"></details-shop-info>
      <details-goods-info :goodsInfo="totalDetailsInfo" @goodsInfoImgLoad="imageLoad"></details-goods-info>
      <details-params-info ref="params" :paramInfo="totalParamInfo"></details-params-info>
      <details-comment-info ref="comment" :comment-info="totalCommentInfo"></details-comment-info>
      <goods-list ref="recommend" :goods="totalRecommends"></goods-list>
    </scroll>
  </div>
</template>

<script>
  import DetailsNavBar from './childComps/DetailsNavBar';
  import DetailsSwiper from './childComps/DetailsSwiper';
  import DetailsBaseInfo from './childComps/DetailsBaseInfo';
  import DetailsShopInfo from './childComps/DetailsShopInfo';
  import DetailsGoodsInfo from './childComps/DetailsGoodsInfo';
  import DetailsParamsInfo from './childComps/DetailsParamsInfo';
  import DetailsCommentInfo from './childComps/DetailsCommentInfo';

  import Scroll from 'components/common/scroll/Scroll';
  import GoodsList from 'components/content/goods/GoodsList';

  import {getDetails, getRecommend, Goods, Shop, GoodsParams} from 'network/details';
  import {itemListenerMixin} from 'common/mixin';

  export default {
    name: "Details",
    components: {
      Scroll,
      GoodsList,
      DetailsNavBar,
      DetailsSwiper,
      DetailsBaseInfo,
      DetailsShopInfo,
      DetailsGoodsInfo,
      DetailsParamsInfo,
      DetailsCommentInfo,
    },
    // 混入属性
    mixins: [
      itemListenerMixin
    ],
    data() {
      return {
        iid: null,
        topImages: [],
        totalGoods: {},
        totalShop: {},
        totalDetailsInfo: {},
        totalParamInfo: {},
        totalCommentInfo: {},
        totalRecommends: [],
        themeTopYs: [],
      };
    },
    methods: {
      imageLoad() {
        // console.log("----");
        this.$refs.scroll.refresh();

        this.themeTopYs = [];
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
        console.log(this.themeTopYs);
      },
      titleClick(index) {
        // console.log(index);
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 300);
      },
    },
    created() {
      // 1.保存传入的iid
      this.iid = this.$route.params.iid;
      // console.log(this.iid);

      // 2.根据iid请求详情数据
      getDetails(this.iid).then(res => {
        // console.log(res);
        const resData = res.result;

        // (1)获取顶部的图片轮播数据
        this.topImages = resData.itemInfo.topImages;

        // (2)获取商品信息
        this.totalGoods = new Goods(resData.itemInfo, resData.columns, resData.shopInfo.services);

        // (3)创建店铺信息的对象
        this.totalShop = new Shop(resData.shopInfo);

        // (4)获取商品详细信息
        this.totalDetailsInfo = resData.detailInfo;

        // (5)获取详情信息
        this.totalParamInfo = new GoodsParams(resData.itemParams.info, resData.itemParams.rule);

        // (6)获取评论信息
        if(resData.rate.cRate !== 0) {
          this.totalCommentInfo = resData.rate.list[0];
        }

        // (7)使用$nextTick函数的作用是等到html所有组件全部渲染完成才调用其内部的回调函数
        // 第1次获取:值不对
        // 值不对的原因:this.$refs.XXXX.$el压根没有渲染
        // this.themeTopYs = [];
        // this.themeTopYs.push(0);
        // this.themeTopYs.push(this.$refs.params.$el.offsetTop);
        // this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
        // console.log(this.themeTopYs);

        // 第2次获取:值不对
        // 值不对的原因:图片没有计算在内(没有加载完成)
        this.$nextTick(() => {
          // 根据最新的数据，对应的DOM是已经被渲染出来
          // 但是图片依然是没有加载完全(目前获取的offsetTop不包含图片)
          // offsetTop值不对时，一般都是图片没有获取到的问题
          // this.themeTopYs = [];
          // this.themeTopYs.push(0);
          // this.themeTopYs.push(this.$refs.params.$el.offsetTop);
          // this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
          // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
          // console.log(this.themeTopYs);
        });
      });

      // 3.请求推荐数据
      getRecommend().then(res => {
        this.totalRecommends = res.data.list;
        // console.log(this.totalRecommends);
      });
    },
    mounted() {},
    // 只要有数据更新就会调用updated里面的代码
    updated() {
      // this.themeTopYs = [];

      // this.themeTopYs.push(0);
      // this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      // this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);

      // console.log(this.themeTopYs);
    },
    destroyed() {
      // 取消全局事件的监听
      this.$bus.$off('itemImageLoad', this.detailsItemImgListener);
    },
  }
</script>

<style scoped>
  #details {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }

  .details-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
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
