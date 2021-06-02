<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button :is-checked="isSelectAll"
                    class="check-button"
                    @click.native="checkClick"></check-button>
      <span>全选</span>
    </div>

    <div class="price">
      合计: {{totalPrice}}
    </div>

    <div class="calculate">
      去计算: {{checkLength}}
    </div>
  </div>
</template>

<script>
  import CheckButton from 'components/content/checkButton/CheckButton';

  import {mapGetters} from 'vuex';

  export default {
    name: "CartBottomBar",
    components: {
      CheckButton,
    },
    computed: {
      ...mapGetters({
        list: 'cartList',
      }),
      totalPrice() {
        return "￥" + this.list.filter(item => {
          return item.checked;
        }).reduce((preValue, item) => {
          return preValue + item.price * item.count;
        }, 0).toFixed(2);
      },
      ...mapGetters({
        length: 'cartList',
      }),
      checkLength() {
        return this.list.filter(item => item.checked).reduce((preValue, item) => {
          return preValue + item.count;
        }, 0);
      },
      isSelectAll() {
        // return !(this.list.filter(item => !item.checked).length);
        // return !(this.list.find(item => !item.checked));

        // 这里用every()方法是最好的，不会遍历空数组
        return !!this.list.length && this.list.every(item => item.checked);
      },
    },
    methods: {
      checkClick() {
        if(this.isSelectAll) {
          // 全部选中 -> 全部不选
          this.list.forEach(item => item.checked = false);
        } else {
          this.list.forEach(item => item.checked = true);
        }
      },
    },
  }
</script>

<style scoped>
  .bottom-bar {
    position: absolute;
    bottom: 49px;
    left: 0;
    right: 0;
    display: flex;

    height: 40px;
    line-height: 40px;

    background-color: #eee;
  }

  .check-content {
    display: flex;
    align-items: center;
    margin-left: 5px;
    width: 60px;
  }

  .check-button {
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-right: 5px;
  }

  .price {
    margin-left: 25px;
    flex: 1;
  }

  .calculate {
    width: 100px;
    background-color: tomato;
    color: #fff;
    text-align: center;
  }
</style>
