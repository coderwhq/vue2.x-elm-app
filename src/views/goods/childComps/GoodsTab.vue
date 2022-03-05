<template>
  <scroll ref="scroll"
          :observeDOM="true"
          :observeImage="true">
    <div class="tab-wrapper">
      <div v-for="(item, index) in typeName"
          :key="index"
          class="tab-item"
          :class="{'current': index == currentIndex}"
          @click="titleClick(index)">
        <span>
          <span v-if="typeName[index].type >= 0" class="icon" :class="classMap[typeName[index].type]"></span>
          {{typeName[index].name}}
        </span>
      </div>
    </div>
  </scroll>
</template>

<script>
  import Scroll from 'components/common/scroll/Scroll'

  export default {
    name: 'GoodsTab',
    components: {
      Scroll
    },
    data() {
      return {
        classMap: [
          'decrease',
          'discount',
          'special',
          'invoice',
          'guarantee'
        ],
        currentIndex: 0
      }
    },
    props: {
      typeName: {
        type: Array,
        default() {
          return [];
        }
      }
    },
    methods: {
      titleClick(index) {
        this.currentIndex = index;
        this.$emit('titleClick', index);
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/css/mixin.scss";
  $components: goods;
  .tab-wrapper{
    position: relative;
    .current{
      background-color: #fff;
    }
    .tab-item{
      display: table;
      width: 100%;
      height: 54px;
      line-height: 14px;
      padding: 0 12px;
      border-bottom: 1px solid #f9fafa;
      &>span {
        display: table-cell;
        vertical-align: middle;
        text-align: center;
        .icon{
          display: inline-block;
          width: 12px;
          height: 12px;
          background-size: 12px 12px;
          background-repeat: no-repeat;
          &.decrease{
            @include bg-image($components,'decrease_3');
          }
          &.discount{
            @include bg-image($components,'discount_3');
          }
          &.guarantee{
            @include bg-image($components,'guarantee_3');
          }
          &.invoice{
            @include bg-image($components,'invoice_3');
          }
          &.special{
            @include bg-image($components,'special_3');
          }
        }
      }
    }
  }
</style>
