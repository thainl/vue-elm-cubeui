<template>
    <div class="list-item">
        <div class="text">
            <span class="name">{{food.name}}</span>
            <span class="price">￥{{food.count*food.price}}</span>
        </div>
        <OptionsBtn @click.stop :food="food" @ADD_FOOD="emit_ADD_FOOD" @refreshScroll="handleRefreshScroll"></OptionsBtn>
    </div>
</template>

<script>
    import OptionsBtn from '../GoodList/OptionsBtn';
    export default {
        props: {
            food: {
                type: Object,
                default: {}
            }
        },
        methods: {
            emit_ADD_FOOD(el) {
                this.$emit('ADD_FOOD', el);
            },
            handleRefreshScroll() {
                this.$emit('refreshScroll');
            }
        },
        components: {
            OptionsBtn,
        }
    }
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/variable.styl'
.list-item
    display flex
    align-items center
    padding 6px 0
    .text
        display flex
        justify-content space-between
        flex 1
        padding-right 5px
        .name
            font-size $fontsize-medium
            color $color-dark-grey
        .price
            font-size $fontsize-medium
            color $color-red
</style>