<template>
  <div class="carts">
    <transition name="fold">
      <div class="cart-list" ref="cartList" v-if="isShow">
        <div class="cart-bar">
          <div class="cart-title">购物车</div>
          <div class="cart-clear" @click="clearClick">清空</div>
        </div>
        <div class="goods-content">
          <!-- 这里需要额外加一层div，目的可以查阅关键字：当父元素设置max-height子元素%失效
          加了flex即可解决这种现象    -->
          <div class="content">
            <scroll ref="scroll"
                  :observeDOM="true"
                  :observeImage="true"
                  :probeType="3">
              <div v-for="(item, index) in cartList"
                  :key="index"
                  class="good-wrapper">
                <div class="good-name">{{item.name}}/{{item.count}}个</div>
                <div class="control">
                  <div class="good-price">￥{{item.price}}</div>
                  <cart-add :count="item.count"  @addClick="addClick(item)" @subClick="subClick(item)" ></cart-add>
                </div>
              </div>
            </scroll>
          </div>
        </div>
      </div>
    </transition>
    <div class="cart-content" @click="clickCart">
      <div class="left clear-fix">
        <div class="logo-wrapper">
          <div class="logo" :class="{active: cartLength}">
            <i class="icon-shopping_cart"></i>
          </div>
          <div class="cart-list-count" v-if="cartLength">{{cartLength}}</div>
        </div>
        <div class="price">￥{{finalPrice}}</div>
      </div>
      <div class="right">
        <div class="pay" v-if="finalPrice === 0">￥{{subprice}}元起送</div>
        <div class="pay" v-else-if="finalPrice < subprice">还差￥{{subprice - finalPrice}}元起送</div>
        <div class="pay current-pay" v-else @click.stop="payClick">去结算</div>
      </div>
    </div>
    <transition name="fade">
      <div class="mask" v-if="isShow" @click="maskClick"></div>
    </transition>
    <div class="ball-wrapper">
      <transition name="drop"
                  v-for="(ball, index) in balls" :key="index"
                  @before-enter="beforeEnter"
                  @enter="Enter"
                  @after-enter="afterEnter"
                  :css="false">
        <div class="ball" v-if="ball.isShow">
          <div class="inner inner-hook"></div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>


  import CartAdd from 'components/content/cartAdd/CartAdd'
  import Scroll from  'components/common/scroll/Scroll'

  import { mapActions, mapGetters } from 'vuex'
  import { cartControl } from 'common/mixin.js'

  export default {
    name: 'Carts',
    components: {
      CartAdd,
      Scroll
    },
    data() {
      return {
        subprice: 20,
        currentCart: false,
        balls: [
          {isShow: false},
          {isShow: false},
          {isShow: false},
          {isShow: false},
          {isShow: false}
        ],
        droppingBalls: []
      }
    },
    mixins: [cartControl],
    methods: {
      ...mapActions(['clearCart']),
      clearClick(){
        this.clearCart();
      },
      clickCart(){
        if(this.cartLength){
          this.currentCart = !this.currentCart;
        }
      },
      payClick() {
        alert(`支付${this.finalPrice}元`);
      },
      maskClick() {
        this.currentCart = !this.currentCart;
      },
      drop(pointEle) {
        const ball = this.balls.find(ball => !ball.isShow);
        if(ball){
          ball.pointEle = pointEle;
          ball.isShow = true;
          this.droppingBalls.push(ball);
        }
      },
      beforeEnter(el) {
        const ball = this.droppingBalls.shift();
        const {left, top} = ball.pointEle.getBoundingClientRect();
        const eleleft = 32;
        const elebottom = 22;
        let x = left - eleleft;
        let y = -(window.innerHeight - elebottom - top);
        el.style.transform = `translate3d(0,${y}px,0)`;
        el.children[0].style.transform = `translate3d(${x}px,0,0)`;
        el.ball = ball;
      },
      Enter(el, done) {
        el.offsetHeight;
        el.style.transform = `translate3d(0,0,0)`;
        el.children[0].style.transform = `translate3d(0,0,0)`;
        done();
      },
      afterEnter(el) {
        setTimeout(() => {
          // console.log(el);
          el.ball.isShow = false;
        }, 400);
      }
    },
    computed: {
      ...mapGetters({
        cartList: 'cartList',
        cartLength: 'cartLength',
        finalPrice: 'cartPrice'
      }),
      isShow() {
        if(!this.cartLength){
          this.currentCart = false;
        }
        return this.currentCart;
      }
    }
  }
