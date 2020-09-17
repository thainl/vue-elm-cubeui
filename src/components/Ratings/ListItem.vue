<template>
    <div class="list-item">
        <div class="avatar">
            <img :src="rating.avatar" alt />
        </div>
        <div class="content">
            <div class="username">{{rating.username}}</div>
            <div class="score">
                <Star :size="24" :score="rating.score"></Star>
                <span class="delivery-time" v-if="rating.deliveryTime">{{rating.deliveryTime}}</span>
            </div>
            <p class="text">{{rating.text}}</p>
            <div class="recommend" v-if="rating.recommend.length > 0">
                <span class="icon-thumb_up"></span>
                <span class="tag" v-for="(tag,i) of rating.recommend" :key="'tag'+i">{{tag}}</span>
            </div>
            <div class="date">{{formatDate(rating.rateTime)}}</div>
        </div>
    </div>
</template>

<script>
import Star from '../Star/index';
import dayjs from 'dayjs';
export default {
    props: {
        rating: {
            type: Object,
            default() {
                return {};
            },
        },
    },
    methods: {
        formatDate(time) {
            return dayjs(time).format('MM-DD HH:mm:ss');
        }
    },
    components: {
        Star,
    }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/variable.styl'
.list-item
    display flex
    padding: 18px 0
    .avatar
        flex-basis 28px
        width 28px
        margin-right 12px
        img
            height 28px
            width 28px
            border-radius 50%
    .content
        position relative
        flex-grow 1
        width 0
        white-space normal
        .username
            margin-bottom 4px
            line-height 12px
            font-size $fontsize-small-s
            color $color-dark-grey
        .score
            display flex
            margin-bottom 6px
            .start-wrapper
                margin-right 6px
            .delivery-time
                color $color-light-grey
                font-size $fontsize-small-s
        .text
            margin-bottom 8px
            line-height 18px
            color $color-dark-grey
            font-size $fontsize-small
        .recommend
            display flex
            align-items center
            flex-wrap wrap
            line-height 16px
            .icon-thumb_up, .tag
                margin 0 8px 4px 0
                font-size $fontsize-small-s
            .icon-thumb_up
                color $color-blue
            .tag
                padding 0 6px
                border 1px solid $color-row-line
                border-radius 1px
                color $color-light-grey
                background $color-white
        .date
            position absolute
            top 0
            right 0
            line-height 12px
            font-size $fontsize-small
            color $color-light-grey
</style>