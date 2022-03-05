<template>
  <div class="scene">
    <div class="scene-title">
      商家实景
    </div>

    <div class="scene-content">
      <scroll :observeDOM="true"
              :observeImage="true"
              :scrollX="true"
              :scrollY="false"
              ref="scroll">
        <div v-for="(item, index) in pics" class="picsItem">
          <img :src="item">
        </div>
      </scroll>
    </div>
  </div>
</template>

<script>

  import Scroll from "components/common/scroll/Scroll";

  export default {
    name: "SellerScene",
    components: {
      Scroll
    },
    props: {
      pics: {
        type: Array,
        default() {
          return [];
        }
      }
    },
    methods: {
    }
  }
</script>

<style lang="scss" scoped>
  .scene{
    width: 100%;
    padding: 15px;
    background-color: #fff;
    border-top: 1px solid #e3e5e8;
    border-bottom: 1px solid #e3e5e8;
    margin-bottom: 15px;
    .scene-title{
      font-size: 14px;
    }
    .scene-content{
      padding-top: 15px;
      width: 100%;
      .picsItem{
        display: inline-block;
        margin-right: 6px;
        img{
          width: 120px;
          height: 90px;
        }
      }
    }
  }
</style>
