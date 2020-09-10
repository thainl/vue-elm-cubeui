<template>
    <div class="num-box">
        <transition-group name="num">
            <div class="num" :style="{fontSize:fontSize + 'rem'}" v-for="(item,i) of numSplit" :key="'spn'+i">
                <span :style="{transform: 'translateY(-'+ 10 * item +'%)', fontWeight, color}">{{item == '-' ? '-' : '0123456789'}}</span>
            </div>
        </transition-group>
        
    </div>
</template>

<script>
export default {
    name: 'NumberScroll',
    props: {
        fontSize: {
            type: Number,
            default: 0.64
        },
        fontWeight: {
            type: Number,
            default: 400,
            validator: (val)=> {
                return [100, 200, 300, 400, 500, 600, 700, 800, 900].indexOf(val) !== -1;
            }
        },
        color: {
            type: String,
            default: '#000'
        },
        num: {
            // type: Number,
            default: 0
        }
    },
    computed: {
        numSplit() {
            // if(typeof this.number != 'number') throw new Error('number数据必须为Number类型')
            return this.num.toString().split("");
        },
    },
};
</script>

<style scoped>
.num-box {
    height: 100%;
    width: auto;
    display: inline-block;
    /* display: flex;
    justify-content: center;
    align-items: center; */
    overflow: hidden;
}

.num {
    display: inline-block;
    height: 1.3em;
    width: .6em;
    padding-top: 0.1em;
    box-sizing: border-box;
    overflow: hidden;
}

.num span {
    position: relative;
    left: -0.22em;
    width: .6em;
    line-height: 0.9375em;
    text-align: center;
    writing-mode: vertical-lr;
    text-orientation: upright;
    letter-spacing: 0.4em;
    transform: translateY(0);
    transition: transform 0.3s;
}

.num-enter-active, .num-leave-active{
    transition: all .3s;
}
.num-leave-active {
    position: absolute;
}
.num-enter,.num-leave-to {
    opacity: 0;
    transform: translateX(-1em);
}

</style>