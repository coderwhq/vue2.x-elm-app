import { request } from "./request";

export function getRatingsData() {
  return request({
    url: 'ratings'
  });
}
