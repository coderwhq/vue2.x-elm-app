import {
  COUNT_ADD,
  GOOD_ADD
} from "./mutation-types";

export default {

  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      let oldproduct = context.state.cartList.find(item => item.name === payload.name);
      // let oldproduct;
      // for (const item of context.state.cartList) {
      //   if (item.name === payload.name) {
      //     oldproduct = item;
      //     break;
      //   }
      // }
      if (oldproduct) {
        // 商品数量加一
        context.commit(COUNT_ADD, oldproduct);
      }
      else {
        // 加入新的商品
        context.commit(GOOD_ADD, payload);
      }
      resolve();
    })
  },

  subCart(context, payload) {
    return new Promise((resolve, reject) => {
      // 数组解构，红宝书第6页
      for (const [idx, item] of context.state.cartList.entries()) {
        if (item.name === payload.name) {
          item.count--;
          if (item.count == 0) {
            context.state.cartList.splice(idx, 1);
          }
          break;
        }
      }
      resolve();
    })
  },

  clearCart(context) {
    return new Promise((resolve, reject) => {

      const payload = context.state.cartList;
      while (payload.length) {
        payload.pop().count = 0;
      }
      resolve();
    })
  }

}
