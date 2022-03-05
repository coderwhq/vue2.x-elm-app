<template>
  <div id="app">
    <Header></Header>
    <main-nav-bar></main-nav-bar>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
  import Header from 'components/content/header/Header.vue'
  import MainNavBar from 'components/content/mainNavBar/MainNavBar.vue'
  export default {
    name: 'App',
    components: {
      Header,
      MainNavBar,
    }
  }
</script>

<style lang="scss">
  @import './assets/css/base.scss';
</style>

<style lang="scss" scoped>
.app{
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
</style>
