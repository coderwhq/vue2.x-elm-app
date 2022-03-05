<template>
  <div class="seller">
    <scroll :observeDOM="true"
            :observeImage="true">
      <seller-introductionr :introduction="introduction"></seller-introductionr>
      <seller-activity :bulletin="bulletin" :supports="supports"></seller-activity>
      <seller-scene :pics="pics"></seller-scene>
      <seller-info :info="info"></seller-info>
    </scroll>
  </div>
</template>

<script>

  import SellerIntroductionr from "./childComps/SellerIntroduction";
  import SellerActivity from "./childComps/SellerActivity";
  import SellerScene from "./childComps/SellerScene";
  import SellerInfo from "./childComps/SellerInfo";

  import Scroll from "components/common/scroll/Scroll";

  import { getSellerData, Introduction } from "network/seller";

  export default {
    name: "Seller",
    components: {
      SellerIntroductionr,
      SellerActivity,
      SellerScene,
      SellerInfo,
      Scroll
    },
    data() {
      return {
        introduction: {},
        bulletin: '',
        supports: [],
        pics: [],
        info: []
      }
    },
    methods: {
      getSellerData() {
        getSellerData()
          .then((res) => {
            const resData = res.data.data;

            this.introduction = new Introduction(resData);

            this.bulletin = resData.bulletin;
            this.supports = resData.supports;

            this.pics = resData.pics;

            this.info = resData.infos;

          }).catch((err) => {
            console.log(err);
          });
      }
    },
    created() {
      this.getSellerData();
    }
  }
</script>

<style lang="scss" scoped>
  .seller{
    height: calc(100vh - 39px - 140px);
    background-color: #f3f5f7;
  }
</style>
