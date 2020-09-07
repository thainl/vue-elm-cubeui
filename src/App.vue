<template>
    <div id="app">
        <SellerHeader :seller="seller"></SellerHeader>
    </div>
</template>

<script>
import { getSeller } from "@/api/index.js";
import SellerHeader from "./components/SellerHeader/index";
export default {
    name: "App",
    data() {
        return {
            seller: {},
        };
    },
    components: {
        SellerHeader,
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
