<template>
    <div class="goods">
        <div class="scroll-nav-wrapper">
            <cube-scroll-nav
                :side="true"
                :data="GoodList"
                :options="scrollOptions"
                v-if="GoodList.length"
            >
                <template v-slot:bar="props">
                    <!-- 插槽里使用cube-scroll-nav-bar组件，这个组件中还带有默认插槽 -->
                    <cube-scroll-nav-bar
                        direction="vertical"
                        :labels="props.labels"
                        :txts="barTxts"
                        :current="props.current"
                    >
                        <template v-slot:default="props">
                            <div class="nav-bar-content">
                                <TagIcon :size="3" :type="props.txt.type" v-if="props.txt.type>=1"></TagIcon>
                                <span class="name">{{props.txt.name}}</span>
                            </div>
                        </template>
                    </cube-scroll-nav-bar>
                </template>
                <cube-scroll-nav-panel
                    v-for="item in GoodList"
                    :key="item.name"
                    :label="item.name"
                    :title="item.name"
                >
                    <div class="food-item">
                        <ul>
                            <li>1</li>
                            <li>2</li>
                            <li>3</li>
                            <li>4</li>
                            <li>5</li>
                            <li>6</li>
                            <li>7</li>
                            <li>8</li>
                        </ul>
                    </div>
                </cube-scroll-nav-panel>
            </cube-scroll-nav>
        </div>
    </div>
</template>

<script>
import { getGoods } from "@/api/index.js";
import TagIcon from "../TagIcon/index";
export default {
    name: "Goodlist",
    data() {
        return {
            GoodList: [],
            scrollOptions: {
                click: false,
                directionLockThreshold: 0,
            },
        };
    },
    computed: {
        // 存放每个分类的名称、type(是否有support图标)、选择的数量
        barTxts() {
            let arr = [];
            this.GoodList.forEach((item) => {
                const { name, type, foods } = item;
                let count = 0;
                foods.forEach((food) => {
                    count += food.count || 0;
                });
                arr.push({ type, name, count });
            });
            return arr;
        },
    },
    methods: {
        getData() {
            if (this.GoodList.length === 0) {
                getGoods().then((goods) => {
                    console.log();
                    this.GoodList = JSON.parse(JSON.stringify(goods));
                });
            }
        },
        changeHandler(label) {
            console.log("changed to:", label);
        },
        stickyChangeHandler(current) {
            console.log("sticky-change", current);
        },
    },
    components: {
        TagIcon,
    },
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/mixin'
@import '~@/assets/css/variable'
.goods
    position: relative
    text-align: left
    height: 100%
    .scroll-nav-wrapper
        position: absolute
        width: 100%
        top: 0
        left: 0
        bottom: 48px
        .nav-bar-content
            flex 1
            text-align center
            width 100%
            white-space normal
            .tag-icon
                vertical-align top
                margin-right 4px
        >>> .cube-scroll-nav-bar-items
            font-size 14px
            width 80px
            overflow hidden
            .cube-scroll-nav-bar-item
                padding: 0 10px;
                display: flex;
                flex-wrap wrap
                align-items: center;
                height: 56px;
                line-height: 14px;
                font-size: 12px;
                background: #f3f5f7;
                &.cube-scroll-nav-bar-item_active
                    background #fff
                    color #333
        >>> .cube-scroll-nav-panel-title
            padding-left: 14px;
            height: 26px;
            line-height: 26px;
            border-left: 2px solid #d9dde1;
            font-size: 12px;
            color: #666;
            background: #f3f5f7;
</style>