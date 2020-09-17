<template>
    <div class="support-item">
        <TagIcon :size=4 :type="support.type"></TagIcon>
        <span class="text">{{support.description}}</span>
    </div>
</template>

<script>
import TagIcon from '../TagIcon/index';
export default {
    props: {
        support: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    components: {
        TagIcon,
    }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/variable.styl'
.support-item
    display flex
    align-items center
    padding 16px 12px
    .tag-icon
        margin-right 6px
    .text
        line-height 16px
        font-size $fontsize-small
        color $color-dark-grey
</style>