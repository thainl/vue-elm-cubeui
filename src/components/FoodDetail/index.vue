<template>
    <div class="food-detail" v-show="showMain">
        <transition name="slide">
            <div v-show="showFoodDetail" class="food-wrapper" ref="scrollWrapper">
                <div class="scroll-wrapper" style="margin-bottom:100px">
                    <div class="back" @click="closeFoodDetail">
                        <i class="icon-arrow_lift"></i>
                    </div>
                    <div class="food-cover">
                        <img :src="food.image" ref="foodCover" />
                    </div>
                    <div class="food-content">
                        <h2 class="food-name">{{food.name}}</h2>
                        <div class="sell-info">
                            <span class="sell-count">月售{{food.sellCount}}份</span>
                            <span class="sell-rating">好评率{{food.rating}}%</span>
                        </div>
                        <div class="price">
                            <span class="now">￥{{food.price}}</span>
                            <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                        </div>
                        <OptionsBtn v-show="food.count>0" :food="food" @ADD_FOOD="handleAddFood"></OptionsBtn>
                        <transition name="fade">
                            <div
                                class="add-to-cart"
                                v-show="food.count ===0 || !food.count"
                                @click.stop="addToCart"
                            >加入购物车</div>
                        </transition>
                    </div>
                    <BlockBar v-show="food.info"></BlockBar>
                    <div class="food-desc" v-show="food.info">
                        <Title marginBottom="0.24rem">商品信息</Title>
                        <p class="text">{{food.info}}</p>
                    </div>
                    <BlockBar>商品评价</BlockBar>
                    <div class="food-rating">
                        <Title marginBottom="0">商品评价</Title>
                        <RatingSelect
                            :ratings="ratings"
                            :onlyContent="onlyContent"
                            :selectedType="selectedRatingType"
                            :label="ratingTypeLabel"
                            @changeRatingType="handleChangeRatingType"
                            @changeOnlyContent="handleChangeOnlyContent"
                        ></RatingSelect>
                        <ul class="rating-list" v-if="computedRatings.length > 0">
                            <li v-for="(rating, i) of computedRatings" :key="'rate'+i">
                                <RatingItem :rating="rating"></RatingItem>
                            </li>
                        </ul>
                        <div v-else class="no-rating">暂无评价</div>
                    </div>
                </div>
            </div>
        </transition>

        <div class="cart-wrapper">
            <CartBar
                selector=".food-detail"
                ref="CartBar"
                v-show="showMain"
                :selectedFoods="selectedFoods"
                :deliveryPrice="deliveryPrice"
                :minPrice="minPrice"
            ></CartBar>
        </div>
    </div>
</template>

