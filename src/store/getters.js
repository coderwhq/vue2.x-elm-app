export default {
  cartLength(state) {
    return state.cartList.reduce((pre, cur) => {
      return pre + cur.count;
    }, 0);
  },
  cartList(state) {
    return state.cartList;
  },
  cartPrice(state) {
    // 红宝书第154页
    return state.cartList.reduce((pre, cur, index, arr) => {
      return pre + cur.price * cur.count;
    }, 0)
  }
}