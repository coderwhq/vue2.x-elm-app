<template>
  <div class="control">
      <!-- 这里要阻止点击事件继续向上冒泡，否则在点击的时候也会触发gooditem的点击事件 -->
      <div class="add icon-add_circle" @click.stop="addClick"></div>
      <div class="count" v-if="count">{{count}}</div>
    <transition name="move">
      <div class="sub icon-remove_circle_outline" v-if="count" @click.stop="subClick"></div>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'CartAdd',
    props: {
      count: {
        type: Number,
        default: 0
      }
    },
    methods: {
      addClick() {
        this.$emit('addClick');
      },
      subClick() {
        if(this.count > 0)
          this.$emit('subClick');
      }
    }
  }
</script>

<style lang="scss" scoped>
  .control{
    display: flex;
    width: 70px;
    flex-direction: row-reverse;
    justify-content: space-between;
    align-items: center;
    font-size: 23px;
    color: rgb(0, 160, 220);
    .sub{
      &.move-enter-active, &.move-leave-active{
        transition: all .4s linear;
      }
      &.move-enter, &.move-leave-to{
        opacity: 0;
        transform: translate3d(24px, 0, 0) rotate(180deg);
      }
    }
    .count{
      font-size: 13px;
      color: rgb(157, 162, 168);
    }
  }
</style>
