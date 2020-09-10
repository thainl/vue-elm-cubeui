<template>
    <div class="food-item">
        <div class="food-icon">
            <img :src="food.icon" alt />
        </div>
        <div class="content">
            <h3 class="food-name">{{food.name}}</h3>
            <p class="desc" v-if="food.description">{{food.description}}</p>
            <div class="sell-info">
                <span class="sell-count">月售{{food.sellCount}}份</span>
                <span class="sell-rate">好评率{{food.rating}}%</span>
            </div>
            <div class="price">
                <span class="now">￥{{food.price}}</span>
                <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
            </div>
            <div class="options-wrapper">
                <OptionsBtn :food="food" @ADD_FOOD="addFood"></OptionsBtn>
            </div>
        </div>
    </div>
</template>

<script>
import OptionsBtn from "./OptionsBtn";
export default {
    props: {
        food: {
            type: Object,
            default: {},
        },
    },
    methods: {
        addFood(el) {
            this.$emit("ADD_FOOD", el);
        },
    },
    components: {
        OptionsBtn,
    },
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/variable.styl'
.food-item
    display: flex
    position: relative
    .food-icon
        flex-basis: 57px
        margin-right: 10px
        img
            width: 57px
            height: auto
            object-fit: cover
            display: block
    .content
        flex: 1
        min-width: 0
        .food-name
            margin-bottom: 8px
            height: 16px
            line-height: 18px
            font-size: $fontsize-medium
            color: $color-dark-grey
        .desc, .sell-info
            line-height: 10px
            font-size: $fontsize-small-s
            color: $color-light-grey
        .desc, .food-name
            width: 100%
            overflow: hidden
            text-overflow: ellipsis
            white-space: nowrap
        .desc
            line-height: 12px
            margin-bottom: 8px
        .sell-info
            .sell-count
                margin-right: 12px
        .price
            font-weight: 700
            line-height: 24px
            .now
                margin-right: 8px
                font-size: $fontsize-medium
                color: $color-red
            .old
                text-decoration: line-through
                font-size: $fontsize-small-s
                color: $color-light-grey
        .options-wrapper
            position: absolute
            right: 0
            bottom: -6px
</style>