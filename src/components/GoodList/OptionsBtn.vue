<template>
    <div class="options-btn">
        <transition name="move">
            <button
                @click.stop="decreaseFood"
                v-show="showDecreaseBtn || food.count>0 "
                class="decrease-btn"
            >
                <span class="inner icon-remove_circle_outline"></span>
            </button>
        </transition>
        <!-- -->
        <div class="food-count">
            <transition name="fade">
                <span v-show="food.count>0">{{food.count}}</span>
            </transition>
        </div>
        <button :key="food.name" @click.stop="addFood" class="add-btn icon-add_circle"></button>
    </div>
</template>

<script>
export default {
    props: {
        food: {
            type: Object,
            default: {},
        },
    },
    data() {
        return {
            showDecreaseBtn: false,
        };
    },
    computed: {},
    watch: {
        food: {
            deep: true,
            handler: function (food) {
                if (food.count <= 0) {
                    this.showDecreaseBtn = false;
                }
            },
        },
    },
    methods: {
        addFood(e) {
            // 等动画完成后添加
            setTimeout(() => {
                if (!this.food.count) {
                    // 在food对象里添加count属性, vue中增加对象的属性需要使用$set方法才能数据响应
                    this.$set(this.food, "count", 1);
                } else {
                    this.food.count++;
                }
            }, 400);
            // 先把减少的按钮显示，避免延迟后显示
            this.showDecreaseBtn = true;
            this.$emit("ADD_FOOD", e.target); // 提交自定义事件触发小球动画
        },
        decreaseFood(e) {
            // 防止减到负数
            if (this.food.count) {
                this.food.count--;
            }
            if (this.food.count <= 0) {
                this.showDecreaseBtn = false;
                this.$emit("refreshScroll");
            }
        },
    },
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/variable.styl'
.options-btn
    display: flex
    align-items: center
    button
        display: block
        position: relative
        border: none
        outline: none
        background: inherit
        padding: 6px
        line-height: 24px
        font-size: $fontsize-large-xxx
        color: $color-blue
        cursor: pointer
        background: transparent
        .inner
            display: block
            transition: all 0.4s
    .food-count
        width: 12px
        line-height: 24px
        text-align: center
        font-size: $fontsize-small-s
        color: $color-grey
    .decrease-btn.move-enter-active, .decrease-btn.move-leave-active
        transition: all 0.4s
    .decrease-btn.move-enter, .decrease-btn.move-leave-to
        opacity: 0
        transform: translateX(36px)
        .inner
            transform: rotate(180deg)

    .fade-enter-active, .fade-leave-active
        transition opacity .1s
    .fade-enter, .fade-leave-to
        opacity 0
</style>