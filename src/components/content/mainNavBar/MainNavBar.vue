<template>
  <div class="bar">
    <nav-bar :itemNames="itemNames" :routeList="routeList"></nav-bar>
  </div>
</template>

<script>
  import NavBar from 'components/common/navBar/NavBar.vue';
  
  export default {
    name: 'MainNavBar',
    data() {
      return {
        itemNames: [
          '商品',
          '评价',
          '商家'
        ],
        routeList: [
          'goods',
          'ratings',
          'seller'
        ]
      }
    },
    components: {
      NavBar
    }
  }
</script>

<style lang="scss" scoped>
  .bar{
    border-bottom: 1px solid #f3f4f4;
  }
</style>