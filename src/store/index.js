import Vue from 'vue';
import Vuex from 'vuex';

// 1.安装插件
Vue.use(Vuex);

// 2.创建Store对象
const store = new Vuex.Store({
  state:{
    cartList: [],
  },
  mutations: {
    addCart(state, payload) {
      // 1.添加商品(顺便要查找之前数组中是否有该商品)
      // let oldProduct = null;
      // for(let item of state.cartList) {
      //   if(item.iid === payload.iid) {
      //     oldProduct = item;
      //   }
      // }
      // 还有个更简便的方法
      let oldProduct = state.cartList.find(item => item.iid === payload.iid);

      // 2.判断oldProduct
      if(oldProduct) {
        oldProduct.count += 1;
      } else {
        payload.count = 1;
        state.cartList.push(payload);
      }
    },
  },
});

// 3.挂载Vue实例
export default store;
