<template>
    <cube-scroll :options="{click: false, directionLockThreshold: 0}" class="ratings-page" ref="scrollWrapper">
        <div class="scroll-wrapper">
            <div class="overview">
                <div class="left">
                    <h2 class="score">{{seller.score}}</h2>
                    <div class="title">综合评分</div>
                    <div class="rank">高于周边商家{{seller.rankRate}}%</div>
                </div>
                <div class="right">
                    <div class="score-wrapper">
                        <span class="score-type">服务态度</span>
                        <Star :size="36" :score="seller.serviceScore"></Star>
                        <span class="score-txt">{{seller.serviceScore}}</span>
                    </div>
                    <div class="score-wrapper">
                        <span class="score-type">商品评分</span>
                        <Star :size="36" :score="seller.foodScore"></Star>
                        <span class="score-txt">{{seller.foodScore}}</span>
                    </div>
                    <div class="delivery-wrapper">
                        <span class="title">送达时间</span>
                        <span class="delivery">{{seller.deliveryTime}}分钟</span>
                    </div>
                </div>
            </div>
            <BlockBar></BlockBar>
            <RatingSelect
                v-if="computedRatings.length > 0"
                :onlyContent="onlyContent"
                :selectedType="selectedRatingType"
                :ratings="ratings"
                @changeRatingType="handleChangeRatingType"
                @changeOnlyContent="handleChangeOnlyContent"
            ></RatingSelect>
            <ul class="rating-list">
                <li v-for="(rating,i) of computedRatings" :key="'rl'+i">
                    <ListItem :rating="rating"></ListItem>
                </li>
            </ul>
        </div>
    </cube-scroll>
</template>

<script>
const ALL = 2;
import Star from "../Star/index";
import BlockBar from "../FoodDetail/BlockBar";
import ListItem from "./ListItem";
import RatingSelect from "../FoodDetail/RatingSelect";
import { getRatings } from "@/api/index.js";
export default {
    name: "Ratings",
    props: {
        data: {
            type: Object,
            default() {
                return {};
            },
        },
    },
    data() {
        return {
            ratings: [],
            onlyContent: true,
            selectedRatingType: ALL,
        };
    },
    computed: {
        seller() {
            return this.data.seller || {};
        },
        computedRatings() {
            let arr = [];
            this.ratings.forEach((rating) => {
                if (this.onlyContent && !rating.text) {
                    return;
                }
                if (
                    this.selectedRatingType === ALL ||
                    this.selectedRatingType === rating.rateType
                ) {
                    arr.push(rating);
                }
            });
            this.$nextTick(()=> {
                if(this.$refs.scrollWrapper.refresh) {
                    this.$refs.scrollWrapper.refresh();
                }
            })
            return arr;
        },
    },
    methods: {
        _getRatings() {
            if (this.ratings.length === 0) {
                getRatings().then((ratings) => {
                    this.ratings = ratings;
                });
            }
        },
        handleChangeRatingType(type) {
            this.selectedRatingType = type;
        },
        handleChangeOnlyContent() {
            console.log(this.onlyContent);
            // this.onlyContent = !this.onlyContent;
            if(this.onlyContent) {
                this.onlyContent = false;
            }else {
                this.onlyContent = true;
            }
            console.log(this.onlyContent);
        },
    },
    created() {
        this._getRatings();
    },
    mounted() {
    },
    components: {
        Star,
        BlockBar,
        ListItem,
        RatingSelect,
    },
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/variable.styl'
.ratings-page
    width: 100%
    height: 100%
    overflow: hidden
    .overview
        display: flex
        padding: 18px 0
        .left
            flex-basis: 137px
            padding: 6px 0
            width: 137px
            border-right: 1px solid $color-col-line
            text-align: center
            .score
                margin-bottom: 6px
                line-height: 28px
                font-size: $fontsize-large-xxx
                color: $color-orange
            .title
                margin-bottom: 8px
                line-height: 12px
                font-size: $fontsize-small
                color: $color-dark-grey
            .rank
                line-height: 10px
                font-size: $fontsize-small-s
                color: $color-light-grey
        .right
            flex-grow: 1
            padding: 6px 0 6px 24px
            .score-wrapper
                display: flex
                align-items: center
                margin-bottom: 8px
                .score-type
                    line-height: 18px
                    font-size: $fontsize-small
                    color: $color-dark-grey
                .star-wrapper
                    margin: 0 12px
                .score-txt
                    line-height: 18px
                    font-size: $fontsize-small
                    color: $color-orange
            .delivery-wrapper
                display: flex
                align-items: center
                .title
                    line-height: 18px
                    font-size: $fontsize-small
                    color: $color-dary-grey
                .delivery
                    margin-left: 12px
                    color: $color-light-grey
                    font-size: $fontsize-small
    .rating-select
        padding 0 18px
    .rating-list
        padding: 0 18px
        li
            border-bottom: 1px solid #f6f7f7
        &:last-child
            border-bottom-color: transparent
</style>