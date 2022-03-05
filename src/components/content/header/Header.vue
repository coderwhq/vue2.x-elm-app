<template>
  <div class="header">
    <div class="background">
      <img :src="seller.avatar" alt="">
    </div>
    <div class="content-wrapper">
      <div class="avatar">
        <img :src="seller.avatar" alt="">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          <span>
            {{seller.description}}/{{seller.deliveryTime}}分钟送达
          </span>
        </div>
        <!-- 为了防止数据还未成功赋值，所以加上这一句v-if，防止报错 -->
        <div class="support" v-if="seller.supports">
          <span class="icon" :class="iconMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
    </div>
    <div class="support-count" v-if="seller.supports" @click="supportsClick">
      <span>{{seller.supports.length}}个</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="bulletin-wrapper" @click="bulletinClick">
      <span class="bulletin-icon"></span>
      <span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <transition name="fade">
      <div class="active-mask" v-if="isShowMask">
      <div class="main-title">
        <div class="seller-name">
          {{seller.name}}
        </div>
        <div class="star-wrapper">
          <star :score="seller.score" :size="48"></star>
        </div>
      </div>
      <div class="seller-support">
        <div class="support-title">
          <div class="line"></div>
          <div>优惠信息</div>
          <div class="line"></div>
        </div>
        <div class="support-content">
          <div class="support-item"
               v-for="(item, index) in seller.supports"
               :key="index">
            <span class="support-icon" :class="iconMap[item.type]"></span>
            <span>{{item.description}}</span>
          </div>
        </div>
      </div>
      <div class="seller-bulletin">
        <div class="bulletin-title">
          <div class="line"></div>
          <div>商家公告</div>
          <div class="line"></div>
        </div>
        <div class="bulletin-text">{{seller.bulletin}}</div>
      </div>
      <div class="mask-close" @click="closeClick">
        <span class="icon-close"></span>
      </div>
    </div>
    </transition>
  </div>
</template>

<script>

  import star from "../star/Star";

  import {getSellerData} from 'network/seller';

  export default {
    name: 'Header',
    components: {
      star
    },
    data() {
      return {
        seller: {},
        iconMap: ["decrease", "discount", "guarantee", "invoice", "special"],
        isShowMask: false
      }
    },
    methods: {
      // 获取header数据
      getSellerData(){
        getSellerData().then(res => {
          const resData = res.data;
          if(resData.code === 0){
            this.seller = resData.data;
          }
          // console.log(resData.data);
        }).catch(err => {
          console.log(err, 'header请求seller数据失败');
        })
      },
      supportsClick(){
        this.isShowMask = !this.isShowMask;
      },
      bulletinClick(){
        this.isShowMask = !this.isShowMask;
      },
      closeClick(){
        this.isShowMask = false;
      }
    },
    created() {
      this.getSellerData();
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/css/mixin.scss";
  $components: header;
  .header{
    position: relative;
    color: white;
    background-color:rgba(7,17,27,0.5);
    .background{
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: -1;
      left: 0;
      padding: 0;
      img{
        width: 100%;
        height: 100%;
        // 模糊滤镜
        filter: blur(10px);
      }
    }
    .content-wrapper{
      display: flex;
      align-items: center;
      position: relative;
      padding: 24px 18px;
      .avatar{
        img{
          width: 64px;
          height: 64px;
          vertical-align: middle;
        }
      }
      .content{
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 64px;
        margin-left: 16px;
        &>div{
          margin: 2px 0;
        }
        .title{
          .brand{
            display: inline-block;
            @include bg-image($components, brand);
            width: 30px;
            height: 18px;
            vertical-align: top;
            background-size: 30px 18px;
            background-repeat: no-repeat;
          }
          .name{
            font-size: 16px;
            font-weight: bold;
            line-height: 18px;
            margin-left: 10px;
          }
        }
        .support{
          .icon{
            display: inline-block;
            width: 12px;
            height: 12px;
            vertical-align: top;
            background-size: 12px 12px;
            background-repeat: no-repeat;
            &.decrease{
              @include bg-image($components, decrease_1)
            }
            &.discount{
              @include bg-image($components, discount_1)
            }
            &.guarantee{
              @include bg-image($components, guarantee_1)
            }
            &.invoice{
              @include bg-image($components, invoice_1)
            }
            &.special{
              @include bg-image($components, special_1)
            }
          }
          .text{
            margin-left: 10px;
          }
        }
      }
    }
    .support-count{
      position: absolute;
      right: 30px;
      bottom: 50px;
      padding: 5px 8px;
      height: 22px;
      border-radius: 8px;
      background-color: rgba(0, 0, 0, 0.2);
    }
    .bulletin-wrapper{
      position: relative;
      padding: 0 20px 0 12px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      background-color: rgba(7, 17, 27, 0.2);
      .bulletin-icon{
        display: inline-block;
        width: 22px;
        height: 12px;
        @include bg-image($components, bulletin);
        vertical-align: middle;
        background-size: 22px 12px;
        background-repeat: no-repeat;
      }
      .bulletin-text{
        margin-left: 10px;
        line-height: 28px;
      }
      .icon-keyboard_arrow_right{
        position: absolute;
        right: 10px;
        bottom: 7px;
        font-size: 14px;
      }
    }
    .active-mask{
      padding: 40px 0 0;
      position: fixed;
      top: 0;
      left: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      height: 100%;
      z-index: 9900;
      text-align: center;
      background-color: rgba(7,17,27,0.8);
      &>div{
        width: 90%;
      }
      .main-title{
        .seller-name{
          font-size: 15px;
          font-weight: bold;
          margin-bottom: 15px;
        }
      }
      .seller-support{
        margin-top: 30px;
        .support-title{
          display: flex;
          justify-content: space-evenly;
          align-items: center;
          font-size: 15px;
        }
        .support-content{
          text-align: left;
          padding: 20px;
          .support-item{
            padding: 7px;
            &>span{
              vertical-align: middle;
            }
            .support-icon{
              margin-right: 8px;
              display: inline-block;
              width: 15px;
              height: 15px;
              vertical-align: top;
              background-size: 15px 15px;
              background-repeat: no-repeat;
              &.decrease{
                @include bg-image($components, decrease_1)
              }
              &.discount{
                @include bg-image($components, discount_1)
              }
              &.guarantee{
                @include bg-image($components, guarantee_1)
              }
              &.invoice{
                @include bg-image($components, invoice_1)
              }
              &.special{
                @include bg-image($components, special_1)
              }
            }
          }
        }
      }
      .seller-bulletin{
        margin-top: 10px;
        .bulletin-title{
          display: flex;
          justify-content: space-evenly;
          align-items: center;
          font-size: 15px;
        }
        .bulletin-text{
          padding: 20px;
          line-height: 20px;
          text-align: left;
        }
      }
      .mask-close{
        position: absolute;
        font-size: 30px;
        color: rgba(255,255,255,0.5);
        bottom: 20px;
      }
      .line{
        width: 100px;
        height: 2px;
        background-color: #61676e;
      }
    }
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>
