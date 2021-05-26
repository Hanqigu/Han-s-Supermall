<template>
  <div class="details-swiper">
    <swiper>
      <swiper-item class="swiper-item" v-for="(item,index) in topImages" :key="index">
        <a :href="item.link">
          <img :src="item" alt="">
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
  import {Swiper, SwiperItem} from 'components/common/swiper';

  export default {
    name: "DetailsSwiper",
    components: {
      Swiper,
      SwiperItem,
    },
    props: {
      topImages: {
        type: Array,
        default() {
          return [];
        },
      },
    },
  }
</script>

<style scoped>
  .swiper-item {
    height: 400px;
    overflow: hidden;
  }
</style>
