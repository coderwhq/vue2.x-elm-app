import { request } from "./request";

export function getGoodsData() {
  return request({
    url: 'goods'
  });
}
