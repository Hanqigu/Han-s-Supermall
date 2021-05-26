<template>
  <div id="details">
    <details-nav-bar></details-nav-bar>
    <details-swiper :top-images="topImages"></details-swiper>
  </div>
</template>

<script>
  import DetailsNavBar from './childComps/DetailsNavBar'
  import DetailsSwiper from './childComps/DetailsSwiper'

  import {getDetails} from 'network/details'

  export default {
    name: "Details",
    components: {
      DetailsNavBar,
      DetailsSwiper,
    },
    data() {
      return {
        iid: null,
        topImages: [],
      };
    },
    created() {
      // 1.保存传入的iid
      this.iid = this.$route.params.iid;
      // console.log(this.iid);

      // 2.根据iid请求详情数据
      getDetails(this.iid).then(res => {
        // console.log(res);
        // (1)获取顶部的图片轮播数据
        this.topImages = res.result.itemInfo.topImages;
      });
    },
  }
</script>

<style>

</style>
