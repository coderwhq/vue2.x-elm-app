<template>
  <div class="wrapper" ref="wrapper" :class="{'scroll-x-wrapper': scrollX}">
    <div class="content"  :class="{'scroll-x-content': scrollX}">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: 'Scroll',
    props:{
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      },
      observeDOM: {
        type: Boolean,
        default: false
      },
      observeImage: {
        type: Boolean,
        default: false
      },
      scrollX: {
        type: Boolean,
        default: false
      },
      scrollY: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        scroll: null
      }
    },
    methods: {
      refresh(){
        this.scroll && this.scroll.refresh();
      },
      scrollTo(x, y, time=300) {
        this.scroll && this.scroll.scrollTo(x, y, 300);
      },
      scrollToElement(el, time){
        this.scroll && this.scroll.scrollToElement(el, time);
      }
    },
    mounted() {
      this.scroll = new BScroll(this.$refs.wrapper,{
        click: true,
        observeDOM: this.observeDOM,
        observeImage: this.observeImage,
        pullUpLoad: this.pullUpLoad,
        probeType: this.probeType,
        scrollX: this.scrollX,
        scrollY: this.scrollY
      })

      if(this.probeType === 2 || this.probeType === 3){
        this.scroll.on('scroll', (position) => {
          this.$emit('scroll', position);
        });
      }
    }
  }
</script>

<style lang="scss" scoped>
.wrapper {
  height: 100%;
  overflow: hidden;
}
.scroll-x-wrapper{
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
}
.scroll-x-content{
  display: inline-block;
}
</style>
