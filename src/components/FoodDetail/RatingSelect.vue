<template>
    <div class="rating-select">
        <div class="rating-type">
            <span @click.stop="selectRatingType(2)" class="item positive" :class="{active:selectedType === 2}">{{label.all}}<span class="count">{{ratings.length}}</span></span>
            <span @click.stop="selectRatingType(0)" class="item positive" :class="{active:selectedType === 0}">{{label.positive}}<span class="count">{{positiveRatings.length}}</span></span>
            <span @click.stop="selectRatingType(1)" class="item negative" :class="{active:selectedType === 1}">{{label.negative}}<span class="count">{{negativeRatings.length}}</span></span>
        </div>
        <div class="toggle" @click.stop="toggleOnlyContent" :class="{on:onlyContent}">
            <span class="icon-check_circle"></span>
            <span class="text">只看有内容的评价</span>
        </div>
    </div>
</template>

<script>
    const POSITIVE = 0; // 积极评价的类型
    const NEGATIVE = 1; // 消极评价的类型
    const ALL = 2 // 全部评价的类型
    export default {
        props: {
            // 三种类型评价的描述
            label: {
                type: Object,
                default() {
                    return {
                        all: '全部',
                        positive: '满意',
                        negative: '不满意'
                    }
                }
            },
            ratings: {
                type: Array,
                default: []
            },
            // 是否只查看有内容的评价
            onlyContent: {
                type: Boolean,
                default: false
            },
            // 选择查看哪种类型的评价
            selectedType: {
                type: Number,
                default: ALL
            }
        },
        computed: {
            positiveRatings() {
                return this.ratings.filter(rating => rating.rateType === POSITIVE);
            },
            negativeRatings() {
                return this.ratings.filter(rating => rating.rateType === NEGATIVE);
            }
        },
        methods: {
            // 选择类型
            selectRatingType(type) {
                if(type !== this.selectedType) { // 点击非当前类型才触发
                    this.$emit('changeRatingType', type);
                }
            },
            toggleOnlyContent() {
                this.$emit('changeOnlyContent');
            }
        },
    }
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/variable.styl'
.rating-select
    .rating-type
        padding 18px 0
        .item
            display inline-block
            padding 8px 12px
            margin-right 8px
            line-height 16px
            border-radius 1px
            font-size $fontsize-small
            color $color-grey
            cursor pointer
            &.active
                color: $color-white
            .count
                margin-left 2px
            &.positive
                background $color-light-blue
                &.active
                    background $color-blue
            &.negative
                background $color-light-grey-s
                &.active
                    background $color-grey
    .toggle
        display flex
        align-items center
        padding 12px 0
        line-height 24px
        border-bottom: 1px solid $color-row-line
        color $color-light-grey
        &.on
            .icon-check_circle
                color $color-green
        .icon-check_circle
            margin-right 4px
            font-size $fontsize-large-xxx
            cursor pointer
        .text
            font-size $fontsize-small
            cursor pointer
</style>