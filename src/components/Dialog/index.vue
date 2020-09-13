<template>
    <transition enter-active-class="fadeIn" leave-active-class="fadeOut">
        <div v-show="showDialog" class="dialog-mask" @click.stop="clickOutside">
            <transition enter-active-class="zoomIn" leave-active-class="zoomOut">
                <div v-show="showDialog" class="dialog-box">
                    <div class="title">{{title}}</div>
                    <div class="content">{{content}}</div>
                    <div class="options">
                        <button
                            v-show="type == 'confirm'"
                            class="btn cancel"
                            @click.stop="clickCancel"
                        >取消</button>
                        <button class="btn confirm" @click.stop="clickConfirm">确认</button>
                    </div>
                </div>
            </transition>
        </div>
    </transition>
</template>

<script>
export default {
    name: "Dialog",
    props: {
        // 弹窗类型
        type: {
            type: String,
            default: "alert",
            validator(val) {
                return ['alert', 'confirm'].indexOf(val) !== -1;
            }
        },
        title: {
            type: String,
            default: '提示'
        },
        content: {
            type: String,
        },
        showDialog: {
            type: Boolean,
        },
    },
    methods: {
        clickCancel() {
            this.$emit("dialogCancel");
        },
        clickConfirm() {
            this.$emit("dialogConfirm");
        },
        clickOutside() {
            return false; // 不启用点击外面关闭弹窗
            this.$emit("dialogClose");
        },
    },
    mounted() {
        this.$nextTick(()=> {
            document.body.appendChild(this.$el);
        })
    },
};
</script>

<style>
.dialog-mask {
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    left: 0;
    top: 0;
    height: 100vh;
    width: 100vw;
    background: rgba(0, 0, 0, 0.7);
    z-index: 99;
    overflow: hidden;
    animation-duration: 0.3s;
}

.dialog-mask .dialog-box {
    width: 12.8rem;
    background: #fff;
    font-size: 0.64rem;
    border-radius: 0.64rem;
    transition: all 0.3s;
    overflow: hidden;
    animation-duration: 0.4s;
}

.dialog-mask .dialog-box .title {
    padding: 0.56rem 0 0.4rem;
    font-weight: 500;
    line-height: 0.96rem;
    text-align: center;
}

.dialog-mask .dialog-box .content {
    max-height: 60vh;
    padding: 0.6rem 0.96rem 0.96rem;
    overflow-y: auto;
    font-size: 0.56rem;
    line-height: 0.8rem;
    color: #646566;
    text-align: center;
    white-space: pre-wrap;
}

.dialog-mask .dialog-box .options {
    display: flex;
    height: 2rem;
    width: 100%;
    border-top: 0.04rem solid #ebedf0;
    box-sizing: border-box;
}

.dialog-mask .dialog-box .options .btn {
    flex: 1;
    text-align: center;
    margin: 0;
    padding: 0;
    border: none;
    outline: none;
    font-size: 0.64rem;
    line-height: 2rem;
    color: #323233;
    cursor: pointer;
    background: #fff;
    box-sizing: border-box;
}

.dialog-mask .dialog-box .options .btn:active {
    background: #e6e6e6;
    color: #2d2d2e;
}

.dialog-mask .dialog-box .options .btn.cancel {
    border-right: 0.04rem solid #ebedf0;
}

.dialog-mask .dialog-box .options .btn.confirm {
    color: #ee0a24;
}

.dialog-mask .dialog-box .options .btn:active.confirm {
    color: #d70920;
}
.zoomIn {
    animation-name: zoomIn
}
.zoomOut {
    animation-name: zoomOut
}
.fadeIn {
    animation-name: fadeIn
}
.fadeOut {
    animation-name: fadeOut
}
@keyframes zoomOut {
    0% {
        opacity: 1
    }

    50% {
        transform: scale3d(.3, .3, .3)
    }

    50%,
    to {
        opacity: 0
    }
}
@keyframes zoomIn {
    0% {
        opacity: 0;
        transform: scale3d(.3, .3, .3)
    }

    50% {
        opacity: 1
    }
}
@keyframes fadeIn {
    0% {
        opacity: 0
    }

    to {
        opacity: 1
    }
}
@keyframes fadeOut {
    0% {
        opacity: 1
    }

    to {
        opacity: 0
    }
}
</style>