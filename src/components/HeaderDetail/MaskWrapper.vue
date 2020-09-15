<template>
    <transition name="fade">
        <div
            class="mask-wrapper"
            @click.stop.prevent="handleClick"
            :style="{background,opacity, zIndex, height}"
            ref="mask"
            @touchmove="handleTouchMove"
            @touchstart="handleTouchStart"
        >
            <slot></slot>
        </div>
    </transition>
</template>

<script>
export default {
    props: {
        zIndex: {
            type: String | Number,
            default: 20,
        },
        background: {
            type: String,
            default: "rgba(7,17,27,0.6)",
        },
        opacity: {
            type: String | Number,
            default: 1,
        },
        height: {
            type: String,
            default: "100%",
        },
        width: {
            type: String,
            default: "100%",
        },
        selector: {
            type: String,
            default: "body",
        },
        nextTick: {
            type: Boolean,
            default: true,
        },
    },
    methods: {
        handleClick() {
            // 点击蒙层向父组件发送自定义事件
            this.$emit("clickMask");
        },
        handleTouchStart(e) {
            this.StartX = e.changedTouches[0].pageX;
            this.StartY = e.changedTouches[0].pageY;
        },
        handleTouchMove(e) {
            let distanceX = Math.abs(this.StartX - e.changedTouches[0].pageX);
            let distanceY = Math.abs(this.StartY - e.changedTouches[0].pageY);
            if (distanceX > 15 && distanceX > distanceY) {
                // 阻止横向滑动
                e.stopPropagation();
            }
            e.preventDefault();
        },
    },
    mounted() {
        if (this.nextTick) {
            this.$nextTick(() => {
                if (document.querySelector(this.selector + ">.mask-wrapper") === null){
                    try {
                        document.querySelector(this.selector).appendChild(this.$el);
                    } catch (error) {
                        
                    }
                    
                }
            });
        }
    },
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/variable.styl'
.mask-wrapper
    position: fixed
    top: 0
    left: 0
    width: 100vw
    height: 100vh
    overflow-x: hidden
    overflow-y: auto
.fade-enter-active, .fade-leave-active
    transition: all 0.5s
.fade-enter, .fade-leave-to
    opacity: 0 !important
</style>