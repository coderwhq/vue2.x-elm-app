<template>
  <transition name="move">
    <div class="detail" v-if="detailActivated">
      <scroll
        :observeDOM="true"
        :observeImage="true">
        <div class="good-wrapper">
          <div class="good-top">
            <img :src="goodDetail.image" alt="">
            <div class="icon" @click="backClick">
              <i class="icon-arrow_lift"></i>
            </div>
          </div>
          <div class="good-bottom">
            <div class="good-info">
              <div class="good-name">{{goodDetail.name}}</div>
              <div class="good-rating">
                <span>月售{{goodDetail.sellCount}}份</span>
                <span>好评率{{goodDetail.rating}}%</span>
              </div>
            </div>
            <div class="price-control clear-fix">
              <div class="prive">￥{{goodDetail.price}}</div>
              <div class="oldprive" v-if="goodDetail.oldPrice">￥{{goodDetail.oldPrice}}</div>
              <div class="control-wrapper">
                <div class="pre-add" v-if="!goodDetail.count" @click="detailAddClick(goodDetail)">加入购物车</div>
                <cart-add :count="goodDetail.count" @addClick="detailAddClick(goodDetail)" @subClick="subClick(goodDetail)"></cart-add>
              </div>
            </div>
          </div>
        </div>
        <div class="good-message">
          <div class="message-title">商品信息</div>
          <div class="message-content" v-if="goodDetail.info">{{goodDetail.info}}</div>
        </div>
        <food-ratings :ratings="goodDetail.ratings"></food-ratings>
      </scroll>
    </div>
  </transition>
</template>

<script>

  import Scroll from 'components/common/scroll/Scroll'

  import CartAdd from 'components/content/cartAdd/CartAdd'
  import FoodRatings from 'components/content/foodRatings/FoodRatings'

  import { cartControl } from 'common/mixin.js'

  export default {
    name: 'Detail',
    components: {
      CartAdd,
      FoodRatings,
      Scroll
    },
    props: {
      detailActivated: {
        type: Boolean,
        default: false
      },
      goodDetail: {
        type: Object,
        default() {
          return {};
        }
      }
    },
    mixins: [cartControl],
    methods: {
      backClick() {
        this.$EventBus.$emit('detailDeActivated');
      },
      detailAddClick(item){
        this.$EventBus.$emit('addClickAnimate', item);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .detail{
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
    width: 100%;
    height: calc(100% - 48px);
    background-color: #f3f5f7;
    .good-wrapper{
      background-color: #fff;
      border-bottom: 1px solid #dbdee1;
      .good-top{
        position: relative;
        img{
          width: 100%;
        }
        .icon{
          position: absolute;
          top: 20px;
          left: 10px;
          z-index: 199;
          color: white;
          font-size: 20px;
        }
      }
      .good-bottom{
        padding: 15px;
        .good-info{
          margin-bottom: 15px;
          color: #93999f;
          font-size: 12px;
          .good-name{
            margin-bottom: 7px;
            font-size: 14px;
            font-weight: bold;
            color: black;
          }
        }
        .price-control{
          .prive{
            float: left;
            color: red;
            font-size: 14px;
            vertical-align: middle;
          }
          .oldprive{
            float: left;
            color: #93999f;
            margin-left: 15px;
            font-size: 12px;
            margin-top: 1px;
            text-decoration: line-through;
          }
          .control-wrapper{
            float: right;
            position: relative;
            width: 80px;
            .pre-add{
              position: absolute;
              z-index: 199;
              width: 80px;
              line-height: 23px;
              font-size: 12px;
              text-align: center;
              color: white;
              border-radius: 15px;
              background-color: #00a0dc;
            }
          }
        }
      }
    }
    .good-message{
      margin: 20px 0;
      padding: 15px;
      border-top: 1px solid #dbdee1;
      border-bottom: 1px solid #dbdee1;
      background-color: #fff;
      .message-title{
        font-size: 14px;
        color: #07111b;
      }
      .message-content{
        color: #4d555d;
        padding: 10px;
        font-size: 12px;
        line-height: 25px;
      }
    }
    &.move-enter-active, &.move-leave-active{
      transition: all .2s linear;
    }
    &.move-enter, &.move-leave-to{
      opacity: 0;
      transform: translate3d(100%, 0, 0);
    }
  }
</style>