<script>
const ALL = 2; // 全部评价的类型
import CartBar from "../CartBar/index";
import OptionsBtn from "../GoodList/OptionsBtn";
import BlockBar from "./BlockBar";
import RatingItem from "./RatingItem";
import BScroll from "@better-scroll/core";
import Title from "./Title";
import RatingSelect from "./RatingSelect";
export default {
    name: "FoodDetail",
    props: {
        // 负责food信息内容的显示，主要是为了过渡动画
        showFoodDetail: {
            type: Boolean,
            default: false,
        },
        food: {
            type: Object,
            default() {
                return {};
            },
        },
        // 购物车里的商品
        selectedFoods: {
            type: Array,
            default() {
                return [];
            },
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
            showMain: this.showFoodDetail, // 复制整个组件的切换显示
            onlyContent: true, // 是否只看有内容的评价
            selectedRatingType: ALL,
            ratingTypeLabel: {
                all: "全部",
                positive: "推荐",
                negative: "吐槽",
            },
            time: 0, // 不能频繁点击加入购物车按钮
        };
    },
    computed: {
        ratings() {
            if (this.food.ratings) {
                return this.food.ratings;
            }
            return [];
        },
        computedRatings() {
            let arr = [];
            this.ratings.forEach((rating) => {
                if (this.onlyContent && !rating.text) {
                    return; // 只查看有内容评价为真，而当前评价没内容，就结束这一次循环，继续下一次循环
                }
                if (
                    this.selectedRatingType === ALL ||
                    rating.rateType === this.selectedRatingType
                ) {
                    // 查看全部类型 || 当前选择的类型等于当前评价类型
                    arr.push(rating);
                }
            });
            // 每次获取评价都刷新一下scroll
            this.$nextTick(() => {
                if (this.scroll) {
                    this.scroll.refresh();
                }
            });

            return arr;
        },
    },
    watch: {
        showFoodDetail(val) {
            if (val) {
                this.showMain = val;
                this.$refs.foodCover.src = this.food.image;
            } else {
                clearTimeout(this.timer);
                this.timer = setTimeout(() => {
                    this.showMain = val;
                    this.$refs.foodCover.style.opacity = '0';
                    this.$refs.foodCover.src = '';
                }, 380);
            }
        },
    },
    methods: {
        closeFoodDetail() {
            this.$emit("close");
        },
        handleChangeRatingType(type) {
            this.selectedRatingType = type;
        },
        handleChangeOnlyContent() {
            this.onlyContent = !this.onlyContent;
        },
        addToCart(e) {
            if(Date.now() - this.time >= 400) {
                // 点击加入购物车按钮
                this.$set(this.food, "count", 1);
                this.enterCart(e.target);
                this.time = Date.now();
            }else {
                return;
            }
        },
        enterCart(el) {
            // 触发购物车小球动画
            this.$refs.CartBar.dropBall(el);
        },
        handleAddFood(el) {
            this.enterCart(el);
        },
        bindEvent(el) {
            // 滑动返回
            el.addEventListener('touchstart', (e)=> {
                this.startX = e.changedTouches[0].pageX;
                this.startY = e.changedTouches[0].pageY;
            }, false)
            el.addEventListener('touchend', (e)=> {
                let distancX =e.changedTouches[0].pageX -  this.startX ;
                let distancY =e.changedTouches[0].pageY -  this.startY ;
                if(Math.abs(distancX) > Math.abs(distancY)) {
                    if(distancX > 30) {
                        this.closeFoodDetail();
                    }
                }
                
            }, false)
        }
    },
    mounted() {
        this.$nextTick(() => {
            document.body.appendChild(this.$el);
            if (!this.scroll) {
                this.scroll = new BScroll(this.$refs.scrollWrapper, {
                    click: true,
                });
            }
        });
        this.bindEvent(this.$refs.scrollWrapper);
        this.$refs.foodCover.onload = function(){
            this.style.opacity = '1';
        }
    },
    components: {
        CartBar,
        BlockBar,
        RatingItem,
        Title,
        RatingSelect,
        OptionsBtn,
    },
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/variable.styl'
.food-detail
    position: fixed
    top: 0
    left: 0
    height: 100vh
    width: 100vw
    background: transparent
    .food-wrapper
        position: absolute
        top: 0
        left: 0
        bottom: 48px
        width: 100%
        z-index: 21
        background: #fff
        .scroll-wrapper
            // padding-bottom 48px
        .back
            position: absolute
            top: 10px
            left: 5px
            z-index: 5
            border-radius: 50%
            background: $color-background-sss
            cursor pointer
            .icon-arrow_lift
                // position: absolute
                display: block
                padding: 10px
                font-size: $fontsize-large-xx
                color: $color-white
        .food-cover
            position: relative
            width: 100%
            height: 0
            padding-top: 100%
            background-color #eee
            img
                position: absolute
                top: 0
                left: 0
                width: 100%
                height: 100%
                opacity 0
                transition opacity .3s
        .food-content
            position: relative
            padding: 18px
            .food-name
                line-height: 14px
                margin-bottom: 8px
                font-size: $fontsize-medium
                font-weight: 700
                color: $color-dark-grey
            .sell-info
                margin-bottom: 18px
                line-height: 10px
                height: 10px
                .sell-count, .sell-rating
                    font-size: $fontsize-small-s
                    color: $color-light-grey
                .sell-count
                    margin-right: 12px
            .price
                line-height: 24px
                font-weight: 700
                .now
                    margin-right: 8px
                    font-size: 14px
                    color: $color-red
                .old
                    text-decoration: line-through
                    font-size: $fontsize-small-s
                    color: $color-light-grey
            .add-to-cart
                position: absolute
                bottom: 18px
                right: 18px
                height: 24px
                line-height: 24px
                padding: 0 12px
                box-sizing: border-box
                border-radius: 12px
                font-size: $fontsize-small-s
                color: $color-white
                background: $color-blue
                cursor pointer
            .options-btn
                position: absolute
                bottom: 12px
                right: 12px
        .food-desc
            padding: 18px
            .text
                line-height: 24px
                padding: 0 8px
                font-size: $fontsize-small
                color: $color-grey
        .food-rating
            padding: 18px
            .rating-list
                li
                    border-bottom: 1px solid #f6f7f7
                    &:last-child
                        border-bottom-color: transparent
            .no-rating
                padding: 16px 0
                font-size: $fontsize-small
                color: $color-light-grey
                text-align: center
    .cart-wrapper
        position: fixed
        bottom: 0
        left: 0
        height: 48px
        width: 100%
        z-index: 22
.slide-enter-active, .slide-leave-active
    transition: all 0.4s
.slide-enter, .slide-leave-to
    transform: translateX(100%)
.slide-enter .cart-wrapper .cart-bar, .slide-leave-to .cart-wrapper .cart-bar
    transform: translateX(0)
.fade-enter-active, .fade-leave-active
    transition: all 0.3s
.fade-enter, .fade-leave-to
    opacity: 0
</style>