<template>
    <div class="title">
        <div class="line"></div>
        <div class="text"><slot></slot></div>
        <div class="line"></div>
    </div>
</template>

<style lang="stylus" scoped>
@import '~@/assets/css/variable.styl'
.title
    display flex
    width 80%
    margin 28px auto 24px auto
    .line
        flex 1
        position relative
        top -6px
        border-bottom 1px solid rgba(255,255,255,.2)
    .text
        padding 0 12px
        font-weight 700
        font-size $fontsize-medium
</style>