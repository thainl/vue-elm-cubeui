<template>
    <div class="rating-item">
        <div class="top">
            <div class="date">{{formatDate(rating.rateTime)}}</div>
            <div class="user">
                <span class="name">{{rating.username}}</span>
                <img :src="rating.avatar" class="avatar" alt />
            </div>
        </div>
        <p class="content">
            <span
                :class="{'icon-thumb_up': rating.rateType===0,'icon-thumb_down':rating.rateType===1}"
            ></span>
            <span class="text">{{rating.text}}</span>
        </p>
    </div>
</template>

<script>
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
            return dayjs(time).format('MM-DD HH:mm');
        }
    },
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/variable.styl'
.rating-item
    padding: 16px 0
    .top
        display: flex
        justify-content: space-between
        font-size: 12px
        line-height: 12px
        color: $color-light-grey
        margin-bottom: 6px
        .user
            .name
                margin-right: 6px
            .avatar
                height: 12px
                width: 12px
                border-radius: 50%
    .content
        font-size: $fontsize-small
        line-height: 16px
        .icon-thumb_up, .icon-thumb-down
            margin-right: 4px
        .icon-thumb_up
            color: $color-blue
        .icon-thumb-down
            color: $color-light-grey
</style>