<template>
  <div :class="`star-${size}`">
    <span class="star-item" :class="item" v-for="(item, index) in getStarClass" :key="index"></span>
  </div>
</template>

<script>

  const CLASS_ON = 'on'
  const CLASS_OFF = 'off'
  const CLASS_HALF = 'half'

  export default {
    name: 'Star',
    props: {
      size: {
        type: Number,
        default: 24
      },
      score: {
        type: Number,
        default: 0
      }
    },
    computed: {
      getStarClass() {
        let scr = this.score;
        let classArr = [];
        for(let i = 0; i < 5; i ++){
          if(scr <= 0.4){
            classArr.push(CLASS_OFF);
          }
          else if(scr < 1){
            classArr.push(CLASS_HALF);
          }
          else{
            classArr.push(CLASS_ON);
          }
          scr -= 1;
        }
        return classArr;
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~@/assets/css/mixin.scss';
  $component: star;
  .star-24{
    span{
      display: inline-block;
      width: 10px;
      height: 10px;
      background-repeat: no-repeat;
      background-size: 10px 10px;
    }
    span.on{
      @include bg-star($component, star24_on);
    }
    span.off{
      @include bg-star($component, star24_off);
    }
    span.half{
      @include bg-star($component, star24_half);
    }
  }
  .star-36{
    span{
      display: inline-block;
      width: 15px;
      height: 15px;
      background-repeat: no-repeat;
      background-size: 15px 15px;
    }
    span.on{
      @include bg-star($component, star36_on);
    }
    span.off{
      @include bg-star($component, star36_off);
    }
    span.half{
      @include bg-star($component, star36_half);
    }
  }
  .star-48{
    span{
      display: inline-block;
      width: 20px;
      height: 20px;
      background-repeat: no-repeat;
      background-size: 20px 20px;
    }
    span.on{
      @include bg-star($component, star48_on);
    }
    span.off{
      @include bg-star($component, star48_off);
    }
    span.half{
      @include bg-star($component, star48_half);
    }
  }
</style>