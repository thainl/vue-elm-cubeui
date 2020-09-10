<template>
    <div>
      <input type="number" v-model="num" step="1">
      <Test :num="num"></Test>
    </div>
</template>

<script>
import Test from "../NumberScroll";
export default {
    name: "Ratings",
    data() {
        return {
          num: 0
        };
    },
    components: {
      Test
    }
};
</script>

<style lang="stylus" scoped></style>