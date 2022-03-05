<template>
  <div class="introduction">
    <div class="top clear-fix">
      <div class="top-left">
        <div class="seller-name">{{introduction.name}}</div>
        <div class="seller-data">
          <star class="star" :size="36" :score="introduction.score"></star>
          <span>({{introduction.ratingCount}})</span>
          <span>月售{{introduction.sellCount}}单</span>
        </div>
      </div>
      <div class="top-right" @click="favoriteClick">
        <div class="favorite" :class="{'y-favorite': isFavorite}">
          <span class="icon-favorite"></span>
        </div>
        <div class="text">
          <span v-if="!isFavorite">收藏</span>
          <span v-else>已收藏</span>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="bottom-left">
        <div>起送价</div>
        <div class="btm-txt">
          <span class="big-text">{{introduction.minPrice}}</span>
          <span>元</span>
        </div>
      </div>
      <div class="bottom-mid">
        <div>商家配送</div>
        <div class="btm-txt">
          <span class="big-text">{{introduction.deliveryPrice}}</span>
          <span>元</span>
        </div>
      </div>
      <div class="bottom-right">
        <div>平均配送时间</div>
        <div class="btm-txt">
          <span class="big-text">{{introduction.deliveryTime}}</span>
          <span>分钟</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import star from "components/content/star/Star";

  export default {
    name: "SellerIntroduction",
    components: {
      star
    },
    data() {
      return {
        isFavorite: localStorage.getItem('favorite')==='true'
      }
    },
    props: {
      introduction: {
        type: Object,
        default() {
          return {};
        }
      }
    },
    methods: {
      favoriteClick() {
        this.isFavorite = !this.isFavorite;
        localStorage.setItem('favorite', this.isFavorite ? 'true' : 'false');
      }
    }
  }
</script>

<style lang="scss" scoped>
  .introduction{
    color: #787e84;
    padding: 0 15px;
    margin-bottom: 15px;
    border-bottom: 1px solid #e3e5e8;
    background-color: #fff;
    .top{
      padding: 15px 0 ;
      border-bottom: 1px solid #f6f7f7;
      .top-left{
        float: left;
        .seller-name{
          color: #434b52;
          font-size: 14px;
        }
        .seller-data{
          margin-top: 8px;
          .star{
            display: inline-block;
            vertical-align: middle;
          }
          &>span{
            margin-left: 8px;
            vertical-align: middle;
          }
        }
      }
      .top-right{
        margin-right: 15px;
        width: 40px;
        display: flex;
        flex-direction: column;
        align-items: center;
        float: right;
        .favorite{
          font-size: 25px;
          color: #d4d6d9;
        }
        .y-favorite{
          color: red;
        }
        .text{
          margin-top: 4px;
        }
      }
    }
    .bottom{
      padding: 15px 0;
      display: flex;
      &>div{
        flex: 1;
        display: flex;
        flex-direction: column;
        text-align: center;
      }
      .btm-txt{
        margin-top: 5px;
        color: black;
        .big-text{
          font-size: 25px;
        }
      }
      .bottom-left{
        border-right: 1px solid #e6e7e8;
      }
      .bottom-mid{
        border-right: 1px solid #e6e7e8;
      }
    }
  }
</style>
