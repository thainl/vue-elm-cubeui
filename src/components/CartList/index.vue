<template>
    <MaskWrapper selector=".goods" v-show="showCartList" @clickMask="closeCartList">
        <transition name="slide-up">
            <div class="cart-list" v-show="showCartList" @click.stop>
                <div class="head">
                    <h2>购物车</h2>
                    <span class="clear-btn" @click="empty">清空</span>
                </div>
                <div class="list" ref="listContent">
                    <div class="scroll-wrapper">
                        <ListItem v-for="(food, i) of selectedFoods" :key="'fo'+i"  :food="food" @ADD_FOOD="emit_ADD_FOOD" @refreshScroll="handleFoodRemoveFromList"></ListItem>
                    </div>
                </div>
            </div>
        </transition>

        <MaskWrapper
            selector="body"
            height="6.88rem"
            v-show="showCartList"
            @clickMask="closeCartList"
        ></MaskWrapper>
    </MaskWrapper>
</template>

<script>
import MaskWrapper from "../HeaderDetail/MaskWrapper";
import ListItem from "./ListItem";
import BScroll from '@better-scroll/core'
export default {
    name: "CartList",
    props: {
        selectedFoods: {
            type: Array,
            default: [],
        },
        showCartList: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {};
    },
    methods: {
        closeCartList() {
            this.$emit("hideCartList", false);
        },
        emit_ADD_FOOD(el) {
            this.$emit("ADD_FOOD", el);
        },
        refreshScroll() {
            this.$nextTick(() => {
                this.scroll.refresh()
            })
        },
        handleFoodRemoveFromList() {
            if(this.showCartList) {
                this.refreshScroll();
            }
            return;
        },
        empty() {
            this.$emit('emptySelectedFoods');
        }
    },
    mounted() {
        this.scroll = new BScroll(this.$refs.listContent);
    },
    updated() {
    },
    components: {
        MaskWrapper,
        ListItem,
    },
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/variable.styl'
.cart-list
    position: absolute
    width: 100%
    bottom: 48px
    left: 0
    overflow: hidden
    .head
        display: flex
        justify-content: space-between
        height: 40px
        line-height: 40px
        padding: 0 18px
        background: $color-background-ssss
        h2
            font-size: $fontsize-medium
            color: $color-dark-grey
        .clear-btn
            color: $color-blue
            font-size: $fontsize-small
    .list
        max-height: 217px
        background: #fff
        overflow: hidden
        padding: 0 18px
        transition: all 0.3s
.group-enter-active, .group-leave-active
    transition: all 0.3s
.group-enter, .group-leave-to
    opacity: 0
    transform: scale(0.2)
.group-move
    transition: all 0.3s
.slide-up-enter-active, .slide-up-leave-active
    transition: all 0.3s ease-in-out
.slide-up-leave-active
    position absolute
.slide-up-enter, .slide-up-leave-to
    opacity: 0
    transform: translateY(100%)
</style>