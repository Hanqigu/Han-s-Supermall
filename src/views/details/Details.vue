<template>
  <div id="details">
    <details-nav-bar class="details-nav"></details-nav-bar>
    <scroll class="content">
      <details-swiper :top-images="topImages"></details-swiper>
      <details-base-info :goods="totalGoods"></details-base-info>
      <details-shop-info :shop="totalShop"></details-shop-info>
    </scroll>
  </div>
</template>

<script>
  import DetailsNavBar from './childComps/DetailsNavBar';
  import DetailsSwiper from './childComps/DetailsSwiper';
  import DetailsBaseInfo from './childComps/DetailsBaseInfo';
  import DetailsShopInfo from './childComps/DetailsShopInfo';

  import Scroll from 'components/common/scroll/Scroll';

  import {getDetails, Goods, Shop} from 'network/details';

  export default {
    name: "Details",
    components: {
      DetailsNavBar,
      DetailsSwiper,
      DetailsBaseInfo,
      DetailsShopInfo,
      Scroll,
    },
    data() {
      return {
        iid: null,
        topImages: [],
        totalGoods: {},
        totalShop: {},
      };
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
      });
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
