<template>
    <div id="app">
        <SellerHeader :seller="seller"></SellerHeader>
    </div>
</template>

<script>
import { getSeller } from "@/api/index.js";
import SellerHeader from "./components/SellerHeader/index";
import HeaderDetail from './components/Header-detail/index'
export default {
    name: "App",
    data() {
        return {
            seller: {},
        };
    },
    components: {
        SellerHeader,
        HeaderDetail
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

<style lang="stylus"></style>
