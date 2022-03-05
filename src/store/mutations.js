import {
  COUNT_ADD,
  GOOD_ADD
} from "./mutation-types";

export default {
  [COUNT_ADD](state, good) {
    good.count++
  },
  [GOOD_ADD](state, newgood) {
    newgood.count++;
    state.cartList.push(newgood);
  }
}
