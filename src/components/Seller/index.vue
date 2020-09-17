<template>
    <cube-scroll :options="scrollYOptions" class="seller-page" ref="scrollWrapper">
        <div class="container">
            <div class="overview">
                <h2 class="title">{{seller.name}}</h2>
                <div class="score">
                    <Star :size="36" :score="seller.score"></Star>
                    <span class="text">({{seller.ratingCount}})</span>
                    <span class="text">月售{{seller.sellCount}}单</span>
                </div>
                <ul class="remark-list">
                    <li class="item">
                        <RemarkItem title="起送价" :num="seller.minPrice"></RemarkItem>
                    </li>
                    <li class="item">
                        <RemarkItem title="商家配送" :num="seller.deliveryPrice"></RemarkItem>
                    </li>
                    <li class="item">
                        <RemarkItem title="平均配送时间" :num="seller.deliveryTime" unit="分钟"></RemarkItem>
                    </li>
                </ul>
                <div class="favorite" @click="toggleFavorite">
                    <span class="icon-favorite" :class="{active: isFavorite}"></span>
                    <span class="text">{{favoriteText}}</span>
                </div>
            </div>
            <BlockBar></BlockBar>
            <div class="bulletin">
                <Title marginBottom="0.32rem">公告与活动</Title>
                <div class="content">
                    <p class="text">{{seller.bulletin}}</p>
                </div>
                <ul class="support-list">
                    <li v-for="(support, i) of seller.supports" :key="'sup'+i">
                        <SupportItem :support="support"></SupportItem>
                    </li>
                </ul>
            </div>
            <BlockBar></BlockBar>
            <div class="pics">
                <Title marginBottom="0.48rem">商家实景</Title>
                <cube-scroll :options="scrollXOptions" class="pics-wrapper">
                    <ul class="pic-list">
                        <li class="pic-item" v-for="(pic,i) of seller.pics" :key="'pic'+i">
                            <img :src="pic" alt />
                        </li>
                    </ul>
                </cube-scroll>
            </div>
            <BlockBar></BlockBar>
            <div class="info">
                <Title marginBottom="0.48rem">商家信息</Title>
                <p class="info-item" v-for="(info,i) of seller.infos" :key="'inf'+i">{{info}}</p>
            </div>
        </div>
    </cube-scroll>
</template>

<script>
import Star from "../Star/index";
import BlockBar from "../FoodDetail/BlockBar";
import Title from "../FoodDetail/Title";
import RemarkItem from "./RemarkItem";
import SupportItem from "./SupportItem";
import BScroll from "@better-scroll/core";
export default {
    name: "Seller",
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
            isFavorite: false,
            scrollYOptions: {
                directionLockThreshold: 0,
                click: false
            },
            scrollXOptions: {
                scrollX: true,
                directionLockThreshold: 0,
                stopPropagation: true
            }
        };
    },
    computed: {
        seller() {
            if (this.data.seller) {
                return this.data.seller;
            }
        },
        favoriteText() {
            return this.isFavorite ? '已收藏' : '收藏'
        }
    },
    methods: {
        toggleFavorite() {
            this.isFavorite = !this.isFavorite;
            if(window.localStorage) {
                window.localStorage.setItem('favorite', JSON.stringify({isFavorite: this.isFavorite}));
            }
        }
    },
    created() {
        if(window.localStorage) {
            let json = window.localStorage.getItem('favorite');
            this.isFavorite = json ? JSON.parse(json).isFavorite : false;
        }
    },
    components: {
        Star,
        BlockBar,
        Title,
        RemarkItem,
        SupportItem,
    },
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/variable.styl'
.seller-page
    height 100%
    width 100%
    .overview
        position relative
        padding 18px
        .title
            margin-bottom 8px
            line-height 14px
            font-size $fontsize-medium
            color $color-dark-grey
        .score
            display flex
            align-items center
            padding-bottom 18px
            .star-wrapper
                margin-right 8px
            .text
                margin-right 12px
                line-height 18px
                font-size $fontsize-small-s
                color $color-grey
        .remark-list
            display flex
            padding-top 18px
            .item
                flex-grow 1
                flex-basis 0%
                border-right 1px solid #d9dde1
                &:last-child
                    border-right none
        .favorite
            position absolute
            width 50px
            right 11px
            top 18px
            text-align center
            .icon-favorite
                display block
                margin-bottom 4px
                line-height 24px
                font-size $fontsize-large-xxx
                color $color-light-grey-s
                &.active
                    color $color-red
            .text
                line-height 10px
                font-size $fontsize-small-s
                color $color-grey
    .bulletin 
        padding 18px 18px 0 18px      
        .content
            padding 0 12px 16px 12px
            .text
                line-height 24px
                font-size $fontsize-small
                color $color-red
                white-space normal
        .support-list
            li
                border-bottom 1px solid #f5f5f5
                &:last-child
                    border-bottom none
    .pics
        padding 18px
        .pics-wrapper
            display flex
            align-items center
            .pic-list
                .pic-item
                    display inline-block
                    margin-right 6px
                    width 120px
                    height 90px
                    &:last-child
                        margin-right 0
                    img
                        width 120px
                        height 90px
    .info
        padding 18px 18px 0 18px
        color $color-dark-grey
        .info-item
            padding 16px 12px
            line-height 16px
            font-size $fontsize-small
            border-top 1px solid #f6f7f7
</style>