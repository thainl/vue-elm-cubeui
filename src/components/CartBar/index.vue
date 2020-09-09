<template>
    <div class="cart-bar">
        <div class="container">
            <div class="left">
                <div class="logo-wrapper">
                    <div class="logo" :class="{highlight: totalCount>0}">
                        <i class="icon-shopping_cart" :class="{highlight: totalCount>0}"></i>
                    </div>
                    <div class="num" v-show="totalCount">
                        <Bubble :num="totalCount"></Bubble>
                    </div>
                </div>
                <div class="total-price" :class="{highlight: totalPrice>0}">￥{{totalPrice}}</div>
                <div class="delivery-price">另需配送费￥{{deliveryPrice}} 元</div>
            </div>
            <div class="right">
                <div class="pay-desc" :class="payClass">{{payDesc}}</div>
            </div>
        </div>
        <div class="animation-balls">
            <div v-for="(ball, i) of ballList" :key="'b'+i">
                <transition @beforeEnter="beforeDrop" @enter="dropping" @afterEnter="dropped">
                    <div class="ball" v-show="ball.show">
                        <div class="inner"></div>
                    </div>
                </transition>
            </div>
            
        </div>
    </div>
</template>

<script>
import Bubble from "../GoodList/Bubble";
export default {
    name: "CartBar",
    props: {
        // 购物车里的商品
        selectedFoods: {
            type: Array,
            default: [],
        },
        // 起送费
        deliveryPrice: {
            type: Number,
            default: 0,
        },
        // 最低消费
        minPrice: {
            type: Number,
            default: 0,
        },
    },
    data() {
        return {
            // 需要做动画的小球列表
            ballList: []
        };
    },
    computed: {
        // 购物车总价格
        totalPrice() {
            return this.selectedFoods.reduce(
                (total, item) => total + item.count * item.price,
                0
            );
        },
        // 购物车总商品数
        totalCount() {
            return this.selectedFoods.reduce(
                (total, item) => total + item.count,
                0
            );
        },
        // 购物车按钮的文字描述
        payDesc() {
            if (this.totalPrice === 0) {
                return `￥${this.minPrice}元起送`;
            } else if (this.totalPrice < this.minPrice) {
                return `还差￥${this.minPrice - this.totalPrice}元起送`;
            } else {
                return "去结算";
            }
        },
        // 按钮样式
        payClass() {
            if (!this.totalCount || this.totalPrice < this.minPrice) {
                return "not-enough";
            } else {
                return "enough";
            }
        },
    },
    components: {
        Bubble,
    },
    methods: {
        createBalls() {
            // 需要参加多个小球，因为快速点击
            let balls = [];
            for(let i=0; i<10; i++) {
                balls.push({show: false}); // 默认全部小球不显示
            }
            return balls;
        },
        // 小球做动画
        dropBall(el) {
            for(let i=0; i < this.ballList.length; i++) {
                const ball = this.ballList[i];
                if(!ball.show) {
                    ball.show = true;
                    ball.el = el; // el为触发动画的元素
                    this.droppingBallList.push(ball);
                    // 每点击一次只添加一个小球
                    return ;
                }
            }
        },
        // 动画的钩子
        beforeDrop(el) {
            const ball = this.droppingBallList[0],
                  rect = ball.el.getBoundingClientRect(), // 获取元素的坐标
                  x = rect.left - 32, // x 为小球要移动的横向距离 32为小球结束位置的左边距
                  y = -(window.innerHeight - rect.top - 22), // 22为小球本来的下边距
                  inner = el.getElementsByClassName('inner')[0];
            el.style.display="none";
            el.style.transform = el.style.webkitTransform = `translateY(${y}px)`; // 外层负责x方向的过渡
            inner.style.transform = inner.style.webkitTransform = `translateX(${x}px)`; // 内层负责y方向
        },
        dropping(el, done) {
            this._reflow = document.body.offsetHeight;
            const inner = el.getElementsByClassName('inner')[0];
            el.style.transform = el.style.webkitTransform = `translateY(0px)`;
            inner.style.transform = inner.style.webkitTransform = `translateX(0px)`;
            el.addEventListener('transitionend', done, false); // 监听过渡完毕
        }
        ,dropped(el) {
            const ball = this.droppingBallList.shift();
            if(ball) {
                ball.show = false;
                el.style.display='none';
            }
        }
    },
    created() {
        this.ballList = this.createBalls();
        // 存放正在做动画的小球，因为不需要响应式数据，所以写在这里
        this.droppingBallList=[];
    },
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/variable.styl'
.cart-bar
    position relative
    height: 48px
    width: 100vw
    .container
        display: flex
        background: $color-background
        color: $color-light-grey
        .left
            flex: 1
            .logo-wrapper
                display: inline-block
                position: relative
                top: -10px
                margin: 0 12px
                padding: 6px
                width: 56px
                height: 56px
                vertical-align: top
                box-sizing: border-box
                border-radius: 50%
                background: $color-background
                .logo
                    width: 100%
                    height: 100%
                    border-radius: 50%
                    text-align: center
                    background: $color-dark-grey
                    // transition background .3s
                    &.highlight
                        background: $color-blue
                        cursor: pointer
                    .icon-shopping_cart
                        line-height: 44px
                        font-size: $fontsize-large-xxx
                        color: $color-light-grey
                        &.highlight
                            color: $color-white
                            cursor pointer
                .num
                    position: absolute
                    top: 0
                    right: 0
            .total-price
                display: inline-block
                margin-top: 12px
                line-height: 24px
                padding-right: 12px
                vertical-align: top
                box-sizing: border-box
                border-right: 1px solid rgba(255, 255, 255, 0.1)
                font-weight: 700
                font-size: $fontsize-large
                &.highlight
                    color: $color-white
            .delivery-price
                display: inline-block
                vertical-align: top
                margin: 12px 0 0 12px
                line-height: 24px
                font-size: $fontsize-small-s
        .right
            flex-basis: 105px
            width: 105px
            .pay-desc
                height: 48px
                line-height: 48px
                text-align: center
                font-weight: 700
                font-size: $fontsize-small
                transition background .3s
                &.not-enough
                    background: $color-dark-grey
                &.enough
                    background: $color-green
                    color: $color-white
                    cursor: pointer

    .animation-balls
        position absolute
        left 32px
        bottom 38px
        z-index 20

        .ball
            position absolute
            top 0
            left 0
            transition all .4s cubic-bezier(0.49, -0.29, 0.75, 0.41)

            .inner
                width 16px
                height 16px
                background $color-blue
                border-radius 50%
                transition all .4s linear
</style>