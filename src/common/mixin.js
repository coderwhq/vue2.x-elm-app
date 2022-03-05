import { mapActions } from 'vuex'

export const cartControl = {
  methods: {
    ...mapActions(['addCart', 'subCart']),
    addClick(item) {
      this.addCart(item);
    },
    subClick(item) {
      this.subCart(item);
    }
  }
}

export const ratingsControl = {
  data() {
    return {
      showRatetype: -1,
      onlyContent: false
    }
  },
  methods: {
    allClick() {
      this.showRatetype = -1;
    },
    goodClick() {
      this.showRatetype = 0;
    },
    noGoodClick() {
      this.showRatetype = 1;
    },
    onlyContentClick() {
      this.onlyContent = !this.onlyContent;
    }
  },
  computed: {
    // 计算属性传参数需要这么传
    ratingCount() {
      return function (type) {
        let cnt = 0;
        this.ratings.forEach(element => {
          if (element.rateType === type || type === -1) {
            cnt++;
          }
        });
        return cnt;
      };
    },
    getRatings() {
      if (this.onlyContent) {
        return this.ratings.filter((item) => {
          return item.text;
        })
      }
      return this.ratings;
    }
  }
}
