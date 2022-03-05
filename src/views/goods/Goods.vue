<template>
  <div class="goods">
    <div class="goods-tab">
      <goods-tab :typeName="typeName" @titleClick="titleClick" ref="tab"></goods-tab>
    </div>
    <div class="goods-list">
      <goods-list :goods="goodsData" ref="goods" @contentScroll="goodScroll"></goods-list>
    </div>
    <detail :detailActivated="detailActivated" :goodDetail="detailData"></detail>
    <carts ref="carts"></carts>
  </div>
</template>

<script>

  import GoodsList from './childComps/GoodsList.vue'
  import GoodsTab from './childComps/GoodsTab.vue'

  import Detail from '../detail/Detail.vue'

  import Carts from 'components/content/carts/Carts.vue'

  import { getGoodsData } from 'network/goods'
  import { cartControl } from "common/mixin";

  export default {
    name: "Goods",
    components: {
      GoodsList,
      GoodsTab,
      Carts,
      Detail
    },
    data() {
      return {
        goodsData: [],
        typeName: [],
        goodTopYs: [],
        detailActivated: false,
        detailData: {}
      }
    },
    mixins: [cartControl],
    methods: {
      getGoodsData() {
        getGoodsData()
          .then(res => {
            // console.log(res);
            const goodsData = res.data.data;
            goodsData.forEach(i => {
              i.foods.forEach(item =>  {
                item.count = 0;
              });
            });
            this.goodsData = goodsData;
            // 把typename提取出来
            for(const item of goodsData){
              this.typeName.push({
                'name': item.name,
                'type': item.type
              });
            }
            // 防止initGoodTop函数内的goodsData未获取
            this.$nextTick(() => {
              this.initGoodTop();
            })
          })
          .catch(err => {
            console.log(err);
          })
      },
      titleClick(index){
        // tab选项控制滚动
        // 两种方法
        // 一：利用算出来的offsettop数组和scrollTo去实现
        // this.$refs.goods.$refs.scroll.scrollTo(0, -this.goodTopYs[index], 100);
        // 二：利用插件自带的scrollToElement方法去实现
        this.$refs.goods.$refs.scroll.scrollToElement(`.good${index}`, 300);
      },
      initGoodTop() {
        const len = this.goodsData.length;
        // console.log(len);
        for(let i = 0; i < len; i ++){
          this.goodTopYs.push(this.$refs.goods.$el.querySelector(`.good${i}`).offsetTop);
        }
      },
      goodScroll(position) {
        // 滚动控制tab选项
        const positionY = -position.y;
        let len = this.goodTopYs.length;
        for(let i = 0; i < len; i ++){
          if(
            (i != len - 1 && positionY >= this.goodTopYs[i] && positionY < this.goodTopYs[i + 1])
              ||
            (i == len - 1 && positionY >= this.goodTopYs[i])
          ){
            this.$refs.tab.currentIndex = i;
            break;
          }
        }

      },
      detailActivatedFun(data) {
        this.detailData = data;
        this.detailActivated = true;
      },
      detailDeActivatedFun() {
        this.detailActivated = false;
      },
      addClickAnimate(item){
        this.$refs.carts.drop(event.target);
        this.addClick(item)
      }
    },
    created() {
      this.getGoodsData();
    },
    mounted() {
      this.$EventBus.$on('detailActivated', this.detailActivatedFun);
      this.$EventBus.$on('detailDeActivated', this.detailDeActivatedFun);
      this.$EventBus.$on('addClickAnimate', this.addClickAnimate);
    }
  }
</script>

<style lang="scss" scoped>
.goods{
  width: 100%;
  height: calc(100vh - 39px - 140px);
  display: flex;
  .goods-tab{
    width: 80px;
    height: calc(100% - 48px);
    background-color: rgb(243, 245, 247);
  }
  .goods-list{
    flex: 1;
    height: calc(100% - 48px);
  }
}
</style>
