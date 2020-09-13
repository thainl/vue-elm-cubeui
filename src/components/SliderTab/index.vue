<template>
    <div class="slider-tab">
        <div class="tabs">
            <cube-tab-bar
                v-model="selectedLabel"
                :showSlider="true"
                :useTransition="false"
                :data="tabs"
                ref="tabBar"
            ></cube-tab-bar>
        </div>
        <div class="sliders">
            <cube-slide
                ref="slider"
                :loop="false"
                :initial-index="index"
                :auto-play="false"
                :options="sliderOptions"
                :showDots="false"
                direction="horizontal"
                @change="sliderChange"
                @scroll="sliderScroll"
            >
                <cube-slide-item v-for="(tab, i) of tabs" :key="'tab'+i">
                    <component :is="tab.component" ref="sliderComponent" :data="tab.data"></component>
                </cube-slide-item>
            </cube-slide>
        </div>
    </div>
</template>

<script>
export default {
    name: "SliderTab",
    props: {
        tabs: {
            type: Array,
            default: []
        },
        initialIndex: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            index: this.initialIndex,
            // slide组件需要传入options scroll事件才会生效
            sliderOptions: {
                listenScroll: true,
                probeType: 3,
                // 防止斜向滚动
                directionLockThreshold: 0
            }
        };
    },
    computed: {
        selectedLabel: {
            get() {
                return this.tabs[this.index].label;
            },
            set(newVal) {
                // 因为使用v-model绑定，所以点击切换tab值也会改变
                this.index = this.tabs.findIndex((val) => val.label == newVal);
            },
        },
    },
    mounted() {
        // 一开始是不会触发sliderChange事件，所以挂载后先执行一次获取数据
        this.sliderChange(this.index);
    },
    methods: {
        sliderChange(index) {
            this.index = index;
            // 在slider页面滑动改变后获取组件需要的数据，不会造成性能浪费
            const comp = this.$refs.sliderComponent[index];
            comp.getData && typeof(comp.getData) === 'function' && comp.getData();
        },
        sliderScroll(pos) {
            let tabBarWidth = this.$refs.tabBar.$el.clientWidth, // tabBar宽度
                sliderWidth = this.$refs.slider.slide.scrollerWidth, // 整个slider宽度
                transform = Math.abs(pos.x)/sliderWidth * tabBarWidth;
            this.$refs.tabBar.setSliderTransform(transform); // 改变横条的值
        }
    },
};
</script>

<style lang="stylus" scoped>
.slider-tab
    display: flex
    flex-direction: column
    height: 100%
    width: 100%
    .tabs
        >>> .cube-tab
            font-size: 16px
            padding: 9px 0 10px
    .sliders
        flex: 1
        overflow hidden
</style>