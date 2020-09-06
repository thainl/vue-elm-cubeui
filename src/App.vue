<template>
    <div id="app">
        <SellerHeader :seller="seller"></SellerHeader>
    </div>
</template>

<script>
import SellerHeader from "./components/SellerHeader/index";
export default {
    name: "App",
    data() {
        return {
            seller: {}
        }
    },
    components: {
        SellerHeader,
    },
    created() {
        fetch('/api/seller').then(res=> {
            if(res.ok){
                return res.json();
            }else {
                return Promise.reject('请求失败');
            }
        }).then(data=> {
            console.log(data);
            this.seller = data.data;
        }).catch(err=> {
            throw err;
        })
    },
};
</script>

<style lang="stylus"></style>
