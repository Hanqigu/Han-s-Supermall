<template>
  <div id="details">
    <details-nav-bar></details-nav-bar>
    <details-swiper :top-images="topImages"></details-swiper>
    <details-base-info :goods="totalGoods"></details-base-info>
  </div>
</template>

<script>
  import DetailsNavBar from './childComps/DetailsNavBar';
  import DetailsSwiper from './childComps/DetailsSwiper';
  import DetailsBaseInfo from './childComps/DetailsBaseInfo';

  import {getDetails, Goods} from 'network/details'

  export default {
    name: "Details",
    components: {
      DetailsNavBar,
      DetailsSwiper,
      DetailsBaseInfo,
    },
    data() {
      return {
        iid: null,
        topImages: [],
        totalGoods: {},
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
      });
    },
  }
</script>

<style>

</style>
