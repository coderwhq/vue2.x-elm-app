<template>

  <div class="ratings">
    <scroll :observeDOM="true"
            :observeImage="true">
      <div class="assess">
        <div class="assess-left">
          <div class="assess-score score">{{sellerData.score}}</div>
          <div>综合评分</div>
          <div class="assess-rankrate">高于周边商家{{sellerData.rankRate}}%</div>
        </div>
        <div class="assess-right">
          <div class="servicescore-wrapper">
            <span>服务态度</span>
            <star class="star" :score="sellerData.serviceScore" :size="36"></star>
            <span class="score">{{sellerData.serviceScore}}</span>
          </div>
          <div class="foodscore-wrapper">
            <span>商品评分</span>
            <star class="star" :score="sellerData.foodScore" :size="36"></star>
            <span class="score">{{sellerData.foodScore}}</span>
          </div>
          <div class="deliverytime-wrapper">
            <span>送达时间</span>
            <span class="deliverytime">{{sellerData.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <!-- 评论 -->
      <div class="rating-wrapper">
        <div class="rating-head">
          <div class="head-top">
            <div class="rating-button clear-fix">
              <div class="all" @click="allClick">全部 {{ratingCount(-1)}}</div>
              <div class="good" @click="goodClick">满意 {{ratingCount(0)}}</div>
              <div class="no-good" @click="noGoodClick">不满意 {{ratingCount(1)}}</div>
            </div>
          </div>
          <div class="head-bottom" @click="onlyContentClick">
            <i class="icon-check_circle head-bottom-icon" :class="{'icon-active': onlyContent}"></i>
            <span class="head-bottom-text">只看有内容的评价</span>
          </div>
        </div>
        <div class="rating-body">
          <div v-for="(item, index) in getRatings"
                :key="index">
            <div v-if="item.rateType === showRatetype || showRatetype === -1" class="rating-item">
              <div class="item-left">
                <img :src="item.avatar" alt="">
              </div>
              <div class="item-right">
                <div class="head clear-fix">
                  <div class="rating-auther clear-fix">
                    <div class="username">{{item.username}}</div>
                    <div class="auther-star">
                      <star :score="item.score" :size="24"></star>
                      <span>{{item.deliveryTime}}</span>
                    </div>
                  </div>
                  <div class="rating-time">{{item.rateTime | dateformat}}</div>
                </div>
                <div class="content clear-fix">
                  <div class="rating-text">{{item.text}}</div>
                  <div class="ratetype-icon">
                    <i :class="{'icon-thumb_up': !item.rateType,
                                'icon-thumb_down': item.rateType}"></i>
                    <div v-for="(i, idx) in item.recommend" :key="idx">{{i}}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>

  import Scroll from 'components/common/scroll/Scroll'

  import Star from 'components/content/star/Star'

  import { ratingsControl } from 'common/mixin.js'

  import { getRatingsData } from 'network/ratings'
  import { getSellerData } from 'network/seller'

  export default {
    name: "Ratings",
    components: {
      Star,
      Scroll
    },
    data() {
      return {
        ratings: [],
        sellerData: {},
      }
    },
    mixins: [ratingsControl],
    methods: {
      getRatingsData() {
        getRatingsData()
          .then((res) => {
            const resData = res.data.data;
            // console.log(resData);
            this.ratings = resData;
          }).catch((err) => {
            console.log(err);
          });
      },
      getSellerData() {
        getSellerData()
          .then((res) => {
            const resData = res.data.data;
            // console.log(resData);
            this.sellerData = resData;
          }).catch((err) => {
            console.log(err);
          })
      }
    },
    created() {
      this.getRatingsData();
      this.getSellerData();
    }
  }
</script>

<style lang="scss" scoped>
  .ratings{
    height: calc(100vh - 39px - 140px);
    background-color: #f3f5f7;
    .score{
      color: #ff9900;
    }
    .assess{
      padding: 15px 0;
      display: flex;
      background-color: #fff;
      border-bottom: 1px solid #dbdee1;
      .assess-left{
        width: 137px;
        padding: 6px 0;
        text-align: center;
        border-right: 1px solid #e6e7e8;
        &>div{
          margin-bottom: 8px;
        }
        .assess-score{
          font-size: 25px;
        }
        .assess-rankrate{
          color: #93999f;
        }
      }
      .assess-right{
        padding: 6px 0 6px 24px;
        &>div{
          margin-bottom: 8px;
          &>span{
            vertical-align: middle;
          }
          .star{
            display: inline-block;
            margin: 0 10px;
            vertical-align: middle;
          }
        }
        .deliverytime{
          color: #93999f;
          margin-left: 10px;
        }
      }
    }
    .rating-wrapper{
      margin-top: 15px;
      background-color: #fff;
      border-top: 1px solid #dbdee1;
      .rating-head{
        padding: 15px;
        border-bottom: 1px solid #ececed;
        .head-top{
          border-bottom: 1px solid #f4f5f5;
          .rating-title{
            font-size: 14px;
            color: #07111b;
          }
          .rating-button{
            padding: 15px 0;
            &>div{
              float: left;
              margin-right: 7px;
              height: 30px;
              line-height: 30px;
              text-align: center;
              padding: 0 15px;
            }
            .all{
              background-color: #00a0dc;
              color: white;
            }
            .good{
              background-color: #ccecf8;
              color: #4d555d;
            }
            .no-good{
              background-color: #dbdddf;
              color: #4d555d;
            }
          }
        }
        .head-bottom{
          margin-top: 10px;
          color: #93999f;
          .head-bottom-icon{
            font-size: 25px;
            vertical-align: middle;
            margin-right: 5px;
          }
          .head-bottom-text{
            vertical-align: middle;
          }
          .icon-active{
            color: #00c850;
          }
        }
      }
      .rating-body{
        padding: 0 15px;
        color: #93999f;
        .rating-item{
          display: flex;
          padding: 15px 0;
          border-bottom: 1px solid #f3f4f4;
          .item-left{
            flex: 1;
            margin-right: 10px;
            img{
              width: 30px;
              border-radius: 50%;
            }
          }
          .item-right{
            flex: 9;
            .head{
              .rating-auther{
                float: left;
                .username{
                  color: black;
                }
                .auther-star{
                  &>div{
                    margin-top: 4px;
                    margin-right: 5px;
                    display: inline-block;
                  }
                }
              }
              .rating-time{
                float: right;
              }
            }
            .content{
              .rating-text{
                color: #000;
                margin: 5px 0 0;
                line-height: 18px;
              }
              .ratetype-icon{
                &>div{
                  display: inline-block;
                  padding: 2px 5px;
                  border: 1px solid #93999f;
                  margin-left: 8px;margin-top: 5px;
                }
                .icon-thumb_up{
                  color: #00a0dc;
                }
                .icon-thumb_down{
                  color: #93999f;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
