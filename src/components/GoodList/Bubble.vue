<template>
    <span class="bubble">
        {{num}}
    </span>    
</template>

<script>
    export default {
        props: {
            num: Number
        }
    }
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/variable'

.bubble
    display inline-block
    height 16px
    line-height 16px
    text-align center
    padding 0 5px
    font-weight 700
    font-size $fontsize-small-s
    color: $color-white
    border-radius 16px
    background linear-gradient(to right, $color-orange, $color-red)
</style>