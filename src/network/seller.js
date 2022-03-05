import { request } from "./request";

export function getSellerData() {
  return request({
    url: 'seller'
  });
}

export class Introduction {
  constructor(data) {
    this.deliveryPrice = data.deliveryPrice;
    this.deliveryTime = data.deliveryTime;
    this.name = data.name;
    this.ratingCount = data.ratingCount;
    this.minPrice = data.minPrice;
    this.score = data.score;
    this.sellCount = data.sellCount;
  }
}
