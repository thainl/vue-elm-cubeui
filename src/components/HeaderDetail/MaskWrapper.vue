<template>
    <transition name="fade">
        <div class="mask-wrapper" @touchmove.stop.prevent>
            <slot></slot>
        </div>
    </transition>
</template>

<script>
export default {
    data() {
        return {
            showMask: false,
        };
    },
    mounted() {
        this.$nextTick(() => {
            document.body.appendChild(this.$el);
        });
    },
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/variable.styl'
.mask-wrapper
    position: fixed
    top: 0
    left: 0
    z-index: 99
    width: 100vw
    height: 100vh
    overflow-x: hidden
    overflow-y: auto
    opacity: 1
    color: $color-white
    background: $color-background-s
    backdrop-filter: blur(10px)
.fade-enter-active, .fade-leave-active
    transition: all 0.5s
.fade-enter, .fade-leave-to
    opacity: 0
    background: $color-background
</style>