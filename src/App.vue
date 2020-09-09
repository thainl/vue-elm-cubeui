<template>
    <div id="app">
        <SellerHeader :seller="seller"></SellerHeader>
        <div class="tab-wrapper">
            <SliderTab :tabs="tabs"></SliderTab>
        </div>
    </div>
</template>

<script>
import { getSeller } from "@/api/index.js";
import SellerHeader from "./components/SellerHeader/index";
import SliderTab from "./components/SliderTab/index";
import GoodList from "@/components/GoodList/index.vue";
import Ratings from "@/components/Ratings/index.vue";
import Seller from "@/components/Seller/index.vue";
export default {
    name: "App",
    data() {
        return {
            seller: {},
        };
    },
    computed: {
        tabs() {
            return [
                {
                    label: "商品",
                    component: GoodList,
                    data: {seller:this.seller},
                },
                {
                    label: "评论",
                    component: Ratings,
                    data: {seller:this.seller},
                },
                {
                    label: "商家",
                    component: Seller,
                    data: {seller:this.seller},
                },
            ];
        },
    },
    components: {
        SellerHeader,
        SliderTab,
        GoodList,
        Ratings,
        Seller,
    },
    methods: {
        _getSeller() {
            getSeller().then((seller) => {
                this.seller = seller;
            });
        },
    },
    created() {
        this._getSeller();
    },
};
</script>

<style lang="stylus">
body
    font-size: 16px
#app
    display: flex
    flex-direction: column
    height: 100vh
    width: 100vw
    .tab-wrapper
        flex: 1
        max-width calc(100vh-137px)
        overflow hidden
        // position fixed
        // top 137px
        // left 0
        // right 0
        // bottom 0
</style>
