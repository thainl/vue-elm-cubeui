<template>
    <MaskWrapper v-if="showDetail" background='rgba(7,17,27,0.8)' opacity="1" z-index="30">
        <div class="header-detail">
            <div class="detail-main">
                <div class="content">
                    <h1 class="name">{{seller.name}}</h1>
                    <div class="star">
                        <Star :size="48" :score="seller.score"></Star>
                    </div>
                    <Title>优惠信息</Title>
                    <ul v-if="seller.supports" class="supports">
                        <li
                            class="support-item"
                            v-for="(item, i) of seller.supports"
                            :key="'sup' + i"
                        >
                            <TagIcon :size="2" :type="item.type"></TagIcon>
                            <span class="text">{{item.description}}</span>
                        </li>
                    </ul>
                    <Title>商家公告</Title>
                    <div class="bulletin">
                        <p class="text">{{seller.bulletin}}</p>
                    </div>
                </div>
            </div>
            <div class="detail-close">
                <i class="icon-close" @click="closeDetail"></i>
            </div>
        </div>
    </MaskWrapper>
</template>

<script>
import Star from "../Star/index.vue";
import TagIcon from "../TagIcon/index.vue";
import Title from "./Title";
import MaskWrapper from "./MaskWrapper";
export default {
    name: "HeaderDetail",
    props: {
        seller: {
            type: Object,
            default: {},
        },
        showDetail: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        closeDetail() {
            this.$emit('closeSellerDetail');
        }
    },
    components: {
        Star,
        TagIcon,
        Title,
        MaskWrapper,
    },
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/mixin.styl'
@import '~@/assets/css/variable.styl'
.mask-wrapper
    backdrop-filter: blur(10px)
.header-detail
    height: 100%
    width: 100%
    color: $color-white
    .detail-main
        width: 100%
        min-height: 100%
        .content
            padding: 64px 0 75px
            .name
                line-height: 16px
                text-align: center
                font-size: $fontsize-large
                font-weight: 700
            .star
                margin-top: 18px
                padding: 2px 0
                text-align: center
            .supports
                width: 80%
                margin: 0 auto
                .support-item
                    display: flex
                    align-items: center
                    padding: 0 12px
                    margin-bottom: 12px
                    &:last-child
                        margin-bottom: 0
                    .text
                        margin-left: 6px
                        line-height: 16px
                        font-size: $fontsize-small
            .bulletin
                width: 80%
                margin: 0 auto
                .text
                    padding: 0 12px
                    line-height: 24px
                    font-size: $fontsize-small
    .detail-close
        position: relative
        width: 30px
        height: 30px
        margin: -64px auto 0 auto
        font-size: $fontsize-large-xxxx
        i
            cursor: pointer
</style>