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
                                <transition name="show" enter-active-class="show-an">
                                    <span class="num" v-show="props.txt.count">
                                        <Bubble :num="props.txt.count"></Bubble>
                                    </span>
                                </transition>
                                
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
                    <div class="food-list-item" v-for="food of item.foods" :key="'f'+food.name">
                        <FoodItem  :food="food" @ADD_FOOD="handleDropBall"></FoodItem>
                    </div>
                </cube-scroll-nav-panel>
            </cube-scroll-nav>
        </div>
        <div class="cart-wrapper">
            <CartBar ref="CartBar" :selectedFoods="selectedFoods" :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice"></CartBar>
        </div>
    </div>
</template>

<script>
import { getGoods } from "@/api/index.js";
import TagIcon from "../TagIcon/index";
import FoodItem from './FoodItem';
import Bubble from './Bubble';
import CartBar from '../CartBar/index';
export default {
    name: "Goodlist",
    props: {
        data: {
            type: Object,
            default: {}
        }
    },
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
        seller() {
            return this.data.seller;
        },
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
        // 购物车里的商品
        selectedFoods() {
            let arr = [];
            this.GoodList.forEach(item=> {
                item.foods.forEach(food=> {
                    // 点添加按钮后会增加count属性
                    if(food.count) {
                        arr.push(food);
                    }
                })
            })
            return arr
        }
    },
    methods: {
        getData() {
            if (this.GoodList.length === 0) {
                getGoods().then((goods) => {
                    console.log(goods);
                    this.GoodList = goods;
                });
            }
        },
        changeHandler(label) {
            console.log("changed to:", label);
        },
        stickyChangeHandler(current) {
            console.log("sticky-change", current);
        },
        // 触发小球动画
        handleDropBall(el) {
            this.$refs.CartBar.dropBall(el);
        }
    },
    components: {
        TagIcon,
        FoodItem,
        Bubble,
        CartBar,
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
            position relative
            flex 1
            text-align center
            width 100%
            white-space normal
            .tag-icon
                vertical-align top
                margin-right 4px
            .num
                position absolute
                right -8px
                top -10px
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

        .food-list-item
            margin 18px
            padding-bottom 18px

    .cart-wrapper
        position fixed
        bottom 0
        left 0
        height 48px
        width 100%
        z-index 2

.show-enter-active, .show-leave-active
    transition all .3s

.show-leave-to
    opacity 0
    transform scale(.4)

.show-an
    animation show .3s

@keyframes show {
    0% {
        opacity 0
        transform scale(.3)
    }
    82% {
        opacity .8
        transform scale(1.2)
    }
    100% {
        opacity 1
        transform scale(1)
    }
}
</style>