</script>

<style lang="scss" scoped>
  .carts{
    position: fixed;
    z-index: 999;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 48px;
    // background-color: #141d27;
    color: #80858a;
    .cart-list{
      position: absolute;
      z-index: 1009;
      width: 100%;
      background-color: #fff;
      color: #07111b;
      transform: translate3d(0, -100%, 0); /*显示时的状态*/
      .cart-bar{
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 40px;
        line-height: 40px;
        padding: 0 20px;
        border-bottom: 1px solid #d3d6d9;
        background-color: #f3f5f7;
        .cart-clear{
          color: #00a0dc;
        }
      }
      .goods-content{
        max-height: 180px;
        display: flex;
        overflow: hidden;
        .content{
          // 这里需要额外加一层div，目的可以查阅关键字：当父元素设置max-height子元素%失效
          // 加了flex即可解决这种现象
          flex: 1;
          .good-wrapper{
            display: flex;
            justify-content: space-between;
            align-content: center;
            height: 40px;
            line-height: 40px;
            padding: 0 20px;
            border-bottom: 1px solid #f8f9f9;
            .control{
              display: flex;
              justify-content: space-evenly;
              .good-price{
                color: red;
              }
            }
          }
        }
      }
      &.fold-enter-active, &.fold-leave-active{
        transition: all 0.5s;
      }
      &.fold-enter, &.fold-leave-active{
        transform: translate3d(0, 0, 0);
      }
    }
    .cart-content{
      position: relative;
      z-index: 1099;
      display: flex;
      height: 100%;
      font-weight: bold;
      background-color: #141d27;
      .left{
        flex: 2;
        line-height: 48px;
        &>div{
          float: left;
          height: 100%;
        }
        .logo-wrapper{
          width: 60px;
          height: 60px;
          position: relative;
          z-index: 1999;
          bottom: 12px;
          left: 0;
          margin: 0 10px;
          border-radius: 50%;
          background-color: #141d27;
          .logo{
            width: 44px;
            height: 44px;
            position: absolute;
            z-index: 2999;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-50%);
            border-radius: 50%;
            background-color: #2b343c;
            text-align: center;
            font-size: 25px;
          }
          .active{
            color: white;
            background-color: rgb(0, 160, 220);
          }
          .cart-list-count{
            position: absolute;
            right: 0;
            top: 3px;
            z-index: 3999;
            width: 23px;
            height: 15px;
            line-height: 15px;
            text-align: center;
            font-size: 13px;
            color: white;
            border-radius: 10px;
            background-color: red;
          }
        }
        .price{
          font-size: 17px;
          position: relative;
          z-index: 1999;
          &::after{
            content: "";
            display: block;
            position: absolute;
            z-index: 1999;
            width: 1px;
            height: 24px;
            top: 12px;
            right: -15px;
            background-color: #2c343d;
          }
        }
      }
      .right{
        flex: 1;
        .pay{
          width: 100%;
          line-height: 48px;
          text-align: center;
          font-size: 12px;
          background-color: #2b333b;
        }
        .current-pay{
          background-color: rgb(0, 180, 60);
          color: white;
        }
      }
    }
    .mask{
      position: fixed;
      top: 0;
      left: 0;
      z-index: 1003;
      width: 100%;
      height: 100%;
      backdrop-filter: blur(10px);
      background-color: rgba(7, 17, 27, 0.6);
      &.fade-enter-active, &.fade-leave-active{
        transition: all 0.5s;
      }
      &.fade-enter, &.fade-leave-active{
        opacity: 0;
        background: rgba(7, 17, 27, 0);
      }
    }
    .ball-wrapper{
      .ball{
        position: fixed;
        left: 32px;
        bottom: 22px;
        z-index: 9999;
        //background-color: #fff;
        transition: all .4s cubic-bezier(0.49, -0.29, 0.75, 0.41);
        .inner{
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: rgb(0, 160, 220);
          transition: all .4s linear;
        }
      }
    }
  }
</style>
