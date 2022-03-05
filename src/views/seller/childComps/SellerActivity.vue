<template>
  <div class="seller-active">
    <div class="active-title">
      公告与活动
    </div>
    <div class="active-content">
      <div class="bulletin-text">{{bulletin}}</div>
      <div class="description-item" v-for="(item, index) in supports" :key="index">
        <span :class="classMap[item.type]" class="icon"></span>
        <span>{{item.description}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SellerActivity",
  data() {
    return {
      classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    }
  },
  props:{
    bulletin: {
      type: String,
      default: ''
    },
    supports: {
      type: Array,
      default() {
        return [];
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/assets/css/mixin.scss";
  $component: seller;
  .seller-active{
    padding: 15px;
    background-color: #fff;
    border-top: 1px solid #e3e5e8;
    border-bottom: 1px solid #e3e5e8;
    margin-bottom: 15px;
    .active-title{
      font-size: 14px;
    }
    .active-content{
      padding: 0 5px;
      .bulletin-text{
        padding: 8px 8px;
        color: red;
        line-height: 20px;
      }
      .description-item{
        border-top: 1px solid #f4f5f5;
        padding: 12px 8px;
        .icon{
          display: inline-block;
          width: 16px;
          height: 16px;
          vertical-align: middle;
          margin-right: 6px;
          background-size: 16px 16px;
          background-repeat: no-repeat;
          &.decrease{
            @include bg-image($component, 'decrease_4');
          }
          &.discount{
            @include bg-image($component, 'discount_4');
          }
          &.guarantee{
            @include bg-image($component, 'guarantee_4');
          }
          &.invoice{
            @include bg-image($component, 'invoice_4');
          }
          &.special{
            @include bg-image($component, 'special_4');
          }
        }
      }
    }
  }
</style>
