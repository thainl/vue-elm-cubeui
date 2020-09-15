<template>
    <div class="title" :style="{'margin-bottom': marginBottom}">
        <slot></slot>
    </div>
</template>

<script>
export default {
    props: {
        marginBottom: {
            type: String,
            default: '0.24rem'
        }
    }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/variable.styl'
.title
    line-height: 14px
    font-size: $fontsize-medium
    color: $color-dark-grey
</style>