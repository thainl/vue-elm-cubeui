<template>
    <div class="remark-item">
        <h3 class="title">{{title}}</h3>
        <div class="desc">
            <span class="stress">{{num}}</span>{{unit}}
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: String,
        num: Number,
        unit: { // 单位
            type: String,
            default: '元'
        }
    }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/variable.styl'
.remark-item
    text-align center
    .title
        margin-bottom 4px
        line-height 10px
        font-size $fontsize-small-s
        color $color-light-grey
    .desc
        line-height 24px
        font-size $fontsize-small-s
        color $color-dark-grey
        .stress
            font-size $fontsize-large-xxx
</style>