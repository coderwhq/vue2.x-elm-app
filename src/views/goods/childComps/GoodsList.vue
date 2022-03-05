<template>
  <scroll ref="scroll"
          :observeDOM="true"
          :observeImage="true"
          :probeType="3"
          @scroll="contentScroll">
    <div class="list-wrapper">
      <div v-for="(good, index) in goods"
            :key="index"
            :class="'good'+index">
        <div class="type-title">{{good.name}}</div>
        <div class="good-wrapper">
          <div v-for="(item, index) in good.foods"
              :key="index"
              class="food-item"
              @click="foodClick(item)">
            <div class="food-icon"><img :src="item.icon" alt=""></div>
            <div class="food-info">
              <div class="food-name">{{item.name}}</div>
              <div class="food-description">{{item.description}}</div>
              <div class="food-rating">
                <span>月售{{item.sellCount}}份</span>
                <span>好评率{{item.rating}}%</span>
              </div>
              <div class="food-price">
                <span class="newprice">￥{{item.price}}</span>
                <span v-if="item.oldPrice" class="oldprice">￥{{item.oldPrice}}</span>
              </div>
            </div>
            <div class="control">
              <cart-add @addClick="goodAddClick(item)" @subClick="subClick(item)" :count="item.count"></cart-add>
            </div>
          </div>
        </div>
      </div>
    </div>
  </scroll>
</template>

<script>

  import {cartControl} from 'common/mixin.js'

  import Scroll from 'components/common/scroll/Scroll'

  import CartAdd from 'components/content/cartAdd/CartAdd'

  export default {
    name: 'GoodsList',
    components: {
      Scroll,
      CartAdd
    },
    data() {
      return {
      }
    },
    props: {
      goods: {
        type: Array,
        default() {
          return [];
        }
      }
    },
    mixins: [cartControl],
    methods: {
      contentScroll(position) {
        this.$emit('contentScroll', position);
      },
      foodClick(item) {
        this.$EventBus.$emit('detailActivated',item);
      },
      goodAddClick(item) {
        this.$EventBus.$emit('addClickAnimate', item);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .list-wrapper{
    position: relative;
    .type-title{
      width: 100%;
      height: 26px;
      line-height: 26px;
      padding-left: 15px;
      border-left: 2px solid #dfe3e6;
      background-color: #f3f5f7;
      color: #93999f;
    }
    .good-wrapper{
      position: relative;
      width: 100%;
      display: flex;
      flex-direction: column;
      padding: 0px 15px;
      background-color: #fff;
      .food-item{
        display: flex;
        position: relative;
        padding: 15px 0px;
        border-bottom: 1px solid #f9fafa;
        color: #93999f;
        .food-icon{
          img{
            width: 57px;
            height: 57px;
          }
        }
        .food-info{
          margin-left: 8px;
          div{
            margin-bottom: 4px;
          }
          .food-name{
            font-size: 14px;
            color: black;
          }
          .food-rating{
            span{
              margin-right: 8px;
            }
          }
          .food-price{
            font-size: 14px;
            color: red;
            .oldprice{
              margin-left: 8px;
              font-size: 12px;
              color: #93999f;
              text-decoration: line-through;
            }
          }
        }
        .control{
          position: absolute;
          bottom: 5px;
          right: 5px;
        }
      }
    }
  }
</style>
