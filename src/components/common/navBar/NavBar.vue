<template>
  <div class="navbar">
    <router-link v-for="(item, index) in itemNames"
                active-class="avtive"
                :key="index"
                :to="routeList[index]"
                tag="div">{{item}}</router-link>
  </div>
</template>

<script>

  export default {
    name: 'NavBar',
    data() {
      return {
        avtive: 0
      }
    },
    props: {
      itemNames: {
        type: Array,
        default() {
          return [];
        }
      },
      routeList: {
        type: Array,
        default() {
          return [];
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

.navbar{
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 39px;
  font-size: 14px;
  background-color: #fff;
  color: rgb(126, 140, 141);
  .avtive{
    color: rgb(255, 0, 0);
  }
}

</style>
