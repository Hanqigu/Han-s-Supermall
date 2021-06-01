import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutation-types';

export default {
  addCart(context, payload) {
    // 1.添加商品(顺便要查找之前数组中是否有该商品)
    // let oldProduct = null;
    // for(let item of state.cartList) {
    //   if(item.iid === payload.iid) {
    //     oldProduct = item;
    //   }
    // }
    // 还有个更简便的方法
    let oldProduct = context.state.cartList.find(item => item.iid === payload.iid);

    // 2.判断oldProduct
    if(oldProduct) {
      context.commit(ADD_COUNTER, oldProduct);
    } else {
      payload.count = 1;
      context.commit(ADD_TO_CART, payload);
    }
  },
};