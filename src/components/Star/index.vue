<template>
    <div class="star-wrapper" :class="starSize">
        <span v-for="(starType, i) of starList" :key="'s'+i" class="star-item" :class="starType"></span>
    </div>
</template>

<script>
export default {
    name: "Star",
    props: {
        size: {
            type: Number,
            require: true,
            validator(val) {
                return [24, 36, 48].indexOf(val) !== -1;
            },
        },
        score: {
            type: Number,
            require: true,
            validator(val) {
                return val <= 5;
            },
        },
    },
    computed: {
        starSize() {
            return "star-" + this.size;
        },
        starList() {
            let integer = Math.floor(this.score), // 分数的整数位
                decimal = (this.score * 10) % 10, // 小数位
                list = [];
            for (let i = 0; i < integer; i++) {
                list.push("on"); // on 代表一整颗星
            }
            if (decimal >= 5) {
                list.push("half"); // 半颗星
            }
            while (list.length < 5) {
                list.push("off"); // 没点亮的星
            }
            return list;
        },
    },
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/mixin.styl'
@import '~@/assets/css/variable.styl'
.star-wrapper
    display: flex
    justify-content: center
    align-items: center
    .star-item
        background-repeat: no-repeat
    &.star-48
        .star-item
            width: 20px
            height: 20px
            margin-right: 22px
            background-size: 20px 20px
            &:last-child
                margin-right: 0
            &.on
                bg-image('star48_on')
            &.half
                bg-image('star48_half')
            &.off
                bg-image('star48_off')
    &.star-36
        .star-item
            width: 15px
            height: 15px
            margin-right: 6px
            background-size: 15px 15px
            &:last-child
                margin-right: 0
            &.on
                bg-image('star36_on')
            &.half
                bg-image('star36_half')
            &.off
                bg-image('star36_off')
    &.star-24
        .star-item
            width: 10px
            height: 10px
            margin-right: 3px
            background-size: 10px 10px
            &:last-child
                margin-right: 0
            &.on
                bg-image('star24_on')
            &.half
                bg-image('star24_half')
            &.off
                bg-image('star24_off')
</style>