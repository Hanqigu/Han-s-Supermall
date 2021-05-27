import {debounce} from 'common/utils';

export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null,
    };
  },
  mounted() {
    // 结合防抖动
    const refresh = debounce(this.$refs.scroll.refresh, 500);

    this.itemImgListener = () => {
      refresh();
    };

    this.$bus.$on('itemImageLoad', this.itemImgListener);
  }
};
