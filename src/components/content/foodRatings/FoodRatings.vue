<template>
  <div class="rating">
    <div class="rating-head">
      <div class="head-top">
        <div class="rating-title">商品评价</div>
        <div class="rating-button clear-fix">
          <div class="all" @click="allClick">全部{{ratingCount(-1)}}</div>
          <div class="good" @click="goodClick">满意{{ratingCount(0)}}</div>
          <div class="no-good" @click="noGoodClick">不满意{{ratingCount(1)}}</div>
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
          <div class="head clear-fix">
            <div class="rating-time">{{item.rateTime | dateformat}}</div>
            <div class="rating-auther">
              <span class="auther">{{item.username}}</span>
              <img :src="item.avatar" alt="">
            </div>
          </div>
          <div class="content clear-fix">
            <div class="ratetype-icon">
              <i :class="{'icon-thumb_up': !item.rateType,
                          'icon-thumb_down': item.rateType}"></i>
            </div>
            <div class="rating-text">{{item.text}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import { ratingsControl } from 'common/mixin.js'

  export default {
    name: 'FoodRatings',
    props: {
      ratings: {
        type: Array,
        default() {
          return [];
        }
      }
    },
    mixins: [ratingsControl]
  }
</script>

<style lang="scss" scoped>
  .rating{
    background-color: #fff;
    border-top: 1px solid #dbdee1;;
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
      padding: 0 10px;
      .rating-item{
        padding: 10px;
        border-bottom: 1px solid #f2f3f3;
        .head{
          color: #93999f;
          .rating-time{
            float: left;
          }
          .rating-auther{
            float: right;
            img{
              width: 13px;
              border-radius: 50%;
              vertical-align: top;
            }
            .auther{
              vertical-align: top;
              margin-right: 5px;
            }
          }
        }
        .content{
          margin: 10px 0;
          .ratetype-icon{
            float: left;
            margin-right: 8px;
            .icon-thumb_up{
              color: #00a0dc;
            }
            .icon-thumb_down{
              color: #93999f;
            }
          }
          .rating-text{
            float: left;
          }
        }
      }
    }
  }
</style>
