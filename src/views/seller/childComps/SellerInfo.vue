<template>
  <div class="info">
    <div class="info-title">商家信息</div>
    <div class="info-content">
      <div class="info-item" v-for="(item, index) in info" :key="index">
        {{item}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SellerInfo",
  props: {
    info: {
      type: Array,
      default() {
        return [];
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .info{
    width: 100%;
    padding: 15px 15px 0;
    background-color: #fff;
    border-top: 1px solid #e3e5e8;
    .info-title{
      font-size: 14px;
    }
    .info-content{
      margin-top: 10px;
      .info-item{
        padding: 20px 0px 20px 10px;
        border-top: 1px solid #f3f4f4;
      }
    }
  }
</style>
